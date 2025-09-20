import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, objectCounts }) => {
  const categoryIcons = {
    'todos': 'Grid3X3',
    'muebles': 'Armchair',
    'decoraciones': 'Palette',
    'educativos': 'GraduationCap',
    'interactivos': 'Gamepad2',
    'arquitectura': 'Building',
    'vehiculos': 'Car',
    'naturaleza': 'TreePine'
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
        <Icon name="Filter" size={18} />
        Categorías
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const count = objectCounts[category.id] || 0;
          
          return (
            <Button
              key={category.id}
              variant={isSelected ? 'primary' : 'outline'}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center gap-2 p-3 h-auto ${
                isSelected ? 'border-primary' : 'hover:border-primary/50'
              }`}
            >
              <Icon 
                name={categoryIcons[category.id] || 'Package'} 
                size={20}
                className={isSelected ? 'text-primary-foreground' : 'text-text-secondary'}
              />
              <div className="text-center">
                <div className={`text-xs font-medium ${
                  isSelected ? 'text-primary-foreground' : 'text-text-primary'
                }`}>
                  {category.name}
                </div>
                <div className={`text-xs ${
                  isSelected ? 'text-primary-foreground/80' : 'text-text-muted'
                }`}>
                  {count} objetos
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;