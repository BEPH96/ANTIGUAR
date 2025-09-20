import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PermissionStatusCard = ({ 
  status, 
  onRequestPermission, 
  onRetry, 
  onTroubleshoot 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'granted':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success-600',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          title: 'Cámara Autorizada',
          message: 'Perfecto. Tu cámara está lista para la experiencia AR.',
          showButton: false
        };
      case 'denied':
        return {
          icon: 'XCircle',
          iconColor: 'text-error-600',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200',
          title: 'Permiso Denegado',
          message: 'Necesitamos acceso a tu cámara para funcionar correctamente.',
          showButton: true,
          buttonText: 'Reintentar',
          buttonAction: onRetry
        };
      case 'blocked':
        return {
          icon: 'Shield',
          iconColor: 'text-warning-600',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200',
          title: 'Permiso Bloqueado',
          message: 'El acceso a la cámara está bloqueado. Consulta la guía de solución de problemas.',
          showButton: true,
          buttonText: 'Solucionar Problema',
          buttonAction: onTroubleshoot
        };
      case 'requesting':
        return {
          icon: 'Loader',
          iconColor: 'text-primary-600',
          bgColor: 'bg-primary-50',
          borderColor: 'border-primary-200',
          title: 'Solicitando Permiso',
          message: 'Por favor, permite el acceso a la cámara en el diálogo del navegador.',
          showButton: false
        };
      default:
        return {
          icon: 'Camera',
          iconColor: 'text-secondary-600',
          bgColor: 'bg-secondary-50',
          borderColor: 'border-secondary-200',
          title: 'Acceso a Cámara Requerido',
          message: 'Para comenzar tu experiencia AR, necesitamos acceso a tu cámara.',
          showButton: true,
          buttonText: 'Permitir Cámara',
          buttonAction: onRequestPermission
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`w-full max-w-md mx-auto p-6 rounded-xl border-2 ${config.bgColor} ${config.borderColor} transition-all duration-300`}>
      <div className="text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={`p-4 rounded-full bg-white/50 ${status === 'requesting' ? 'animate-pulse' : ''}`}>
            <Icon 
              name={config.icon} 
              size={48} 
              className={`${config.iconColor} ${status === 'requesting' ? 'animate-spin' : ''}`}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-text-primary">
          {config.title}
        </h3>

        {/* Message */}
        <p className="text-text-secondary text-sm leading-relaxed">
          {config.message}
        </p>

        {/* Action Button */}
        {config.showButton && (
          <div className="pt-2">
            <Button
              variant={status === 'denied' ? 'primary' : status === 'blocked' ? 'warning' : 'primary'}
              onClick={config.buttonAction}
              className="w-full py-3"
              disabled={status === 'requesting'}
            >
              {config.buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionStatusCard;