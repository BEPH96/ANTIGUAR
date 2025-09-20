import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveSessionPanel = ({ sessionActive = false, onSessionAction }) => {
  const [sessionTime, setSessionTime] = useState(0);
  const [objectsPlaced, setObjectsPlaced] = useState(0);
  const [sessionStatus, setSessionStatus] = useState('inactive');

  // Mock session data
  const mockSessionData = {
    startTime: new Date(Date.now() - 1800000), // 30 minutes ago
    objectsPlaced: 7,
    status: sessionActive ? 'active' : 'inactive',
    quality: 'high',
    fps: 60,
    batteryImpact: 'medium'
  };

  useEffect(() => {
    if (sessionActive) {
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      setObjectsPlaced(mockSessionData.objectsPlaced);
      setSessionStatus('active');
      return () => clearInterval(interval);
    } else {
      setSessionStatus('inactive');
      setSessionTime(0);
      setObjectsPlaced(0);
    }
  }, [sessionActive]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAction = (action) => {
    if (onSessionAction) {
      onSessionAction(action);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Sesión Activa</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
          sessionStatus === 'active' ?'bg-green-100 text-green-700' :'bg-slate-100 text-slate-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            sessionStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
          }`} />
          {sessionStatus === 'active' ? 'Activa' : 'Inactiva'}
        </div>
      </div>

      {sessionStatus === 'active' ? (
        <div className="space-y-6">
          {/* Session Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Clock" size={16} className="text-slate-600" />
                <span className="text-sm text-slate-600">Tiempo</span>
              </div>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {formatTime(sessionTime)}
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Package" size={16} className="text-slate-600" />
                <span className="text-sm text-slate-600">Objetos</span>
              </div>
              <div className="text-xl font-bold text-slate-900">
                {objectsPlaced}
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Zap" size={16} className="text-slate-600" />
                <span className="text-sm text-slate-600">FPS</span>
              </div>
              <div className="text-xl font-bold text-slate-900">
                {mockSessionData.fps}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="warning"
              iconName="Pause"
              onClick={() => handleAction('pause')}
              className="flex-1 sm:flex-none"
            >
              Pausar
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              onClick={() => handleAction('save')}
              className="flex-1 sm:flex-none"
            >
              Guardar
            </Button>
            <Button
              variant="danger"
              iconName="RotateCcw"
              onClick={() => handleAction('reset')}
              className="flex-1 sm:flex-none"
            >
              Reiniciar
            </Button>
          </div>

          {/* Performance Indicators */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-sm font-medium text-slate-900 mb-3">Rendimiento Actual</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Calidad de Renderizado</span>
                <span className="text-sm font-medium text-green-600">Alta</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Impacto en Batería</span>
                <span className="text-sm font-medium text-amber-600">Medio</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Seguimiento</span>
                <span className="text-sm font-medium text-green-600">Óptimo</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Play" size={48} className="text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-4">No hay sesión AR activa</p>
          <Button
            variant="primary"
            iconName="Camera"
            onClick={() => handleAction('start')}
          >
            Iniciar Sesión AR
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveSessionPanel;