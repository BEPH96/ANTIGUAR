import React, { useRef, useEffect, useState } from 'react';

const ARGestureHandler = ({ 
  onObjectSelect,
  onObjectMove,
  onObjectScale,
  onObjectRotate,
  selectedObject,
  children 
}) => {
  const containerRef = useRef(null);
  const [gestureState, setGestureState] = useState({
    isActive: false,
    type: null, // 'tap', 'drag', 'pinch', 'rotate'
    startPosition: null,
    currentPosition: null,
    initialDistance: null,
    initialAngle: null,
    touches: []
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Touch event handlers
    const handleTouchStart = (e) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      
      if (touches.length === 1) {
        // Single touch - potential tap or drag
        const touch = touches[0];
        setGestureState({
          isActive: true,
          type: 'tap',
          startPosition: { x: touch.clientX, y: touch.clientY },
          currentPosition: { x: touch.clientX, y: touch.clientY },
          touches: touches
        });
      } else if (touches.length === 2) {
        // Two touches - pinch/zoom or rotate
        const touch1 = touches[0];
        const touch2 = touches[1];
        
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const angle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        );

        setGestureState({
          isActive: true,
          type: 'pinch',
          startPosition: {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          },
          initialDistance: distance,
          initialAngle: angle,
          touches: touches
        });
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      
      setGestureState(prev => {
        if (!prev.isActive) return prev;

        if (touches.length === 1 && prev.type === 'tap') {
          const touch = touches[0];
          const currentPos = { x: touch.clientX, y: touch.clientY };
          
          // Check if it's a drag (moved more than threshold)
          const distance = Math.sqrt(
            Math.pow(currentPos.x - prev.startPosition.x, 2) +
            Math.pow(currentPos.y - prev.startPosition.y, 2)
          );
          
          if (distance > 10) {
            // Convert to drag
            const newState = {
              ...prev,
              type: 'drag',
              currentPosition: currentPos
            };

            // Handle object movement
            if (selectedObject && onObjectMove) {
              const deltaX = (currentPos.x - prev.currentPosition.x) * 0.01;
              const deltaY = -(currentPos.y - prev.currentPosition.y) * 0.01;
              
              onObjectMove({
                object: selectedObject,
                delta: { x: deltaX, y: deltaY, z: 0 }
              });
            }

            return newState;
          }
          
          return {
            ...prev,
            currentPosition: currentPos
          };
        } else if (touches.length === 2 && prev.type === 'pinch') {
          const touch1 = touches[0];
          const touch2 = touches[1];
          
          const currentDistance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
          );
          
          const currentAngle = Math.atan2(
            touch2.clientY - touch1.clientY,
            touch2.clientX - touch1.clientX
          );

          // Handle scaling
          if (selectedObject && onObjectScale && prev.initialDistance) {
            const scaleRatio = currentDistance / prev.initialDistance;
            onObjectScale({
              object: selectedObject,
              scale: scaleRatio
            });
          }

          // Handle rotation
          if (selectedObject && onObjectRotate && prev.initialAngle) {
            const angleDelta = currentAngle - prev.initialAngle;
            onObjectRotate({
              object: selectedObject,
              angle: angleDelta
            });
          }

          return {
            ...prev,
            currentDistance,
            currentAngle: currentAngle
          };
        }

        return prev;
      });
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      
      setGestureState(prev => {
        if (!prev.isActive) return prev;

        // Handle tap selection
        if (prev.type === 'tap' && prev.startPosition && prev.currentPosition) {
          const distance = Math.sqrt(
            Math.pow(prev.currentPosition.x - prev.startPosition.x, 2) +
            Math.pow(prev.currentPosition.y - prev.startPosition.y, 2)
          );
          
          if (distance < 10) {
            // It's a tap, check for object selection
            const rect = container.getBoundingClientRect();
            const x = (prev.startPosition.x - rect.left) / rect.width;
            const y = (prev.startPosition.y - rect.top) / rect.height;
            
            if (onObjectSelect) {
              onObjectSelect({ x, y });
            }
          }
        }

        return {
          isActive: false,
          type: null,
          startPosition: null,
          currentPosition: null,
          initialDistance: null,
          initialAngle: null,
          touches: []
        };
      });
    };

    // Mouse event handlers for desktop
    const handleMouseDown = (e) => {
      setGestureState({
        isActive: true,
        type: 'tap',
        startPosition: { x: e.clientX, y: e.clientY },
        currentPosition: { x: e.clientX, y: e.clientY },
        touches: []
      });
    };

    const handleMouseMove = (e) => {
      setGestureState(prev => {
        if (!prev.isActive) return prev;

        const currentPos = { x: e.clientX, y: e.clientY };
        const distance = Math.sqrt(
          Math.pow(currentPos.x - prev.startPosition.x, 2) +
          Math.pow(currentPos.y - prev.startPosition.y, 2)
        );

        if (distance > 5 && prev.type === 'tap') {
          // Convert to drag
          const newState = {
            ...prev,
            type: 'drag',
            currentPosition: currentPos
          };

          // Handle object movement
          if (selectedObject && onObjectMove) {
            const deltaX = (currentPos.x - prev.currentPosition.x) * 0.01;
            const deltaY = -(currentPos.y - prev.currentPosition.y) * 0.01;
            
            onObjectMove({
              object: selectedObject,
              delta: { x: deltaX, y: deltaY, z: 0 }
            });
          }

          return newState;
        }

        return {
          ...prev,
          currentPosition: currentPos
        };
      });
    };

    const handleMouseUp = (e) => {
      setGestureState(prev => {
        if (!prev.isActive) return prev;

        // Handle click selection
        if (prev.type === 'tap') {
          const rect = container.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          
          if (onObjectSelect) {
            onObjectSelect({ x, y });
          }
        }

        return {
          isActive: false,
          type: null,
          startPosition: null,
          currentPosition: null,
          initialDistance: null,
          initialAngle: null,
          touches: []
        };
      });
    };

    // Keyboard handlers for desktop precision controls
    const handleKeyDown = (e) => {
      if (!selectedObject) return;

      const step = e.shiftKey ? 0.1 : 0.01;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (onObjectMove) {
            onObjectMove({
              object: selectedObject,
              delta: { x: -step, y: 0, z: 0 }
            });
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (onObjectMove) {
            onObjectMove({
              object: selectedObject,
              delta: { x: step, y: 0, z: 0 }
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (onObjectMove) {
            onObjectMove({
              object: selectedObject,
              delta: { x: 0, y: step, z: 0 }
            });
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (onObjectMove) {
            onObjectMove({
              object: selectedObject,
              delta: { x: 0, y: -step, z: 0 }
            });
          }
          break;
        case '+': case'=':
          e.preventDefault();
          if (onObjectScale) {
            onObjectScale({
              object: selectedObject,
              scale: 1.1
            });
          }
          break;
        case '-':
          e.preventDefault();
          if (onObjectScale) {
            onObjectScale({
              object: selectedObject,
              scale: 0.9
            });
          }
          break;
      }
    };

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedObject, onObjectSelect, onObjectMove, onObjectScale, onObjectRotate]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full touch-none select-none"
      style={{ touchAction: 'none' }}
    >
      {children}
    </div>
  );
};

export default ARGestureHandler;