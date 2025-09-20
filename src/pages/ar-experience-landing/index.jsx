import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplifiedGlobalHeader from '../../components/ui/SimplifiedGlobalHeader';
import HeroSection from './components/HeroSection';
import ExperienceCarousel from './components/ExperienceCarousel';
import FeaturesSection from './components/FeaturesSection';
import CompatibilitySection from './components/CompatibilitySection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ARExperienceLanding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle AR experience start
  const handleStartAR = async () => {
    setIsLoading(true);
    
    try {
      // Check camera permissions first
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Navigate to camera permission setup
        navigate('/camera-permission-setup');
      } else {
        // Browser doesn't support camera access alert('Tu navegador no soporta acceso a la cámara. Por favor, usa un navegador compatible.');
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      alert('Error al verificar permisos de cámara. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    // Store selected category in localStorage for later use
    localStorage.setItem('selectedARCategory', JSON.stringify(category));
    
    // Navigate to AR object library with category filter
    navigate('/ar-object-library', { 
      state: { 
        selectedCategory: category.id,
        categoryData: category 
      } 
    });
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle navigation to different sections
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <SimplifiedGlobalHeader arSessionActive={false} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection onStartAR={handleStartAR} />

        {/* Experience Categories Carousel 
        <ExperienceCarousel onCategorySelect={handleCategorySelect} />*/}

        {/* Features Section */}
        <FeaturesSection />

        {/* Compatibility Section */}
        <CompatibilitySection />

        {/* Call to Action Section 
        <section className="bg-[#FCDC73] py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#193948] mb-6">
                ¿Listo para Comenzar?
              </h2>
              <p className="text-lg mb-8">
                Sumérgete en el mundo de la realidad aumentada y descubre nuevas formas de interactuar con el contenido digital
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleStartAR}
                  disabled={isLoading}
                  className="px-8 py-4 text-lg font-semibold"
                  iconName={isLoading ? "Loader" : "Camera"}
                  iconPosition="left"
                >
                  {isLoading ? 'Verificando...' : 'Iniciar Experiencia AR'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleNavigation('/ar-object-library')}
                  className="px-6 py-3 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  iconName="Package"
                  iconPosition="left"
                >
                  Explorar Biblioteca
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
                <button
                  onClick={() => handleNavigation('/ar-session-management')}
                  className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <Icon name="Settings" size={16} />
                  <span className="text-sm">Gestión de Sesiones</span>
                </button>
                
                <button
                  onClick={() => handleNavigation('/camera-permission-setup')}
                  className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <Icon name="Camera" size={16} />
                  <span className="text-sm">Configurar Cámara</span>
                </button>
                
                <button
                  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API', '_blank')}
                  className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <Icon name="ExternalLink" size={16} />
                  <span className="text-sm">Documentación WebXR</span>
                </button>
              </div>
            </div>
          </div>
        </section>*/}
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                
                <span className="text-xl font-bold">ANTIGUAR</span>
              </div>
              <p className="text-secondary-300 mb-4 max-w-md">
                Plataforma de realidad aumentada web que ofrece experiencias inmersivas directamente en tu navegador.
              </p>
              <div className="flex gap-4">
                <Icon name="Github" size={20} className="text-secondary-400 hover:text-secondary-foreground cursor-pointer transition-colors" />
                <Icon name="Twitter" size={20} className="text-secondary-400 hover:text-secondary-foreground cursor-pointer transition-colors" />
                <Icon name="Linkedin" size={20} className="text-secondary-400 hover:text-secondary-foreground cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation('/ar-object-library')}
                    className="text-secondary-300 hover:text-secondary-foreground transition-colors"
                  >
                    Quizes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/ar-session-management')}
                    className="text-secondary-300 hover:text-secondary-foreground transition-colors"
                  >
                    Monitoreo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/camera-permission-setup')}
                    className="text-secondary-300 hover:text-secondary-foreground transition-colors"
                  >
                    Configuración 
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-secondary-300 hover:text-secondary-foreground transition-colors">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-300 hover:text-secondary-foreground transition-colors">
                    Preguntas Frecuentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-300 hover:text-secondary-foreground transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
            <p className="text-secondary-400">
              © {new Date().getFullYear()} AR Web. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          variant="green"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="bg-surface rounded-lg p-6 flex items-center gap-3">
            <Icon name="Loader" size={24} className="text-primary animate-spin" />
            <span className="text-text-primary font-medium">Verificando compatibilidad...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARExperienceLanding;