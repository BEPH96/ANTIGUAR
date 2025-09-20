import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = ({ onStartAR }) => {
  return (
    <section className="relative bg-gradient-to-t from-[#D3E7D5] to-[#E4EED5] px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              <span className='text-5xl block'>Descubre</span>
              <span className='text-5xl block'>La Antigua Guatemala con</span>
              <span className="text-5xl text-[#9C4500] block">Realidad Aumentada</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
              Explora monumentos históricos con objetos 3D interactivos, accede a contenido educativo enriquecido y vive experiencias inmersivas directamente desde tu dispositivo.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="xl"
                onClick={onStartAR}
                className="px-8 py-4 text-lg rounded-full bg-[#193948] font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                iconName="Camera"
                iconPosition="left"
              >
                Iniciar Experiencia AR
              </Button>
              
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8">
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Sin instalación</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Compatible móvil</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Tiempo real</span>
              </div>
            </div>
          </div>

          {/* AR Preview */}
          <div className="relative">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop"
                alt="Vista previa de experiencia AR mostrando objetos 3D interactivos"
                className="w-full h-80 md:h-96 object-cover"
              />
              
              {/* AR Overlay Effect 
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              
              {/* Floating AR Elements 
              <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-text-primary">AR Activo</span>
                </div>
              </div> */}
              
              {/*<div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-xs text-text-secondary">Toca para interactuar</span>
              </div>*/}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-800 rounded-full opacity-40 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
