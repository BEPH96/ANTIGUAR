import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SimplifiedGlobalHeader = ({ arSessionActive = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      path: '/ar-experience-landing',
      label: 'Inicio',
      icon: 'Home'
    },
    {
      path: '/camera-permission-setup',
      label: 'Configuración',
      icon: 'Settings'
    },
    {
      path: '/main-ar-experience-interface',
      label: 'Experiencia AR',
      icon: 'Camera'
    },
    {
      path: '/ar-object-library',
      label: 'Quizes',
      icon: 'Lightbulb'
    },
    {
      path: '/ar-session-management',
      label: 'Monitoreo',
      icon: 'Activity'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  // Logo Component
  const ARLogo = () => (
    <div className="flex items-center gap-2">
      {!arSessionActive && (
        <span className="font-heading font-bold text-2xl text-text-primary hover:text-white">
          ANTIGUAR
        </span>
      )}
    </div>
  );

  // Minimal AR Session Header
  if (arSessionActive) {
    return (
      <header className="ar-floating top-4 left-4 z-[150] hidden">
        <div className="ar-overlay rounded-lg p-2">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/ar-experience-landing')}
            className="p-2"
          >
          
          </Button>
        </div>
      </header>
    );
  }

  // Full Header for Non-AR Screens
  return (
    <header className="sticky top-0 z-50 w-full bg-[#E3EED5] backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Button
            variant="ghost"
            shape="pill"
            onClick={() => handleNavigation('/ar-experience-landing')}
            className="p-2"
          >
            <ARLogo />
          </Button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                shape="pill"
                variant={isCurrentPath(item.path) ? 'primary' : 'ghost'}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isCurrentPath(item.path)
                    ? 'text-primary-foreground'
                    : 'text-text-secondary hover:text-primary-foreground'
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => {
                // Toggle mobile menu logic would go here
                // For now, navigate to main AR experience
                handleNavigation('/main-ar-experience-interface');
              }}
              className="p-2"
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-wrap gap-2">
              {navigationItems.slice(0, 3).map((item) => (
                <Button
                  key={item.path}
                  variant={isCurrentPath(item.path) ? 'primary' : 'outline'}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center gap-2 px-3 py-2 text-xs"
                >
                  <Icon name={item.icon} size={14} />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default SimplifiedGlobalHeader;