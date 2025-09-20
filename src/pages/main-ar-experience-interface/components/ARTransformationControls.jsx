import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ARTransformationControls = ({ 
  selectedObject = null,
  onTransform,
  isVisible = true 
}) => {
  const [activeMode, setActiveMode] = useState('move'); // 'move', 'rotate', 'scale'
  const [transformValues, setTransformValues] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const transformModes = [
    {
      id: 'move',
      name: 'Mover',
      icon: 'Move',
      description: 'Cambiar posición del objeto'
    },
    {
      id: 'rotate',
      name: 'Rotar',
      icon: 'RotateCw',
      description: 'Rotar el objeto en 3D'
    },
    {
      id: 'scale',
      name: 'Escalar',
      icon: 'Maximize2',
      description: 'Cambiar tamaño del objeto'
    }
  ];

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  const handleTransformChange = (axis, value, type) => {
    const newValues = {
      ...transformValues,
      [type]: {
        ...transformValues[type],
        [axis]: value
      }
    };
    setTransformValues(newValues);
    
    if (onTransform) {
      onTransform({
        mode: activeMode,
        values: newValues,
        selectedObject
      });
    }
  };

  const handleReset = () => {
    const resetValues = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    };
    setTransformValues(resetValues);
    
    if (onTransform) {
      onTransform({
        mode: 'reset',
        values: resetValues,
        selectedObject
      });
    }
  };

  const getAxisControls = () => {
    const currentValues = transformValues[activeMode === 'move' ? 'position' : 
                                       activeMode === 'rotate' ? 'rotation' : 'scale'];
    
    const getStep = () => {
      switch (activeMode) {
        case 'move':
          return 0.1;
        case 'rotate':
          return 15;
        case 'scale':
          return 0.1;
        default:
          return 0.1;
      }
    };

    const getRange = () => {
      switch (activeMode) {
        case 'move':
          return { min: -5, max: 5 };
        case 'rotate':
          return { min: -180, max: 180 };
        case 'scale':
          return { min: 0.1, max: 3 };
        default:
          return { min: -5, max: 5 };
      }
    };

    const step = getStep();
    const range = getRange();

    return ['x', 'y', 'z'].map(axis => (
      <div key={axis} className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-primary w-4 uppercase">
          {axis}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={() => handleTransformChange(axis, currentValues[axis] - step, 
                                               activeMode === 'move' ? 'position' : 
                                               activeMode === 'rotate' ? 'rotation' : 'scale')}
            className="p-1 w-6 h-6"
          >
            <Icon name="Minus" size={12} />
          </Button>
          <span className="text-xs font-mono text-text-primary w-12 text-center">
            {currentValues[axis].toFixed(1)}
          </span>
          <Button
            variant="ghost"
            onClick={() => handleTransformChange(axis, currentValues[axis] + step,
                                               activeMode === 'move' ? 'position' : 
                                               activeMode === 'rotate' ? 'rotation' : 'scale')}
            className="p-1 w-6 h-6"
          >
            <Icon name="Plus" size={12} />
          </Button>
        </div>
      </div>
    ));
  };

  if (!isVisible || !selectedObject) return null;

  return (
    <div className={`ar-floating ${isMobile ? 'top-4 right-4' : 'top-1/2 right-4 transform -translate-y-1/2'}`}>
      <div className="ar-overlay rounded-xl p-4 w-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">
            Transformar Objeto
          </h3>
          <Button
            variant="ghost"
            onClick={handleReset}
            className="p-1 w-6 h-6"
            title="Resetear transformaciones"
          >
            <Icon name="RotateCcw" size={14} />
          </Button>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-1 mb-4 p-1 bg-secondary-100 rounded-lg">
          {transformModes.map((mode) => (
            <Button
              key={mode.id}
              variant={activeMode === mode.id ? 'primary' : 'ghost'}
              onClick={() => handleModeChange(mode.id)}
              className="flex-1 p-2 text-xs"
              title={mode.description}
            >
              <Icon name={mode.icon} size={14} />
              {!isMobile && <span className="ml-1">{mode.name}</span>}
            </Button>
          ))}
        </div>

        {/* Axis Controls */}
        <div className="space-y-3">
          {getAxisControls()}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                if (activeMode === 'scale') {
                  handleTransformChange('x', 1, 'scale');
                  handleTransformChange('y', 1, 'scale');
                  handleTransformChange('z', 1, 'scale');
                }
              }}
              className="text-xs p-2"
              disabled={activeMode !== 'scale'}
            >
              <Icon name="Square" size={12} />
              <span className="ml-1">1:1</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (activeMode === 'rotate') {
                  handleTransformChange('y', transformValues.rotation.y + 90, 'rotation');
                }
              }}
              className="text-xs p-2"
              disabled={activeMode !== 'rotate'}
            >
              <Icon name="RotateCw" size={12} />
              <span className="ml-1">90°</span>
            </Button>
          </div>
        </div>

        {/* Current Object Info */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <p className="text-xs font-medium text-text-primary">
              {selectedObject.name}
            </p>
            <p className="text-xs text-text-muted">
              Modo: {transformModes.find(m => m.id === activeMode)?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARTransformationControls;