import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompatibilitySection = () => {
  const [browserSupport, setBrowserSupport] = useState({
    webrtc: false,
    webgl: false,
    deviceOrientation: false,
    camera: false
  });
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    browser: 'unknown',
    os: 'unknown'
  });

  const supportedBrowsers = [
    {
      name: 'Chrome',
      icon: 'Chrome',
      minVersion: '67+',
      support: 'full',
      color: 'text-green-600'
    },
    {
      name: 'Firefox',
      icon: 'Firefox',
      minVersion: '60+',
      support: 'full',
      color: 'text-green-600'
    },
    {
      name: 'Safari',
      icon: 'Safari',
      minVersion: '11+',
      support: 'partial',
      color: 'text-yellow-600'
    },
    {
      name: 'Edge',
      icon: 'Globe',
      minVersion: '79+',
      support: 'full',
      color: 'text-green-600'
    }
  ];

  const deviceTypes = [
    {
      type: 'Móvil',
      icon: 'Smartphone',
      description: 'iOS 11+ / Android 7+',
      support: 'recommended',
      color: 'text-primary'
    },
    {
      type: 'Tablet',
      icon: 'Tablet',
      description: 'iPad / Android Tablets',
      support: 'supported',
      color: 'text-green-600'
    },
    {
      type: 'Desktop',
      icon: 'Monitor',
      description: 'Windows / macOS / Linux',
      support: 'limited',
      color: 'text-yellow-600'
    }
  ];

  const checkBrowserCapabilities = () => {
    const capabilities = {
      webrtc: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      webgl: !!window.WebGLRenderingContext,
      deviceOrientation: 'DeviceOrientationEvent' in window,
      camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    };

    setBrowserSupport(capabilities);

    // Detect device info
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const browser = getBrowserName();
    const os = getOSName();

    setDeviceInfo({ isMobile, browser, os });
  };

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Desconocido';
  };

  const getOSName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Desconocido';
  };

  const getSupportLevel = () => {
    const supportCount = Object.values(browserSupport).filter(Boolean).length;
    if (supportCount >= 3) return { level: 'high', text: 'Excelente', color: 'text-green-600' };
    if (supportCount >= 2) return { level: 'medium', text: 'Bueno', color: 'text-accent-500' };
    return { level: 'low', text: 'Limitado', color: 'text-red-600' };
  };

  useEffect(() => {
    checkBrowserCapabilities();
  }, []);

  const support = getSupportLevel();

  return (
    <section className="bg-[#D3E7D5] py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Compatibilidad del Dispositivo
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Verifica si tu dispositivo y navegador son compatibles con nuestras experiencias AR
          </p>
        </div>

        {/* Current Device Status */}
        <div className="bg-surface rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <Icon name={deviceInfo.isMobile ? 'Smartphone' : 'Monitor'} size={32} className="text-green-800" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Tu Dispositivo</h3>
                <p className="text-text-secondary">{deviceInfo.browser} en {deviceInfo.os}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                support.level === 'high' ? 'bg-green-600' : 
                support.level === 'medium' ? 'bg-accent-500' : 'bg-red-500'
              }`}></div>
              <span className={`font-semibold ${support.color}`}>
                Soporte {support.text}
              </span>
            </div>
          </div>

          {/* Capability Checks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            {[
              { key: 'webrtc', label: 'WebRTC', icon: 'Video' },
              { key: 'webgl', label: 'WebGL', icon: 'Cpu' },
              { key: 'deviceOrientation', label: 'Orientación', icon: 'RotateCcw' },
              { key: 'camera', label: 'Cámara', icon: 'Camera' }
            ].map((capability) => (
              <div key={capability.key} className="flex items-center gap-2">
                <Icon
                  name={browserSupport[capability.key] ? 'CheckCircle' : 'XCircle'}
                  size={16}
                  className={browserSupport[capability.key] ? 'text-green-600' : 'text-red-600'}
                />
                <span className="text-sm text-text-secondary">{capability.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Supported Browsers */}
          <div className="bg-surface rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Icon name="Globe" size={24} className="text-green-800" />
              Navegadores Compatibles
            </h3>
            <div className="space-y-4">
              {supportedBrowsers.map((browser) => (
                <div key={browser.name} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Globe" size={20} className={browser.color} />
                    <div>
                      <span className="font-medium text-text-primary">{browser.name}</span>
                      <span className="text-sm text-text-secondary ml-2">{browser.minVersion}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    browser.support === 'full' ? 'bg-green-100 text-green-800' :
                    browser.support === 'partial'? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {browser.support === 'full' ? 'Completo' : 
                     browser.support === 'partial' ? 'Parcial' : 'No soportado'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Types */}
          <div className="bg-surface rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Icon name="Smartphone" size={24} className="text-green-800" />
              Tipos de Dispositivo
            </h3>
            <div className="space-y-4">
              {deviceTypes.map((device) => (
                <div key={device.type} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name={device.icon} size={20} className={device.color} />
                    <div>
                      <span className="font-medium text-text-primary">{device.type}</span>
                      <p className="text-sm text-text-secondary">{device.description}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    device.support === 'recommended' ? 'bg-blue-100 text-blue-700' :
                    device.support === 'supported'? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-accent-500'
                  }`}>
                    {device.support === 'recommended' ? 'Recomendado' : 
                     device.support === 'supported' ? 'Soportado' : 'Limitado'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              shape="pill"
              size="lg"
              onClick={checkBrowserCapabilities}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Verificar Nuevamente
            </Button>
            <Button
              variant="outline"
              shape="pill"
              size="lg"
              iconName="HelpCircle"
              iconPosition="left"
            >
              Ayuda de Compatibilidad
            </Button>
          </div>
          
          {support.level === 'low' && (
            <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-center gap-2 text-warning-700">
                <Icon name="AlertTriangle" size={20} />
                <span className="font-medium">Compatibilidad Limitada</span>
              </div>
              <p className="text-sm text-warning-600 mt-2">
                Tu dispositivo tiene soporte limitado. Algunas funciones AR pueden no estar disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompatibilitySection;