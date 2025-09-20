import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ARQuickActionsPanel = ({ 
  isOpen, 
  onClose, 
  onLibraryOpen,
  onSessionManagement,
  onShare,
  onSettings 
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const quickActions = [
    {
      id: 'library',
      name: 'Biblioteca de Objetos',
      description: 'Explorar y añadir nuevos objetos 3D',
      icon: 'Package',
      color: 'text-primary',
      action: () => {
        if (onLibraryOpen) {
          onLibraryOpen();
        } else {
          navigate('/ar-object-library');
        }
        onClose();
      }
    },
    {
      id: 'sessions',
      name: 'Gestión de Sesiones',
      description: 'Ver historial y configurar sesiones',
      icon: 'Activity',
      color: 'text-success-600',
      action: () => {
        if (onSessionManagement) {
          onSessionManagement();
        } else {
          navigate('/ar-session-management');
        }
        onClose();
      }
    },
    {
      id: 'share',
      name: 'Compartir Escena',
      description: 'Compartir captura o configuración',
      icon: 'Share2',
      color: 'text-warning-600',
      action: () => {
        if (onShare) {
          onShare();
        } else {
          handleShare();
        }
        onClose();
      }
    },
    {
      id: 'settings',
      name: 'Configuración AR',
      description: 'Ajustar calidad y rendimiento',
      icon: 'Settings',
      color: 'text-secondary-600',
      action: () => {
        if (onSettings) {
          onSettings();
        } else {
          navigate('/camera-permission-setup');
        }
        onClose();
      }
    }
  ];

  const utilityActions = [
    {
      id: 'help',
      name: 'Ayuda y Tutoriales',
      description: 'Guías de uso y consejos',
      icon: 'HelpCircle',
      color: 'text-info-600'
    },
    {
      id: 'feedback',
      name: 'Enviar Comentarios',
      description: 'Reportar problemas o sugerencias',
      icon: 'MessageSquare',
      color: 'text-accent-600'
    },
    {
      id: 'performance',
      name: 'Monitor de Rendimiento',
      description: 'Ver estadísticas de la sesión',
      icon: 'BarChart3',
      color: 'text-error-600'
    }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Experiencia AR',
          text: 'Mira esta increíble experiencia de realidad aumentada',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-success-500 text-white px-4 py-2 rounded-lg z-[999]';
      toast.textContent = 'Enlace copiado al portapapeles';
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[180]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed z-[190] transition-transform duration-300 ${
        isMobile 
          ? 'bottom-0 left-0 right-0 rounded-t-2xl' :'top-1/2 left-4 transform -translate-y-1/2 w-80 rounded-xl'
      } ar-panel`}>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">
              Acciones Rápidas
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2 hover:bg-secondary-100 rounded-lg"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Main Actions */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium text-text-secondary mb-3">
              Principales
            </h3>
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                onClick={action.action}
                className="w-full p-4 text-left hover:bg-secondary-50 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name={action.icon} 
                    size={20} 
                    className={action.color}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">
                      {action.name}
                    </p>
                    <p className="text-sm text-text-muted mt-1">
                      {action.description}
                    </p>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-text-muted"
                  />
                </div>
              </Button>
            ))}
          </div>

          {/* Utility Actions */}
          <div className="space-y-3 pt-4 border-t border-border/30">
            <h3 className="text-sm font-medium text-text-secondary mb-3">
              Utilidades
            </h3>
            {utilityActions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                onClick={() => {
                  // Handle utility actions
                  onClose();
                }}
                className="w-full p-3 text-left hover:bg-secondary-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    name={action.icon} 
                    size={18} 
                    className={action.color}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {action.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-border/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-text-primary">12</p>
                <p className="text-xs text-text-muted">Objetos</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-text-primary">5:32</p>
                <p className="text-xs text-text-muted">Sesión</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-text-primary">60</p>
                <p className="text-xs text-text-muted">FPS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ARQuickActionsPanel;