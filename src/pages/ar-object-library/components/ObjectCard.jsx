import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ObjectCard = ({ object, onSelect, onFavorite, isSelected, isFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSelect = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
    onSelect(object);
    setIsLoading(false);
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'low': return 'text-success-600 bg-success-50';
      case 'medium': return 'text-warning-600 bg-warning-50';
      case 'high': return 'text-error-600 bg-error-50';
      default: return 'text-secondary-600 bg-secondary-50';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`bg-surface rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'
    }`}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-secondary-50">
        <Image
          src={object.thumbnail}
          alt={object.title}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant={isFavorite ? 'primary' : 'ghost'}
            onClick={() => onFavorite(object.id)}
            className="p-1.5 bg-surface/80 backdrop-blur-sm rounded-full"
          >
            <Icon 
              name={isFavorite ? 'Heart' : 'Heart'} 
              size={16} 
              className={isFavorite ? 'fill-current' : ''}
            />
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setShowDetails(true)}
            className="p-1.5 bg-surface/80 backdrop-blur-sm rounded-full"
          >
            <Icon name="Info" size={16} />
          </Button>
        </div>

        {/* Complexity Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(object.complexity)}`}>
            {object.complexity === 'low' ? 'Básico' : object.complexity === 'medium' ? 'Medio' : 'Avanzado'}
          </span>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground rounded-full p-2">
              <Icon name="Check" size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text-primary mb-1 line-clamp-1">{object.title}</h3>
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">{object.description}</p>
        
        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-text-muted mb-3">
          <span className="flex items-center gap-1">
            <Icon name="HardDrive" size={12} />
            {formatFileSize(object.fileSize)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Download" size={12} />
            {object.downloads}
          </span>
        </div>

        {/* Action Button */}
        <Button
          variant={isSelected ? 'success' : 'primary'}
          onClick={handleSelect}
          disabled={isLoading}
          loading={isLoading}
          fullWidth
          className="text-sm"
        >
          {isSelected ? 'Seleccionado' : 'Añadir a Escena'}
        </Button>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">{object.title}</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowDetails(false)}
                  className="p-2"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={object.thumbnail}
                  alt={object.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <p className="text-text-secondary">{object.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted">Tamaño:</span>
                    <span className="ml-2 text-text-primary">{formatFileSize(object.fileSize)}</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Complejidad:</span>
                    <span className="ml-2 text-text-primary capitalize">{object.complexity}</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Categoría:</span>
                    <span className="ml-2 text-text-primary">{object.category}</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Descargas:</span>
                    <span className="ml-2 text-text-primary">{object.downloads}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-text-primary mb-2">Consejos de Colocación:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {object.placementTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSelect();
                    setShowDetails(false);
                  }}
                  disabled={isLoading}
                  loading={isLoading}
                  fullWidth
                >
                  Añadir a Escena
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectCard;