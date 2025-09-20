import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingActionHub = ({ arSessionActive = false, onLibraryOpen, onSessionOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action) => {
    if (action === 'library' && onLibraryOpen) {
      onLibraryOpen();
    } else if (action === 'session' && onSessionOpen) {
      onSessionOpen();
    }
    setIsExpanded(false);
  };

  const actions = [
    {
      id: 'library',
      label: 'Biblioteca de Objetos',
      icon: 'Package',
      action: () => handleAction('library')
    },
    {
      id: 'session',
      label: 'Gestión de Sesión',
      icon: 'Settings',
      action: () => handleAction('session')
    }
  ];

  if (!arSessionActive) return null;

  return (
    <div className={`ar-floating ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'}`}>
      {/* Expanded Actions */}
      {isExpanded && (
        <div className={`absolute ${isMobile ? 'bottom-16 right-0' : 'bottom-16 right-0'} flex flex-col gap-2 animate-fade-in`}>
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="ar-overlay rounded-lg p-3 shadow-ar-floating animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Button
                variant="ghost"
                onClick={action.action}
                className="flex items-center gap-3 text-text-primary hover:text-primary whitespace-nowrap"
              >
                <Icon name={action.icon} size={20} />
                {!isMobile && <span className="text-sm font-medium">{action.label}</span>}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main Floating Button */}
      <div className="ar-overlay rounded-full p-3 shadow-ar-floating">
        <Button
          variant="primary"
          onClick={handleToggle}
          className={`rounded-full p-3 transition-transform duration-200 ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <Icon name={isExpanded ? 'X' : 'Menu'} size={24} />
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {isExpanded && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionHub;