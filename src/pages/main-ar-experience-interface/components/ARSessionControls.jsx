import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ARSessionControls = ({ 
  isSessionActive,
  onSessionToggle,
  onCapture,
  onRecord,
  onReset,
  isRecording = false,
  recordingDuration = 0
}) => {
  const [showControls, setShowControls] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-hide controls after inactivity
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      if (isSessionActive && Date.now() - lastInteraction > 3000) {
        setShowControls(false);
      }
    }, 3000);

    const showOnInteraction = () => {
      setLastInteraction(Date.now());
      setShowControls(true);
    };

    window.addEventListener('touchstart', showOnInteraction);
    window.addEventListener('mousemove', showOnInteraction);
    window.addEventListener('click', showOnInteraction);

    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener('touchstart', showOnInteraction);
      window.removeEventListener('mousemove', showOnInteraction);
      window.removeEventListener('click', showOnInteraction);
    };
  }, [isSessionActive, lastInteraction]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSessionToggle = () => {
    if (onSessionToggle) {
      onSessionToggle(!isSessionActive);
    }
  };

  const handleCapture = () => {
    if (onCapture) {
      onCapture();
    }
    // Visual feedback
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white pointer-events-none z-[999] animate-pulse';
    document.body.appendChild(flash);
    setTimeout(() => {
      document.body.removeChild(flash);
    }, 200);
  };

  const handleRecord = () => {
    if (onRecord) {
      onRecord(!isRecording);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <>
      {/* Top Controls */}
      <div className={`ar-floating top-20 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="ar-overlay rounded-full px-4 py-2">
          <div className="flex items-center gap-3">
            {/* Session Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isSessionActive ? 'bg-green-800 animate-pulse' : 'bg-secondary-400'
              }`} />
              <span className="text-sm font-medium text-text-primary">
                {isSessionActive ? 'AR Activo' : 'AR Inactivo'}
              </span>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="flex items-center gap-2 px-2 py-1 bg-error-50 rounded-full">
                <div className="w-2 h-2 bg-error-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-error-600">
                  {formatDuration(recordingDuration)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Session Control */}
      <div className="ar-floating top-20 left-4">
        <div className="ar-overlay rounded-lg p-2">
          <Button
            variant={isSessionActive ? 'danger' : 'primary'}
            onClick={handleSessionToggle}
            className="p-3"
            iconName={isSessionActive ? 'Square' : 'Play'}
          >
            
          </Button>
        </div>
      </div>

      {/* Capture Controls 
      {isSessionActive && (
        <div className={`ar-floating bottom-4 right-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-30'
        }`}>
          <div className="ar-overlay rounded-xl p-3">
            <div className="flex flex-col gap-2">
              {/* Capture Photo /}
              <Button
                variant="primary"
                onClick={handleCapture}
                className="p-3 rounded-full"
                title="Capturar foto"
              >
                <Icon name="Camera" size={24} />
              </Button>

              {/* Record Video /}
              <Button
                variant={isRecording ? 'danger' : 'secondary'}
                onClick={handleRecord}
                className="p-3 rounded-full"
                title={isRecording ? 'Detener grabación' : 'Grabar video'}
              >
                <Icon name={isRecording ? 'Square' : 'Video'} size={24} />
              </Button>

              {/* Reset Scene /}
              <Button
                variant="outline"
                onClick={handleReset}
                className="p-3 rounded-full"
                title="Resetear escena"
              >
                <Icon name="RotateCcw" size={24} />
              </Button>
            </div>
          </div>
        </div>
      )}*/}

      {/* Mobile Gesture Hints */}
      {isMobile && isSessionActive && showControls && (
        <div className="ar-floating bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="ar-overlay rounded-lg px-4 py-2">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-1">
                <Icon name="Hand" size={14} />
                <span>Tocar para seleccionar</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Move" size={14} />
                <span>Arrastrar para mover</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="ZoomIn" size={14} />
                <span>Pellizcar para escalar</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Keyboard Shortcuts */}
      {!isMobile && isSessionActive && showControls && (
        <div className="ar-floating bottom-4 left-4">
          <div className="ar-overlay rounded-lg p-3">
            <div className="text-xs text-text-muted space-y-1">
              <div className="flex items-center gap-2">
                <kbd className="px-1 py-0.5 bg-secondary-200 rounded text-xs">Space</kbd>
                <span>Capturar</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1 py-0.5 bg-secondary-200 rounded text-xs">R</kbd>
                <span>Grabar</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1 py-0.5 bg-secondary-200 rounded text-xs">Esc</kbd>
                <span>Resetear</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ARSessionControls;