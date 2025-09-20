import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SimplifiedGlobalHeader from '../../components/ui/SimplifiedGlobalHeader';
import ActiveSessionPanel from './components/ActiveSessionPanel';
import PerformanceSettings from './components/PerformanceSettings';
import SessionHistory from './components/SessionHistory';
import AdvancedSettings from './components/AdvancedSettings';
import StorageManagement from './components/StorageManagement';
import PrivacyControls from './components/PrivacyControls';

const ARSessionManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('session');
  const [sessionActive, setSessionActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    {
      id: 'session',
      label: 'Sesión Activa',
      icon: 'Play',
      component: ActiveSessionPanel
    },
    {
      id: 'performance',
      label: 'Rendimiento',
      icon: 'Zap',
      component: PerformanceSettings
    },
    {
      id: 'history',
      label: 'Historial',
      icon: 'History',
      component: SessionHistory
    },
    {
      id: 'advanced',
      label: 'Avanzado',
      icon: 'Settings',
      component: AdvancedSettings
    },
    {
      id: 'storage',
      label: 'Almacenamiento',
      icon: 'HardDrive',
      component: StorageManagement
    },
    {
      id: 'privacy',
      label: 'Privacidad',
      icon: 'Shield',
      component: PrivacyControls
    }
  ];

  const handleSessionAction = (action) => {
    switch (action) {
      case 'start':
        setSessionActive(true);
        navigate('/main-ar-experience-interface');
        break;
      case 'pause':
        setSessionActive(false);
        break;
      case 'save':
        // Handle save session
        break;
      case 'reset':
        setSessionActive(false);
        break;
      default:
        break;
    }
  };

  const handleSessionReload = (sessionId) => {
    setSessionActive(true);
    navigate('/main-ar-experience-interface');
  };

  const handleSettingsChange = (settings) => {
    console.log('Settings changed:', settings);
  };

  const handleStorageAction = (action, selectedItems) => {
    console.log('Storage action:', action, selectedItems);
  };

  const handlePrivacyChange = (privacySettings) => {
    console.log('Privacy settings changed:', privacySettings);
  };

  const renderActiveComponent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) return null;

    const Component = activeTabData.component;
    const commonProps = {
      onSettingsChange: handleSettingsChange
    };

    switch (activeTab) {
      case 'session':
        return (
          <Component
            sessionActive={sessionActive}
            onSessionAction={handleSessionAction}
            {...commonProps}
          />
        );
      case 'history':
        return (
          <Component
            onSessionReload={handleSessionReload}
            {...commonProps}
          />
        );
      case 'storage':
        return (
          <Component
            onStorageAction={handleStorageAction}
            {...commonProps}
          />
        );
      case 'privacy':
        return (
          <Component
            onPrivacyChange={handlePrivacyChange}
            {...commonProps}
          />
        );
      default:
        return <Component {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#D3E7D5] to-[#E4EED5]">
      <SimplifiedGlobalHeader arSessionActive={false} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <button
            onClick={() => navigate('/ar-experience-landing')}
            className="hover:text-slate-900 transition-colors"
          >
            Inicio
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-slate-900 font-medium">Gestión de Sesiones AR</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Gestión de Sesiones AR
            </h1>
            <p className="text-slate-600">
              Controla tu experiencia AR, optimiza el rendimiento y gestiona tus datos
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              iconName="Camera"
              onClick={() => navigate('/main-ar-experience-interface')}
            >
              Iniciar AR
            </Button>
            <Button
              variant="primary"
              iconName="Settings"
              onClick={() => setActiveTab('advanced')}
            >
              Configuración
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          {isMobile ? (
            // Mobile Dropdown
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full p-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Desktop Tabs
            <div className="bg-white rounded-lg p-1 shadow-sm border border-slate-200">
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active Component */}
        <div className="mb-8">
          {renderActiveComponent()}
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              iconName="Camera"
              onClick={() => navigate('/main-ar-experience-interface')}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Iniciar Sesión AR</div>
                <div className="text-xs text-slate-600 mt-1">Comenzar nueva experiencia</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              iconName="Package"
              onClick={() => navigate('/ar-object-library')}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Biblioteca de Objetos</div>
                <div className="text-xs text-slate-600 mt-1">Explorar modelos 3D</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              iconName="Settings"
              onClick={() => navigate('/camera-permission-setup')}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Configurar Cámara</div>
                <div className="text-xs text-slate-600 mt-1">Permisos y calibración</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              iconName="HelpCircle"
              onClick={() => {}}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">Ayuda y Soporte</div>
                <div className="text-xs text-slate-600 mt-1">Guías y resolución</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">
              © {new Date().getFullYear()} AR Web Prototype. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <button className="hover:text-slate-900 transition-colors">
                Política de Privacidad
              </button>
              <button className="hover:text-slate-900 transition-colors">
                Términos de Uso
              </button>
              <button className="hover:text-slate-900 transition-colors">
                Soporte
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ARSessionManagement;