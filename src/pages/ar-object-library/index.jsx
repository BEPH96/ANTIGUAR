import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SimplifiedGlobalHeader from '../../components/ui/SimplifiedGlobalHeader';
import ObjectCard from './components/ObjectCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import QuickAccessSection from './components/QuickAccessSection';
import SelectedObjectsPanel from './components/SelectedObjectsPanel';

const ARObjectLibrary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [favoriteObjectIds, setFavoriteObjectIds] = useState([1, 3, 7]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    complexity: [],
    size: [],
    sort: 'popular'
  });

  // Mock data for 3D objects
  const mockObjects = [
    {
      id: 1,
      title: "Silla Moderna",
      description: "Silla de diseño contemporáneo perfecta para espacios modernos",
      category: "muebles",
      complexity: "low",
      fileSize: 2048000, // 2MB
      downloads: 1250,
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      placementTips: [
        "Coloca sobre superficies planas",
        "Mantén espacio libre alrededor",
        "Funciona mejor con buena iluminación"
      ]
    },
    {
      id: 2,
      title: "Mesa de Café",
      description: "Mesa de centro elegante con acabado en madera natural",
      category: "muebles",
      complexity: "medium",
      fileSize: 5120000, // 5MB
      downloads: 890,
      thumbnail: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop",
      placementTips: [
        "Ideal para salas de estar",
        "Requiere espacio amplio",
        "Combina bien con sofás"
      ]
    },
    {
      id: 3,
      title: "Planta Decorativa",
      description: "Planta tropical en maceta decorativa para interiores",
      category: "decoraciones",
      complexity: "low",
      fileSize: 1536000, // 1.5MB
      downloads: 2100,
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      placementTips: [
        "Perfecta para esquinas",
        "Añade vida a cualquier espacio",
        "Funciona en interiores y exteriores"
      ]
    },
    {
      id: 4,
      title: "Lámpara de Pie",
      description: "Lámpara moderna con luz LED ajustable",
      category: "decoraciones",
      complexity: "medium",
      fileSize: 3072000, // 3MB
      downloads: 675,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      placementTips: [
        "Ideal junto a sofás o sillas",
        "Proporciona iluminación ambiental",
        "Evita obstruir el paso"
      ]
    },
    {
      id: 5,
      title: "Modelo Anatómico",
      description: "Corazón humano 3D para educación médica",
      category: "educativos",
      complexity: "high",
      fileSize: 15360000, // 15MB
      downloads: 450,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      placementTips: [
        "Requiere dispositivos potentes",
        "Ideal para presentaciones",
        "Permite interacción detallada"
      ]
    },
    {
      id: 6,
      title: "Cubo Interactivo",
      description: "Cubo 3D con animaciones y efectos interactivos",
      category: "interactivos",
      complexity: "medium",
      fileSize: 4096000, // 4MB
      downloads: 1800,
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      placementTips: [
        "Responde a gestos táctiles",
        "Ideal para demostraciones",
        "Funciona mejor en espacios abiertos"
      ]
    },
    {
      id: 7,
      title: "Edificio Moderno",
      description: "Rascacielos arquitectónico con detalles realistas",
      category: "arquitectura",
      complexity: "high",
      fileSize: 25600000, // 25MB
      downloads: 320,
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
      placementTips: [
        "Requiere mucho espacio",
        "Mejor en exteriores",
        "Impresionante a gran escala"
      ]
    },
    {
      id: 8,
      title: "Coche Deportivo",
      description: "Automóvil deportivo con detalles de alta calidad",
      category: "vehiculos",
      complexity: "high",
      fileSize: 20480000, // 20MB
      downloads: 980,
      thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop",
      placementTips: [
        "Ideal para espacios amplios",
        "Permite vista 360 grados",
        "Impresionante en garajes virtuales"
      ]
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'muebles', name: 'Muebles' },
    { id: 'decoraciones', name: 'Decoraciones' },
    { id: 'educativos', name: 'Educativos' },
    { id: 'interactivos', name: 'Interactivos' },
    { id: 'arquitectura', name: 'Arquitectura' },
    { id: 'vehiculos', name: 'Vehículos' },
    { id: 'naturaleza', name: 'Naturaleza' }
  ];

  // Filter and search logic
  const filteredObjects = useMemo(() => {
    let filtered = mockObjects;

    // Category filter
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(obj => obj.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(obj =>
        obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Advanced filters
    if (filters.complexity.length > 0) {
      filtered = filtered.filter(obj => filters.complexity.includes(obj.complexity));
    }

    if (filters.size.length > 0) {
      filtered = filtered.filter(obj => {
        const size = obj.fileSize;
        return filters.size.some(sizeFilter => {
          switch (sizeFilter) {
            case 'small': return size < 5000000;
            case 'medium': return size >= 5000000 && size <= 20000000;
            case 'large': return size > 20000000;
            default: return true;
          }
        });
      });
    }

    // Sort
    switch (filters.sort) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'recent':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'size':
        filtered.sort((a, b) => a.fileSize - b.fileSize);
        break;
      default:
        break;
    }

    return filtered;
  }, [mockObjects, selectedCategory, searchTerm, filters]);

  // Get object counts by category
  const objectCounts = useMemo(() => {
    const counts = { todos: mockObjects.length };
    categories.forEach(category => {
      if (category.id !== 'todos') {
        counts[category.id] = mockObjects.filter(obj => obj.category === category.id).length;
      }
    });
    return counts;
  }, [mockObjects, categories]);

  // Get recent and favorite objects
  const recentObjects = mockObjects.slice(0, 4);
  const favoriteObjects = mockObjects.filter(obj => favoriteObjectIds.includes(obj.id));

  const handleObjectSelect = (object) => {
    setSelectedObjects(prev => {
      const isAlreadySelected = prev.some(obj => obj.id === object.id);
      if (isAlreadySelected) {
        return prev.filter(obj => obj.id !== object.id);
      } else {
        return [...prev, object];
      }
    });
  };

  const handleObjectFavorite = (objectId) => {
    setFavoriteObjectIds(prev => {
      const isFavorite = prev.includes(objectId);
      if (isFavorite) {
        return prev.filter(id => id !== objectId);
      } else {
        return [...prev, objectId];
      }
    });
  };

  const handleRemoveSelected = (objectId) => {
    setSelectedObjects(prev => prev.filter(obj => obj.id !== objectId));
  };

  const handleClearAllSelected = () => {
    setSelectedObjects([]);
  };

  const handleProceedToAR = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/main-ar-experience-interface', { 
        state: { selectedObjects } 
      });
    }, 1000);
  };

  const handleClearFilters = () => {
    setFilters({
      complexity: [],
      size: [],
      sort: 'popular'
    });
  };

  const hasActiveFilters = filters.complexity.length > 0 || filters.size.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#D3E7D5] to-[#E4EED5]">
      <SimplifiedGlobalHeader />
      
      <div className="container mx-auto px-4 py-6 pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/main-ar-experience-interface')}
            className="p-1 text-text-muted hover:text-primary"
          >
            Experiencia AR
          </Button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-text-primary">Biblioteca de Objetos</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Biblioteca de Objetos 3D
          </h1>
          <p className="text-text-secondary">
            Explora y selecciona objetos 3D para tu experiencia de realidad aumentada
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <SearchBar
            onSearch={setSearchTerm}
            onFilterToggle={() => setShowFilterPanel(true)}
            hasActiveFilters={hasActiveFilters}
          />
          
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            objectCounts={objectCounts}
          />
        </div>

        {/* Quick Access Section */}
        {(recentObjects.length > 0 || favoriteObjects.length > 0) && (
          <div className="mb-8">
            <QuickAccessSection
              recentObjects={recentObjects}
              favoriteObjects={favoriteObjects}
              onObjectSelect={handleObjectSelect}
              onObjectFavorite={handleObjectFavorite}
              selectedObjects={selectedObjects}
              favoriteObjectIds={favoriteObjectIds}
            />
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-text-primary">
              {selectedCategory === 'todos' ? 'Todos los Objetos' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-text-muted">
              {filteredObjects.length} objeto{filteredObjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {searchTerm && (
            <div className="text-sm text-text-muted">
              Resultados para "{searchTerm}"
            </div>
          )}
        </div>

        {/* Objects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Icon name="Loader" size={32} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-text-secondary">Preparando objetos para AR...</p>
            </div>
          </div>
        ) : filteredObjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredObjects.map((object) => (
              <ObjectCard
                key={object.id}
                object={object}
                onSelect={handleObjectSelect}
                onFavorite={handleObjectFavorite}
                isSelected={selectedObjects.some(obj => obj.id === object.id)}
                isFavorite={favoriteObjectIds.includes(object.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No se encontraron objetos
            </h3>
            <p className="text-text-secondary mb-4">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todos');
                handleClearFilters();
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Selected Objects Panel */}
      <SelectedObjectsPanel
        selectedObjects={selectedObjects}
        onRemoveObject={handleRemoveSelected}
        onClearAll={handleClearAllSelected}
        onProceedToAR={handleProceedToAR}
        isVisible={selectedObjects.length > 0}
      />
    </div>
  );
};

export default ARObjectLibrary;