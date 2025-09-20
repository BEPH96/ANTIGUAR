import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ARObjectCarousel = ({ 
  onObjectSelect, 
  selectedObjectId = null,
  isVisible = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const arObjects = [
    {
      id: 'cube-basic',
      name: 'Cubo Básico',
      category: 'Geometría',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop',
      description: 'Cubo 3D básico para pruebas de posicionamiento',
      size: 'Pequeño'
    },
    {
      id: 'sphere-metallic',
      name: 'Esfera Metálica',
      category: 'Geometría',
      thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=150&h=150&fit=crop',
      description: 'Esfera con textura metálica reflectante',
      size: 'Mediano'
    },
    {
      id: 'pyramid-glass',
      name: 'Pirámide de Cristal',
      category: 'Geometría',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop',
      description: 'Pirámide transparente con efectos de luz',
      size: 'Grande'
    },
    {
      id: 'chair-modern',
      name: 'Silla Moderna',
      category: 'Mobiliario',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
      description: 'Silla de diseño contemporáneo',
      size: 'Grande'
    },
    {
      id: 'lamp-desk',
      name: 'Lámpara de Escritorio',
      category: 'Mobiliario',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      description: 'Lámpara LED ajustable para escritorio',
      size: 'Mediano'
    },
    {
      id: 'plant-succulent',
      name: 'Planta Suculenta',
      category: 'Naturaleza',
      thumbnail: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop',
      description: 'Planta suculenta en maceta decorativa',
      size: 'Pequeño'
    },
    {
      id: 'sculpture-abstract',
      name: 'Escultura Abstracta',
      category: 'Arte',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop',
      description: 'Escultura moderna de formas abstractas',
      size: 'Grande'
    },
    {
      id: 'vase-ceramic',
      name: 'Jarrón Cerámico',
      category: 'Decoración',
      thumbnail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=150&h=150&fit=crop',
      description: 'Jarrón de cerámica artesanal',
      size: 'Mediano'
    }
  ];

  const handleObjectSelect = (object) => {
    if (onObjectSelect) {
      onObjectSelect(object);
    }
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const itemWidth = 120; // Width of each item including margin
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : arObjects.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < arObjects.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const getSizeColor = (size) => {
    switch (size) {
      case 'Pequeño':
        return 'text-success-600 bg-success-50';
      case 'Mediano':
        return 'text-warning-600 bg-warning-50';
      case 'Grande':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-secondary-600 bg-secondary-50';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="ar-floating bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <div className="ar-overlay rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">
            Objetos AR
          </h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="p-1 w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="ghost"
              onClick={handleNext}
              className="p-1 w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {arObjects.map((object, index) => (
              <div
                key={object.id}
                className={`flex-shrink-0 w-24 cursor-pointer transition-all duration-200 ${
                  selectedObjectId === object.id
                    ? 'transform scale-105'
                    : 'hover:transform hover:scale-102'
                }`}
                onClick={() => handleObjectSelect(object)}
              >
                <div
                  className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedObjectId === object.id
                      ? 'border-primary shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={object.thumbnail}
                    alt={object.name}
                    className="w-full h-16 object-cover"
                  />
                  
                  {/* Size Badge */}
                  <div className={`absolute top-1 right-1 px-1 py-0.5 rounded text-xs font-medium ${getSizeColor(object.size)}`}>
                    {object.size.charAt(0)}
                  </div>

                  {/* Selection Indicator */}
                  {selectedObjectId === object.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Icon name="Check" size={20} className="text-primary" />
                    </div>
                  )}
                </div>

                <div className="mt-1 text-center">
                  <p className="text-xs font-medium text-text-primary truncate">
                    {object.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {object.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-2 gap-1">
            {Array.from({ length: Math.ceil(arObjects.length / 3) }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-primary' :'bg-secondary-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Selected Object Info */}
        {selectedObjectId && (
          <div className="mt-3 pt-3 border-t border-border/30">
            {(() => {
              const selectedObject = arObjects.find(obj => obj.id === selectedObjectId);
              return selectedObject ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary mb-1">
                    {selectedObject.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {selectedObject.description}
                  </p>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ARObjectCarousel;