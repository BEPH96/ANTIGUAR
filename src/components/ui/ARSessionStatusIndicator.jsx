import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ARSessionStatusIndicator = ({ 
  sessionStatus = 'inactive', // 'inactive', 'initializing', 'active', 'error'
  cameraPermission = 'prompt', // 'granted', 'denied', 'prompt'
  trackingQuality = 'good', // 'good', 'limited', 'poor'
  onStatusClick
}) => {
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

  const getStatusConfig = () => {
    switch (sessionStatus) {
      case 'active':
        return {
          color: 'text-success-600',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          icon: 'CheckCircle',
          label: 'Sesión AR Activa',
          pulse: false
        };
      case 'initializing':
        return {
          color: 'text-warning-600',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200',
          icon: 'Loader',
          label: 'Inicializando AR...',
          pulse: true
        };
      case 'error':
        return {
          color: 'text-error-600',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200',
          icon: 'AlertCircle',
          label: 'Error en Sesión AR',
          pulse: false
        };
      default:
        return {
          color: 'text-secondary-600',
          bgColor: 'bg-secondary-50',
          borderColor: 'border-secondary-200',
          icon: 'Circle',
          label: 'AR Inactivo',
          pulse: false
        };
    }
  };

  const getCameraStatusConfig = () => {
    switch (cameraPermission) {
      case 'granted':
        return {
          color: 'text-success-600',
          icon: 'Camera',
          label: 'Cámara Autorizada'
        };
      case 'denied':
        return {
          color: 'text-error-600',
          icon: 'CameraOff',
          label: 'Cámara Denegada'
        };
      default:
        return {
          color: 'text-warning-600',
          icon: 'Camera',
          label: 'Permiso de Cámara Pendiente'
        };
    }
  };

  const getTrackingStatusConfig = () => {
    switch (trackingQuality) {
      case 'good':
        return {
          color: 'text-success-600',
          icon: 'Target',
          label: 'Seguimiento Óptimo'
        };
      case 'limited':
        return {
          color: 'text-warning-600',
          icon: 'Target',
          label: 'Seguimiento Limitado'
        };
      case 'poor':
        return {
          color: 'text-error-600',
          icon: 'Target',
          label: 'Seguimiento Deficiente'
        };
      default:
        return {
          color: 'text-secondary-600',
          icon: 'Target',
          label: 'Sin Seguimiento'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const cameraConfig = getCameraStatusConfig();
  const trackingConfig = getTrackingStatusConfig();

  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
    if (onStatusClick) {
      onStatusClick({ sessionStatus, cameraPermission, trackingQuality });
    }
  };

  return (
    <div className="ar-status">
      {/* Main Status Indicator */}
      <div
        className={`ar-overlay rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 ${
          statusConfig.bgColor
        } ${statusConfig.borderColor} border ${
          isExpanded ? 'rounded-b-none' : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <Icon
            name={statusConfig.icon}
            size={16}
            className={`${statusConfig.color} ${
              statusConfig.pulse ? 'animate-pulse' : ''
            }`}
          />
          <span className={`text-sm font-medium ${statusConfig.color}`}>
            {isMobile ? 'AR' : statusConfig.label}
          </span>
          {isMobile && (
            <Icon
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              size={14}
              className={statusConfig.color}
            />
          )}
        </div>
      </div>

      {/* Expanded Details (Mobile) or Hover Details (Desktop) */}
      {((isMobile && isExpanded) || (!isMobile)) && (
        <div
          className={`${
            isMobile
              ? 'ar-overlay border-t-0 rounded-t-none rounded-b-lg animate-slide-up' :'hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 ar-overlay rounded-lg animate-fade-in'
          } p-3 min-w-48`}
        >
          <div className="space-y-2">
            {/* Camera Status */}
            <div className="flex items-center gap-2">
              <Icon
                name={cameraConfig.icon}
                size={14}
                className={cameraConfig.color}
              />
              <span className="text-xs text-text-secondary">
                {cameraConfig.label}
              </span>
            </div>

            {/* Tracking Status */}
            {sessionStatus === 'active' && (
              <div className="flex items-center gap-2">
                <Icon
                  name={trackingConfig.icon}
                  size={14}
                  className={trackingConfig.color}
                />
                <span className="text-xs text-text-secondary">
                  {trackingConfig.label}
                </span>
              </div>
            )}

            {/* Performance Metrics */}
            {sessionStatus === 'active' && !isMobile && (
              <div className="pt-2 border-t border-border/30">
                <div className="flex justify-between text-xs text-text-muted">
                  <span>FPS:</span>
                  <span className="font-data">60</span>
                </div>
                <div className="flex justify-between text-xs text-text-muted">
                  <span>Latencia:</span>
                  <span className="font-data">12ms</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Backdrop */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-transparent z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default ARSessionStatusIndicator;