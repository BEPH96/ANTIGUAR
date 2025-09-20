import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyAssurance = () => {
  const privacyPoints = [
    {
      icon: 'Shield',
      title: 'Datos Seguros',
      description: 'Tu información de cámara se procesa localmente en tu dispositivo.'
    },
    {
      icon: 'Eye',
      title: 'Sin Grabación',
      description: 'No grabamos ni almacenamos ningún video o imagen de tu cámara.'
    },
    {
      icon: 'Lock',
      title: 'Privacidad Total',
      description: 'Puedes revocar el permiso en cualquier momento desde tu navegador.'
    },
    {
      icon: 'Zap',
      title: 'Procesamiento Local',
      description: 'Todo el procesamiento AR ocurre en tu dispositivo, no en nuestros servidores.'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Tu Privacidad es Nuestra Prioridad
        </h3>
        <p className="text-text-secondary text-sm">
          Comprometidos con la protección de tus datos personales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {privacyPoints.map((point, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-white border border-secondary-200 hover:border-primary-200 transition-colors duration-200"
          >
            <div className="flex-shrink-0 p-2 rounded-lg bg-primary-50">
              <Icon
                name={point.icon}
                size={20}
                className="text-green-800"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary mb-1">
                {point.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary-50 border border-secondary-200">
        <div className="flex items-start gap-3">
          <Icon
            name="Info"
            size={20}
            className="text-secondary-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong>Nota:</strong> El acceso a la cámara es necesario únicamente para la funcionalidad de realidad aumentada. 
              Puedes gestionar estos permisos en la configuración de tu navegador en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAssurance;