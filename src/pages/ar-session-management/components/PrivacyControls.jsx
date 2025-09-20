import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyControls = ({ onPrivacyChange }) => {
  const [permissions, setPermissions] = useState({
    camera: 'granted',
    microphone: 'denied',
    location: 'prompt',
    storage: 'granted'
  });

  const [dataSettings, setDataSettings] = useState({
    saveSessionData: true,
    shareAnalytics: false,
    retainHistory: true,
    autoDelete: '30days',
    encryptData: true
  });

  const [showDataDetails, setShowDataDetails] = useState(false);

  const permissionLabels = {
    camera: 'Cámara',
    microphone: 'Micrófono',
    location: 'Ubicación',
    storage: 'Almacenamiento'
  };

  const permissionDescriptions = {
    camera: 'Necesario para la experiencia AR',
    microphone: 'Para grabación de audio en sesiones',
    location: 'Para experiencias AR basadas en ubicación',
    storage: 'Para guardar modelos 3D y configuraciones'
  };

  const getPermissionStatus = (status) => {
    switch (status) {
      case 'granted':
        return { color: 'text-green-600 bg-green-100', text: 'Concedido', icon: 'Check' };
      case 'denied':
        return { color: 'text-red-600 bg-red-100', text: 'Denegado', icon: 'X' };
      case 'prompt':
        return { color: 'text-amber-600 bg-amber-100', text: 'Pendiente', icon: 'AlertCircle' };
      default:
        return { color: 'text-slate-600 bg-slate-100', text: 'Desconocido', icon: 'HelpCircle' };
    }
  };

  const handlePermissionRequest = (permission) => {
    // Simulate permission request
    setPermissions(prev => ({
      ...prev,
      [permission]: prev[permission] === 'granted' ? 'denied' : 'granted'
    }));
  };

  const handleDataSettingChange = (setting, value) => {
    const newSettings = { ...dataSettings, [setting]: value };
    setDataSettings(newSettings);
    if (onPrivacyChange) {
      onPrivacyChange({ permissions, dataSettings: newSettings });
    }
  };

  const dataRetentionOptions = [
    { value: '7days', label: '7 días' },
    { value: '30days', label: '30 días' },
    { value: '90days', label: '90 días' },
    { value: '1year', label: '1 año' },
    { value: 'never', label: 'Nunca eliminar' }
  ];

  const dataTypes = [
    {
      name: 'Datos de Sesión',
      description: 'Información sobre duración, objetos utilizados y configuraciones',
      size: '2.3 MB',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Preferencias de Usuario',
      description: 'Configuraciones personalizadas y ajustes de rendimiento',
      size: '0.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      name: 'Datos de Calibración',
      description: 'Información de calibración de cámara y seguimiento',
      size: '1.2 MB',
      lastUpdated: '2024-01-14'
    },
    {
      name: 'Historial de Uso',
      description: 'Registro de actividades y estadísticas de uso',
      size: '0.8 MB',
      lastUpdated: '2024-01-13'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Controles de Privacidad</h3>
        <Button
          variant="outline"
          iconName="Shield"
          onClick={() => setShowDataDetails(!showDataDetails)}
        >
          {showDataDetails ? 'Ocultar' : 'Ver'} Datos
        </Button>
      </div>

      {/* Camera Permissions */}
      <div className="mb-6">
        <h4 className="font-medium text-slate-900 mb-4">Permisos de Dispositivo</h4>
        <div className="space-y-3">
          {Object.entries(permissions).map(([permission, status]) => {
            const statusInfo = getPermissionStatus(status);
            return (
              <div key={permission} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Camera" size={20} className="text-slate-600" />
                  <div>
                    <div className="font-medium text-slate-900">
                      {permissionLabels[permission]}
                    </div>
                    <div className="text-sm text-slate-600">
                      {permissionDescriptions[permission]}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                    <Icon name={statusInfo.icon} size={12} />
                    {statusInfo.text}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handlePermissionRequest(permission)}
                    className="text-sm"
                  >
                    {status === 'granted' ? 'Revocar' : 'Solicitar'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Retention Settings */}
      <div className="mb-6">
        <h4 className="font-medium text-slate-900 mb-4">Configuración de Datos</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">Guardar Datos de Sesión</div>
              <div className="text-sm text-slate-600">Permite mejorar la experiencia y recargar sesiones</div>
            </div>
            <button
              onClick={() => handleDataSettingChange('saveSessionData', !dataSettings.saveSessionData)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dataSettings.saveSessionData ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dataSettings.saveSessionData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">Compartir Análisis Anónimos</div>
              <div className="text-sm text-slate-600">Ayuda a mejorar la aplicación sin identificarte</div>
            </div>
            <button
              onClick={() => handleDataSettingChange('shareAnalytics', !dataSettings.shareAnalytics)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dataSettings.shareAnalytics ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dataSettings.shareAnalytics ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">Cifrado de Datos</div>
              <div className="text-sm text-slate-600">Protege tus datos con cifrado local</div>
            </div>
            <button
              onClick={() => handleDataSettingChange('encryptData', !dataSettings.encryptData)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dataSettings.encryptData ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dataSettings.encryptData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Retention Period */}
      <div className="mb-6">
        <h4 className="font-medium text-slate-900 mb-3">Período de Retención</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {dataRetentionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDataSettingChange('autoDelete', option.value)}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                dataSettings.autoDelete === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700' :'border-slate-200 hover:border-slate-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Los datos se eliminarán automáticamente después del período seleccionado
        </p>
      </div>

      {/* Data Details */}
      {showDataDetails && (
        <div className="border-t border-slate-200 pt-6">
          <h4 className="font-medium text-slate-900 mb-4">Datos Almacenados</h4>
          <div className="space-y-3">
            {dataTypes.map((dataType, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{dataType.name}</div>
                  <div className="text-sm text-slate-600">{dataType.description}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Actualizado: {new Date(dataType.lastUpdated).toLocaleDateString('es-ES')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">{dataType.size}</div>
                  <Button variant="ghost" iconName="Trash2" className="text-xs mt-1">
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export and Delete Options */}
      <div className="border-t border-slate-200 pt-6">
        <h4 className="font-medium text-slate-900 mb-4">Gestión de Datos</h4>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" iconName="Download">
            Exportar Mis Datos
          </Button>
          <Button variant="outline" iconName="Copy">
            Solicitar Copia
          </Button>
          <Button variant="danger" iconName="Trash2">
            Eliminar Todos los Datos
          </Button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Info" size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Aviso de Privacidad</span>
        </div>
        <p className="text-sm text-blue-800">
          Tus datos se procesan localmente en tu dispositivo. Solo se comparten datos anónimos 
          si has dado tu consentimiento. Puedes revocar permisos en cualquier momento.
        </p>
      </div>
    </div>
  );
};

export default PrivacyControls;