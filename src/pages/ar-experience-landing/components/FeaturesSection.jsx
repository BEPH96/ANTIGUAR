import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesSection = () => {
  const features = [
    {
      id: 'no-installation',
      title: 'Sin Instalación',
      description: 'Accede a experiencias AR directamente desde tu navegador web sin necesidad de descargar aplicaciones adicionales.',
      icon: 'Download',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      benefits: ['Acceso inmediato', 'Ahorro de espacio', 'Siempre actualizado']
    },
    {
      id: 'cross-platform',
      title: 'Multiplataforma',
      description: 'Compatible con dispositivos móviles, tablets y computadoras de escritorio en diferentes sistemas operativos.',
      icon: 'Smartphone',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      benefits: ['iOS y Android', 'Windows y macOS', 'Experiencia consistente']
    },
    {
      id: 'real-time',
      title: 'Tiempo Real',
      description: 'Interacciones fluidas y respuesta inmediata con seguimiento preciso de objetos y gestos en tiempo real.',
      icon: 'Zap',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      benefits: ['Baja latencia', 'Seguimiento preciso', 'Interacción natural']
    },
    {
      id: 'educational',
      title: 'Contenido Educativo',
      description: 'Aprende conceptos complejos a través de visualizaciones 3D interactivas y experiencias inmersivas.',
      icon: 'BookOpen',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      benefits: ['Aprendizaje visual', 'Conceptos complejos', 'Retención mejorada']
    },
    {
      id: 'intuitive',
      title: 'Interfaz Intuitiva',
      description: 'Controles táctiles simples y navegación intuitiva diseñada para usuarios de todos los niveles técnicos.',
      icon: 'TouchpadOff',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      benefits: ['Fácil de usar', 'Controles táctiles', 'Accesible para todos']
    },
    {
      id: 'performance',
      title: 'Alto Rendimiento',
      description: 'Optimizado para ofrecer experiencias fluidas incluso en dispositivos con recursos limitados.',
      icon: 'Gauge',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      benefits: ['Optimización avanzada', 'Bajo consumo', 'Rendimiento estable']
    }
  ];

  return (
    <section className="bg-[#D3E7D5] py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Descubre las ventajas de nuestra plataforma AR web que combina tecnología avanzada con facilidad de uso
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-surface rounded-xl shadow-lg border border-border/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={`Característica ${feature.title} - ${feature.description}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name={feature.icon} size={24} className="text-green-800" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">99%</div>
              <div className="text-sm text-text-secondary">Compatibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">&lt;50ms</div>
              <div className="text-sm text-text-secondary">Latencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">60fps</div>
              <div className="text-sm text-text-secondary">Rendimiento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">0MB</div>
              <div className="text-sm text-text-secondary">Descarga</div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-text-primary mb-8">
            Tecnologías Utilizadas
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'WebGL', icon: 'Cpu' },
              { name: 'AR.js', icon: 'Glasses' },
              { name: 'Three.js', icon: 'Box' },
              { name: 'React', icon: 'Code' },
              { name: 'PWA', icon: 'Smartphone' }
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
              >
                <Icon name={tech.icon} size={20} className="text-green-800" />
                <span className="text-sm font-medium text-text-primary">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;