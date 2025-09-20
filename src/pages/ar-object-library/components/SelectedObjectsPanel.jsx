import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SelectedObjectsPanel = ({ 
  selectedObjects, 
  onRemoveObject, 
  onClearAll, 
  onProceedToAR,
  isVisible 
}) => {
  if (!isVisible || selectedObjects.length === 0) {
    return null;
  }

  const totalSize = selectedObjects.reduce((sum, obj) => sum + obj.fileSize, 0);
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border p-4 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name="Package" size={20} className="text-primary" />
            <span className="font-semibold text-text-primary">
              {selectedObjects.length} objeto{selectedObjects.length !== 1 ? 's' : ''} seleccionado{selectedObjects.length !== 1 ? 's' : ''}
            </span>
            <span className="text-sm text-text-muted">
              ({formatFileSize(totalSize)})
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={onClearAll}
              className="text-sm"
            >
              Limpiar Todo
            </Button>
            <Button
              variant="primary"
              onClick={onProceedToAR}
              className="text-sm"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Ir a AR
            </Button>
          </div>
        </div>

        {/* Selected Objects List */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {selectedObjects.map((object) => (
            <div
              key={object.id}
              className="flex-shrink-0 bg-surface border border-border rounded-lg p-2 flex items-center gap-2 min-w-48"
            >
              <div className="w-10 h-10 rounded overflow-hidden bg-secondary-50">
                <Image
                  src={object.thumbnail}
                  alt={object.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {object.title}
                </div>
                <div className="text-xs text-text-muted">
                  {formatFileSize(object.fileSize)}
                </div>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => onRemoveObject(object.id)}
                className="p-1 text-text-muted hover:text-error-600"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedObjectsPanel;