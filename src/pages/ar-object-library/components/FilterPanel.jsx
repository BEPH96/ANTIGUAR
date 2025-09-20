import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  if (!isOpen) return null;

  const complexityOptions = [
    { id: 'low', label: 'Básico', description: 'Dispositivos de gama baja' },
    { id: 'medium', label: 'Medio', description: 'Dispositivos de gama media' },
    { id: 'high', label: 'Avanzado', description: 'Dispositivos de alta gama' }
  ];

  const sizeOptions = [
    { id: 'small', label: 'Pequeño', description: '< 5MB' },
    { id: 'medium', label: 'Mediano', description: '5MB - 20MB' },
    { id: 'large', label: 'Grande', description: '> 20MB' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Más Popular' },
    { id: 'recent', label: 'Más Reciente' },
    { id: 'name', label: 'Nombre A-Z' },
    { id: 'size', label: 'Tamaño' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={20} />
              Filtros Avanzados
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Complexity Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Complejidad</h3>
            <div className="space-y-2">
              {complexityOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.complexity.includes(option.id)}
                    onChange={(e) => {
                      const newComplexity = e.target.checked
                        ? [...filters.complexity, option.id]
                        : filters.complexity.filter(c => c !== option.id);
                      onFilterChange({ ...filters, complexity: newComplexity });
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{option.label}</div>
                    <div className="text-xs text-text-muted">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Tamaño de Archivo</h3>
            <div className="space-y-2">
              {sizeOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.size.includes(option.id)}
                    onChange={(e) => {
                      const newSize = e.target.checked
                        ? [...filters.size, option.id]
                        : filters.size.filter(s => s !== option.id);
                      onFilterChange({ ...filters, size: newSize });
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{option.label}</div>
                    <div className="text-xs text-text-muted">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Ordenar por</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.id}
                    checked={filters.sort === option.id}
                    onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClearFilters}
              fullWidth
            >
              Limpiar Filtros
            </Button>
            <Button
              variant="primary"
              onClick={onClose}
              fullWidth
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;