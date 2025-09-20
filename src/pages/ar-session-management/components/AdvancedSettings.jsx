import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedSettings = ({ onSettingsChange }) => {
  const [debugMode, setDebugMode] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [calibrationStatus, setCalibrationStatus] = useState('good');

  // Mock diagnostic data
  const diagnosticData = {
    cameraResolution: "1920x1080",
    processingLatency: "12ms",
    trackingAccuracy: "98.5%",
    memoryUsage: "245MB",
    gpuUsage: "67%",
    thermalState: "normal",
    networkLatency: "45ms",
    lastCalibration: "2024-01-15 14:30:00"
  };

  const handleCalibrationReset = () => {
    setCalibrationStatus('calibrating');
    setTimeout(() => {
      setCalibrationStatus('good');
    }, 3000);
  };

  const handleDebugToggle = () => {
    setDebugMode(!debugMode);
    if (onSettingsChange) {
      onSettingsChange({ debugMode: !debugMode });
    }
  };

  const getCalibrationColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'calibrating': return 'text-amber-600';
      case 'poor': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getCalibrationText = (status) => {
    switch (status) {
      case 'good': return 'Óptima';
      case 'calibrating': return 'Calibrando...';
      case 'poor': return 'Requiere Calibración';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Configuración Avanzada</h3>
        <Button
          variant="outline"
          iconName="Settings"
          onClick={() => setShowDiagnostics(!showDiagnostics)}
        >
          {showDiagnostics ? 'Ocultar' : 'Diagnósticos'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Camera Calibration */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-slate-900">Calibración de Cámara</h4>
              <p className="text-sm text-slate-600">Estado actual del sistema de seguimiento</p>
            </div>
            <div className={`font-medium ${getCalibrationColor(calibrationStatus)}`}>
              {getCalibrationText(calibrationStatus)}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              iconName="RotateCcw"
              onClick={handleCalibrationReset}
              disabled={calibrationStatus === 'calibrating'}
            >
              {calibrationStatus === 'calibrating' ? 'Calibrando...' : 'Recalibrar'}
            </Button>
            <Button variant="ghost" iconName="Info">
              Ayuda
            </Button>
          </div>
        </div>

        {/* Debug Mode */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div>
            <div className="font-medium text-slate-900">Modo Depuración</div>
            <div className="text-sm text-slate-600">Muestra información técnica en tiempo real</div>
          </div>
          <button
            onClick={handleDebugToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              debugMode ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                debugMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Tracking Sensitivity Adjustment */}
        <div>
          <h4 className="font-medium text-slate-900 mb-3">Ajuste de Sensibilidad</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Sensibilidad de Movimiento
              </label>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="5"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Baja</span>
                <span>Media</span>
                <span>Alta</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Umbral de Detección
              </label>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="7"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Permisivo</span>
                <span>Equilibrado</span>
                <span>Estricto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Information */}
        {showDiagnostics && (
          <div className="bg-slate-900 rounded-lg p-4 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Terminal" size={16} />
              <h4 className="font-medium">Información de Diagnóstico</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolución:</span>
                  <span>{diagnosticData.cameraResolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Latencia:</span>
                  <span className="text-green-400">{diagnosticData.processingLatency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Precisión:</span>
                  <span className="text-green-400">{diagnosticData.trackingAccuracy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Memoria:</span>
                  <span className="text-amber-400">{diagnosticData.memoryUsage}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">GPU:</span>
                  <span className="text-amber-400">{diagnosticData.gpuUsage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Térmica:</span>
                  <span className="text-green-400">{diagnosticData.thermalState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Red:</span>
                  <span className="text-green-400">{diagnosticData.networkLatency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Calibración:</span>
                  <span className="text-slate-300">{new Date(diagnosticData.lastCalibration).toLocaleString('es-ES')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" iconName="Copy" className="text-xs">
                Copiar Log
              </Button>
              <Button variant="outline" iconName="Download" className="text-xs">
                Exportar
              </Button>
            </div>
          </div>
        )}

        {/* Reset Options */}
        <div className="border-t border-slate-200 pt-6">
          <h4 className="font-medium text-slate-900 mb-4">Opciones de Restablecimiento</h4>
          <div className="space-y-3">
            <Button
              variant="outline"
              iconName="RotateCcw"
              className="w-full justify-start"
            >
              Restablecer Configuración de Rendimiento
            </Button>
            <Button
              variant="outline"
              iconName="Trash2"
              className="w-full justify-start"
            >
              Limpiar Caché de Seguimiento
            </Button>
            <Button
              variant="danger"
              iconName="AlertTriangle"
              className="w-full justify-start"
            >
              Restablecer Configuración de Fábrica
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;