import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraPreview = ({ stream, onClose, onContinue }) => {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        setIsReady(true);
      };
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  if (!stream) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-secondary-200">
        {/* Header */}
        <div className="p-4 bg-success-50 border-b border-success-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success-600" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                ¡Cámara Conectada!
              </h3>
              <p className="text-text-secondary text-sm">
                Vista previa de tu cámara
              </p>
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
          />
          
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary-900/50">
              <div className="text-center text-white">
                <Icon name="Loader" size={32} className="animate-spin mx-auto mb-2" />
                <p className="text-sm">Cargando vista previa...</p>
              </div>
            </div>
          )}

          {/* Recording Indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-medium">EN VIVO</span>
          </div>

          {/* Quality Indicator */}
          <div className="absolute top-3 right-3 bg-black/50 rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium">HD</span>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Icon name="Info" size={16} />
            <span>Tu cámara está funcionando correctamente</span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={onContinue}
              className="flex-1"
              disabled={!isReady}
            >
              Continuar a AR
            </Button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
        <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
          <Icon name="Lightbulb" size={16} className="text-warning-600" />
          Consejos para una mejor experiencia AR
        </h4>
        <ul className="text-text-secondary text-sm space-y-1">
          <li>• Asegúrate de tener buena iluminación</li>
          <li>• Mantén la cámara estable durante el uso</li>
          <li>• Evita superficies muy reflectantes</li>
        </ul>
      </div>
    </div>
  );
};

export default CameraPreview;