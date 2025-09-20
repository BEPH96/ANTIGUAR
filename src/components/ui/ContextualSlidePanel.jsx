import React, { useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualSlidePanel = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right' // 'right', 'left', 'bottom'
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getPositionClasses = () => {
    const baseClasses = 'ar-panel transition-transform duration-200 ease-out';
    
    switch (position) {
      case 'left':
        return `${baseClasses} left-0 top-0 h-full w-80 max-w-[80vw] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`;
      case 'bottom':
        return `${baseClasses} bottom-0 left-0 right-0 h-96 max-h-[80vh] rounded-t-xl ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`;
      case 'right':
      default:
        return `${baseClasses} right-0 top-0 h-full w-80 max-w-[80vw] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`;
    }
  };

  const getContentClasses = () => {
    return position === 'bottom' ?'flex flex-col h-full p-6' :'flex flex-col h-full';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[190]" />
      
      {/* Panel */}
      <div
        ref={panelRef}
        className={getPositionClasses()}
      >
        <div className={getContentClasses()}>
          {/* Header */}
          <div className={`flex items-center justify-between ${
            position === 'bottom' ? 'mb-4' : 'p-6 border-b border-border/30'
          }`}>
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2 hover:bg-secondary-100 rounded-lg"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className={`flex-1 overflow-y-auto ${
            position === 'bottom' ? '' : 'p-6'
          }`}>
            {children}
          </div>
        </div>

        {/* Resize Handle for Desktop */}
        {position !== 'bottom' && (
          <div className={`hidden md:block absolute ${
            position === 'right' ? 'left-0' : 'right-0'
          } top-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors`} />
        )}
      </div>
    </>
  );
};

export default ContextualSlidePanel;