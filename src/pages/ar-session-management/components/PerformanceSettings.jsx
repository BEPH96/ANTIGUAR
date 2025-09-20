import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceSettings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    renderingQuality: 'high',
    frameRate: '60',
    batterySaving: false,
    adaptiveQuality: true,
    trackingSensitivity: 'medium',
    cacheSize: '500MB'
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getImpactText = (impact) => {
    switch (impact) {
      case 'low': return 'Bajo';
      case 'medium': return 'Medio';
      case 'high': return 'Alto';
      default: return 'Normal';
    }
  };

  const renderingOptions = [
    { value: 'low', label: 'Baja', impact: 'low', description: 'Mejor rendimiento, menor calidad visual' },
    { value: 'medium', label: 'Media', impact: 'medium', description: 'Balance entre calidad y rendimiento' },
    { value: 'high', label: 'Alta', impact: 'high', description: 'Máxima calidad visual' }
  ];

  const frameRateOptions = [
    { value: '30', label: '30 FPS', impact: 'low' },
    { value: '60', label: '60 FPS', impact: 'medium' },
    { value: '120', label: '120 FPS', impact: 'high' }
  ];

  const sensitivityOptions = [
    { value: 'low', label: 'Baja', description: 'Seguimiento más estable' },
    { value: 'medium', label: 'Media', description: 'Balance recomendado' },
    { value: 'high', label: 'Alta', description: 'Respuesta más rápida' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Configuración de Rendimiento</h3>
        <Button
          variant="outline"
          iconName="RotateCcw"
          onClick={() => {
            const defaultSettings = {
              renderingQuality: 'high',
              frameRate: '60',
              batterySaving: false,
              adaptiveQuality: true,
              trackingSensitivity: 'medium',
              cacheSize: '500MB'
            };
            setSettings(defaultSettings);
            if (onSettingsChange) onSettingsChange(defaultSettings);
          }}
        >
          Restablecer
        </Button>
      </div>

      <div className="space-y-6">
        {/* Rendering Quality */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-3">
            Calidad de Renderizado
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {renderingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSettingChange('renderingQuality', option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.renderingQuality === option.value
                    ? 'border-blue-500 bg-blue-50' :'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium text-slate-900">{option.label}</div>
                  <div className="text-xs text-slate-600 mt-1">{option.description}</div>
                  <div className={`text-xs mt-2 font-medium ${getImpactColor(option.impact)}`}>
                    Impacto: {getImpactText(option.impact)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frame Rate */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-3">
            Velocidad de Fotogramas
          </label>
          <div className="grid grid-cols-3 gap-3">
            {frameRateOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSettingChange('frameRate', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.frameRate === option.value
                    ? 'border-blue-500 bg-blue-50' :'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium text-slate-900">{option.label}</div>
                  <div className={`text-xs mt-1 font-medium ${getImpactColor(option.impact)}`}>
                    {getImpactText(option.impact)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">Modo Ahorro de Batería</div>
              <div className="text-sm text-slate-600">Reduce el consumo energético</div>
            </div>
            <button
              onClick={() => handleSettingChange('batterySaving', !settings.batterySaving)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.batterySaving ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.batterySaving ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">Calidad Adaptativa</div>
              <div className="text-sm text-slate-600">Ajusta automáticamente según el rendimiento</div>
            </div>
            <button
              onClick={() => handleSettingChange('adaptiveQuality', !settings.adaptiveQuality)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.adaptiveQuality ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.adaptiveQuality ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Tracking Sensitivity */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-3">
            Sensibilidad de Seguimiento
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sensitivityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSettingChange('trackingSensitivity', option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.trackingSensitivity === option.value
                    ? 'border-blue-500 bg-blue-50' :'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium text-slate-900">{option.label}</div>
                  <div className="text-xs text-slate-600 mt-1">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Performance Impact Summary */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Info" size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Impacto Estimado</span>
          </div>
          <div className="text-sm text-blue-800">
            Con la configuración actual, el consumo de batería será{' '}
            <span className="font-medium">
              {settings.batterySaving ? 'bajo' : settings.renderingQuality === 'high' ? 'alto' : 'medio'}
            </span>{' '}
            y el rendimiento será{' '}
            <span className="font-medium">
              {settings.adaptiveQuality ? 'optimizado automáticamente' : 'fijo'}
            </span>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSettings;