import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TroubleshootingGuide = ({ isVisible, onClose }) => {
  const [activeSection, setActiveSection] = useState('chrome');

  const browserGuides = {
    chrome: {
      name: 'Google Chrome',
      icon: 'Globe',
      steps: [
        'Haz clic en el icono de candado o información junto a la URL',
        'Selecciona "Configuración del sitio" o "Permisos"',
        'Busca "Cámara" y cambia a "Permitir"',
        'Recarga la página y vuelve a intentar'
      ]
    },
    firefox: {
      name: 'Mozilla Firefox',
      icon: 'Globe',
      steps: [
        'Haz clic en el icono de escudo junto a la URL',
        'Selecciona "Configuración de permisos"',
        'Encuentra "Usar la cámara" y selecciona "Permitir"',
        'Recarga la página para aplicar los cambios'
      ]
    },
    safari: {
      name: 'Safari',
      icon: 'Globe',
      steps: [
        'Ve a Safari > Preferencias > Sitios web',
        'Selecciona "Cámara" en la barra lateral',
        'Encuentra este sitio y cambia a "Permitir"',
        'Cierra las preferencias y recarga la página'
      ]
    },
    edge: {
      name: 'Microsoft Edge',
      icon: 'Globe',
      steps: [
        'Haz clic en el icono de candado en la barra de direcciones',
        'Selecciona "Permisos para este sitio"',
        'Cambia "Cámara" a "Permitir"',
        'Recarga la página y prueba nuevamente'
      ]
    }
  };

  const commonIssues = [
    {
      issue: 'El diálogo de permisos no aparece',
      solution: 'Verifica que no hayas bloqueado previamente los permisos. Revisa la configuración del navegador.'
    },
    {
      issue: 'Error "Cámara no disponible"',
      solution: 'Asegúrate de que ninguna otra aplicación esté usando la cámara y que esté conectada correctamente.'
    },
    {
      issue: 'Permisos concedidos pero no funciona',
      solution: 'Intenta recargar la página completamente (Ctrl+F5) o reinicia el navegador.'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-text-primary">
            Guía de Solución de Problemas
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Browser Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Selecciona tu Navegador
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(browserGuides).map(([key, browser]) => (
                <Button
                  key={key}
                  variant={activeSection === key ? 'primary' : 'outline'}
                  onClick={() => setActiveSection(key)}
                  className="flex flex-col items-center gap-2 p-3 h-auto"
                >
                  <Icon name={browser.icon} size={20} />
                  <span className="text-xs">{browser.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Browser-specific Steps */}
          <div className="bg-secondary-50 rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">
              Pasos para {browserGuides[activeSection].name}
            </h4>
            <ol className="space-y-2">
              {browserGuides[activeSection].steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-text-secondary text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Common Issues */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Problemas Comunes
            </h3>
            <div className="space-y-3">
              {commonIssues.map((item, index) => (
                <div key={index} className="border border-secondary-200 rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                    <Icon name="AlertCircle" size={16} className="text-warning-600" />
                    {item.issue}
                  </h4>
                  <p className="text-text-secondary text-sm">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-start gap-3">
              <Icon name="HelpCircle" size={20} className="text-primary-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary mb-1">
                  ¿Sigues teniendo problemas?
                </h4>
                <p className="text-text-secondary text-sm mb-3">
                  Si ninguna de estas soluciones funciona, verifica que tu navegador sea compatible con WebRTC y que tengas la versión más reciente instalada.
                </p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                  className="text-sm"
                >
                  Recargar Página
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;