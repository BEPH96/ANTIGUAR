import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, hasActiveFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
          />
          <Input
            type="search"
            placeholder="Buscar objetos 3D..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
        
        <Button
          variant={hasActiveFilters ? 'primary' : 'outline'}
          onClick={onFilterToggle}
          className="px-3"
        >
          <Icon name="SlidersHorizontal" size={18} />
          {hasActiveFilters && (
            <span className="ml-2 bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Quick Search Suggestions */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-text-muted">Búsquedas populares:</span>
        {['silla', 'mesa', 'planta', 'lámpara', 'coche'].map((suggestion) => (
          <Button
            key={suggestion}
            variant="ghost"
            onClick={() => handleSearch(suggestion)}
            className="text-xs px-2 py-1 h-auto text-text-secondary hover:text-primary"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;