import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ExperienceCarousel = ({ onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const experiences = [
    {
      id: 'objects-3d',
      title: 'Objetos 3D',
      description: 'Explora modelos tridimensionales interactivos con gestos táctiles',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      icon: 'Box',
      color: 'from-blue-500 to-purple-600',
      count: '12+ modelos'
    },
    {
      id: 'interactive-demos',
      title: 'Demos Interactivos',
      description: 'Experimenta con simulaciones y demostraciones en tiempo real',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      icon: 'Zap',
      color: 'from-green-500 to-teal-600',
      count: '8+ demos'
    },
    {
      id: 'educational-content',
      title: 'Contenido Educativo',
      description: 'Aprende conceptos complejos a través de visualizaciones AR',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      icon: 'BookOpen',
      color: 'from-orange-500 to-red-600',
      count: '15+ lecciones'
    },
    {
      id: 'art-gallery',
      title: 'Galería de Arte',
      description: 'Descubre obras de arte en un espacio virtual inmersivo',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      icon: 'Palette',
      color: 'from-pink-500 to-rose-600',
      count: '20+ obras'
    },
    {
      id: 'science-lab',
      title: 'Laboratorio Virtual',
      description: 'Realiza experimentos científicos en un entorno seguro',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      icon: 'Flask',
      color: 'from-indigo-500 to-blue-600',
      count: '10+ experimentos'
    }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Categorías de Experiencias
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Elige entre diferentes tipos de contenido AR diseñado para educación, entretenimiento y exploración
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-surface shadow-lg border border-border/30 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-50'
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>

          <Button
            variant="ghost"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-surface shadow-lg border border-border/30 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary-50'
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="flex-shrink-0 w-80 bg-surface rounded-xl shadow-lg border border-border/30 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => onCategorySelect(experience)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={`Categoría ${experience.title} mostrando ${experience.description}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${experience.color} opacity-80`}></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Icon name={experience.icon} size={24} className="text-primary" />
                  </div>
                  
                  {/* Count Badge */}
                  <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-medium text-text-primary">{experience.count}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {experience.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {experience.description}
                  </p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Explorar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(experiences.length / 2) }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === Math.floor(currentIndex / 2) ? 'bg-primary' : 'bg-secondary-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceCarousel;