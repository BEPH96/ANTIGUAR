import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ARCameraView = ({ 
  isSessionActive, 
  onSessionStart, 
  onSessionEnd,
  trackingQuality = 'good',
  frameRate = 60 
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSessionActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isSessionActive]);

  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      setCameraError('No se pudo acceder a la cámara. Verifica los permisos.');
      console.error('Camera access error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const getTrackingIndicatorColor = () => {
    switch (trackingQuality) {
      case 'good':
        return 'text-success-600';
      case 'limited':
        return 'text-warning-600';
      case 'poor':
        return 'text-error-600';
      default:
        return 'text-secondary-600';
    }
  };

  if (cameraError) {
    return (
      <div className="relative w-full h-full bg-secondary-900 flex items-center justify-center">
        <div className="text-center p-8">
          <Icon name="CameraOff" size={64} className="text-error-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Error de Cámara</h3>
          <p className="text-secondary-300 mb-6">{cameraError}</p>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            iconName="RefreshCw"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />

      {/* AR Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Loader" size={48} className="text-white animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Iniciando cámara...</p>
          </div>
        </div>
      )}

      {/* Performance Indicators */}
      {isSessionActive && (
        <div className="absolute top-4 right-4 space-y-2">
          {/* Frame Rate */}
          <div className="ar-overlay rounded-lg px-3 py-1">
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={14} className="text-success-600" />
              <span className="text-xs font-mono text-text-primary">{frameRate} FPS</span>
            </div>
          </div>

          {/* Tracking Quality */}
          <div className="ar-overlay rounded-lg px-3 py-1">
            <div className="flex items-center gap-2">
              <Icon 
                name="Target" 
                size={14} 
                className={getTrackingIndicatorColor()} 
              />
              <span className="text-xs text-text-primary capitalize">
                {trackingQuality === 'good' ? 'Óptimo' : 
                 trackingQuality === 'limited' ? 'Limitado' : 'Deficiente'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* AR Grid Overlay (when tracking) */}
      {isSessionActive && trackingQuality !== 'poor' && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern
                id="ar-grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ar-grid)" />
          </svg>
        </div>
      )}

      {/* Center Crosshair */}
      {isSessionActive && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-8 h-8 border-2 border-primary rounded-full opacity-60">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARCameraView;