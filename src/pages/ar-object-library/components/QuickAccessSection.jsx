import React from 'react';
import Icon from '../../../components/AppIcon';
import ObjectCard from './ObjectCard';

const QuickAccessSection = ({ 
  recentObjects, 
  favoriteObjects, 
  onObjectSelect, 
  onObjectFavorite, 
  selectedObjects, 
  favoriteObjectIds 
}) => {
  if (!recentObjects.length && !favoriteObjects.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Recently Used */}
      {recentObjects.length > 0 && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="Clock" size={18} />
            Usados Recientemente
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentObjects.slice(0, 4).map((object) => (
              <ObjectCard
                key={object.id}
                object={object}
                onSelect={onObjectSelect}
                onFavorite={onObjectFavorite}
                isSelected={selectedObjects.some(obj => obj.id === object.id)}
                isFavorite={favoriteObjectIds.includes(object.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favoriteObjects.length > 0 && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="Heart" size={18} className="fill-current text-error-500" />
            Favoritos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favoriteObjects.slice(0, 4).map((object) => (
              <ObjectCard
                key={object.id}
                object={object}
                onSelect={onObjectSelect}
                onFavorite={onObjectFavorite}
                isSelected={selectedObjects.some(obj => obj.id === object.id)}
                isFavorite={favoriteObjectIds.includes(object.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccessSection;