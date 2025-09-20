import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplifiedGlobalHeader from '../../components/ui/SimplifiedGlobalHeader';
import PermissionStatusCard from './components/PermissionStatusCard';
import PermissionInstructions from './components/PermissionInstructions';
import PrivacyAssurance from './components/PrivacyAssurance';
import TroubleshootingGuide from './components/TroubleshootingGuide';
import CameraPreview from './components/CameraPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CameraPermissionSetup = () => {
  const navigate = useNavigate();
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // prompt, requesting, granted, denied, blocked
  const [currentStep, setCurrentStep] = useState(1);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check initial permission status
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' });
      setPermissionStatus(permission.state);
      
      permission.addEventListener('change', () => {
        setPermissionStatus(permission.state);
      });
    } catch (err) {
      console.log('Permission API not supported');
    }
  };

  const requestCameraPermission = async () => {
    setPermissionStatus('requesting');
    setCurrentStep(2);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        } 
      });
      
      setPermissionStatus('granted');
      setCameraStream(stream);
      setShowPreview(true);
      setCurrentStep(3);
    } catch (err) {
      console.error('Camera permission error:', err);
      
      if (err.name === 'NotAllowedError') {
        setPermissionStatus('denied');
      } else if (err.name === 'NotFoundError') {
        setError('No se encontró ninguna cámara en tu dispositivo');
        setPermissionStatus('denied');
      } else if (err.name === 'NotReadableError') {
        setError('La cámara está siendo utilizada por otra aplicación');
        setPermissionStatus('denied');
      } else {
        setError('Error desconocido al acceder a la cámara');
        setPermissionStatus('denied');
      }
      setCurrentStep(1);
    }
  };

  const handleRetry = () => {
    setPermissionStatus('prompt');
    setCurrentStep(1);
    setError(null);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowPreview(false);
  };

  const handleTroubleshoot = () => {
    setShowTroubleshooting(true);
  };

  const handleContinueToAR = () => {
    navigate('/main-ar-experience-interface');
  };

  const handleClosePreview = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowPreview(false);
    setPermissionStatus('prompt');
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#D3E7D5] to-[#E4EED5]">
      <SimplifiedGlobalHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
            <Icon name="Camera" size={40} className="text-green-800" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Configuración de Cámara
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Para disfrutar de la experiencia de realidad aumentada, necesitamos acceso a tu cámara. 
            Tu privacidad y seguridad son nuestra prioridad.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={20} className="text-error-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-error-800 mb-1">Error de Cámara</h3>
                  <p className="text-error-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-12">
          {/* Camera Preview */}
          {showPreview && (
            <div className="flex justify-center">
              <CameraPreview
                stream={cameraStream}
                onClose={handleClosePreview}
                onContinue={handleContinueToAR}
              />
            </div>
          )}

          {/* Permission Status Card */}
          {!showPreview && (
            <div className="flex justify-center">
              <PermissionStatusCard
                status={permissionStatus}
                onRequestPermission={requestCameraPermission}
                onRetry={handleRetry}
                onTroubleshoot={handleTroubleshoot}
              />
            </div>
          )}

          {/* Instructions */}
          {!showPreview && (
            <PermissionInstructions currentStep={currentStep} />
          )}

          {/* Privacy Assurance */}
          {!showPreview && (
            <PrivacyAssurance />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <Button
              variant="outline"
              shape="pill"
              onClick={() => navigate('/ar-experience-landing')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Volver al Inicio
            </Button>
            
            {permissionStatus === 'granted' && !showPreview && (
              <Button
                variant="primary"
                shape="pill"
                onClick={handleContinueToAR}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continuar a AR
              </Button>
            )}
          </div>
        </div>

        {/* Browser Compatibility Notice */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-secondary-200 p-6">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Icon name="Globe" size={20} className="text-secondary-600" />
              Compatibilidad del Navegador
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Esta aplicación funciona mejor en navegadores modernos que soportan WebRTC:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Chrome', version: '53+' },
                { name: 'Firefox', version: '36+' },
                { name: 'Safari', version: '11+' },
                { name: 'Edge', version: '79+' }
              ].map((browser, index) => (
                <div key={index} className="text-center p-2 bg-secondary-50 rounded">
                  <Icon name="Globe" size={16} className="text-secondary-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-text-primary">{browser.name}</div>
                  <div className="text-xs text-text-muted">{browser.version}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Troubleshooting Modal */}
      <TroubleshootingGuide
        isVisible={showTroubleshooting}
        onClose={() => setShowTroubleshooting(false)}
      />
    </div>
  );
};

export default CameraPermissionSetup;