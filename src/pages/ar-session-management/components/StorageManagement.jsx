import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StorageManagement = ({ onStorageAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Mock storage data
  const storageData = {
    totalSpace: "2.5 GB",
    usedSpace: "1.2 GB",
    availableSpace: "1.3 GB",
    usagePercentage: 48,
    categories: [
      {
        name: "Modelos 3D",
        size: "850 MB",
        percentage: 68,
        color: "bg-blue-500",
        items: 45
      },
      {
        name: "Texturas",
        size: "280 MB",
        percentage: 22,
        color: "bg-green-500",
        items: 120
      },
      {
        name: "Sesiones",
        size: "70 MB",
        percentage: 6,
        color: "bg-amber-500",
        items: 12
      },
      {
        name: "Caché",
        size: "50 MB",
        percentage: 4,
        color: "bg-slate-500",
        items: 1
      }
    ]
  };

  const cachedItems = [
    {
      id: 1,
      name: "Modelo Arquitectónico Casa Moderna",
      type: "3d-model",
      size: "125 MB",
      lastUsed: "2024-01-15",
      frequency: "Alta",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Conjunto Muebles Oficina",
      type: "3d-model",
      size: "89 MB",
      lastUsed: "2024-01-14",
      frequency: "Media",
      thumbnail: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Texturas Materiales Premium",
      type: "texture",
      size: "156 MB",
      lastUsed: "2024-01-13",
      frequency: "Alta",
      thumbnail: "https://images.pixabay.com/photo/2017/02/15/10/39/salad-2068220_1280.jpg?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      name: "Sesión Demo Producto",
      type: "session",
      size: "23 MB",
      lastUsed: "2024-01-12",
      frequency: "Baja",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      name: "Modelo Vehículo Deportivo",
      type: "3d-model",
      size: "198 MB",
      lastUsed: "2024-01-10",
      frequency: "Media",
      thumbnail: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?w=100&h=100&fit=crop"
    }
  ];

  const handleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cachedItems.length 
        ? [] 
        : cachedItems.map(item => item.id)
    );
  };

  const handleStorageAction = (action) => {
    if (onStorageAction) {
      onStorageAction(action, selectedItems);
    }
    setSelectedItems([]);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case '3d-model': return 'Package';
      case 'texture': return 'Image';
      case 'session': return 'Play';
      default: return 'File';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case '3d-model': return 'Modelo 3D';
      case 'texture': return 'Textura';
      case 'session': return 'Sesión';
      default: return 'Archivo';
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'Alta': return 'text-green-600 bg-green-100';
      case 'Media': return 'text-amber-600 bg-amber-100';
      case 'Baja': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Gestión de Almacenamiento</h3>
        <Button
          variant="outline"
          iconName="RefreshCw"
          onClick={() => handleStorageAction('refresh')}
        >
          Actualizar
        </Button>
      </div>

      {/* Storage Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-900">Espacio Utilizado</span>
          <span className="text-sm text-slate-600">
            {storageData.usedSpace} de {storageData.totalSpace}
          </span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${storageData.usagePercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {storageData.categories.map((category, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="text-sm font-medium text-slate-900">{category.name}</span>
              </div>
              <div className="text-lg font-bold text-slate-900">{category.size}</div>
              <div className="text-xs text-slate-600">{category.items} elementos</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          iconName="Trash2"
          onClick={() => handleStorageAction('clearCache')}
        >
          Limpiar Caché
        </Button>
        <Button
          variant="outline"
          iconName="Download"
          onClick={() => handleStorageAction('optimizeStorage')}
        >
          Optimizar
        </Button>
        <Button
          variant="ghost"
          iconName={showDetails ? 'ChevronUp' : 'ChevronDown'}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ocultar Detalles' : 'Ver Detalles'}
        </Button>
      </div>

      {/* Detailed Storage Management */}
      {showDetails && (
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-900">Elementos Almacenados</h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleSelectAll}
                className="text-sm"
              >
                {selectedItems.length === cachedItems.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
              </Button>
              {selectedItems.length > 0 && (
                <Button
                  variant="danger"
                  iconName="Trash2"
                  onClick={() => handleStorageAction('deleteSelected')}
                  className="text-sm"
                >
                  Eliminar ({selectedItems.length})
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {cachedItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                  selectedItems.includes(item.id)
                    ? 'border-blue-500 bg-blue-50' :'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleItemSelection(item.id)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />

                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={getTypeIcon(item.type)} size={14} className="text-slate-600" />
                    <span className="font-medium text-slate-900 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{getTypeLabel(item.type)}</span>
                    <span>{item.size}</span>
                    <span>Usado: {new Date(item.lastUsed).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(item.frequency)}`}>
                  {item.frequency}
                </div>

                <Button
                  variant="ghost"
                  iconName="MoreVertical"
                  className="flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage Recommendations */}
      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Lightbulb" size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Recomendaciones</span>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Elimina elementos no utilizados en los últimos 30 días para liberar espacio</li>
          <li>• Los modelos 3D ocupan más espacio - considera usar versiones optimizadas</li>
          <li>• El caché se limpia automáticamente cuando el espacio es limitado</li>
        </ul>
      </div>
    </div>
  );
};

export default StorageManagement;