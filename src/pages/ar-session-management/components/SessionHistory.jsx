import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SessionHistory = ({ onSessionReload }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock session history data
  const sessionHistory = [
    {
      id: 1,
      name: "Sesión de Prueba AR",
      date: "2024-01-15",
      duration: "00:45:30",
      objectsUsed: 12,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      status: "completed",
      quality: "high",
      deviceType: "desktop",
      notes: "Sesión de prueba con múltiples objetos 3D"
    },
    {
      id: 2,
      name: "Demostración Producto",
      date: "2024-01-14",
      duration: "00:23:15",
      objectsUsed: 5,
      thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=300&h=200&fit=crop",
      status: "saved",
      quality: "medium",
      deviceType: "mobile",
      notes: "Presentación de producto para cliente"
    },
    {
      id: 3,
      name: "Sesión Educativa",
      date: "2024-01-13",
      duration: "01:12:45",
      objectsUsed: 8,
      thumbnail: "https://images.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.jpg?w=300&h=200&fit=crop",
      status: "completed",
      quality: "high",
      deviceType: "tablet",
      notes: "Contenido educativo interactivo"
    },
    {
      id: 4,
      name: "Prototipo Arquitectura",
      date: "2024-01-12",
      duration: "00:38:20",
      objectsUsed: 15,
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      status: "draft",
      quality: "high",
      deviceType: "desktop",
      notes: "Visualización de proyecto arquitectónico"
    },
    {
      id: 5,
      name: "Sesión Colaborativa",
      date: "2024-01-11",
      duration: "00:56:10",
      objectsUsed: 20,
      thumbnail: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=300&h=200&fit=crop",
      status: "completed",
      quality: "medium",
      deviceType: "mobile",
      notes: "Trabajo en equipo con múltiples usuarios"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'saved': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'saved': return 'Guardada';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'desktop': return 'Monitor';
      case 'mobile': return 'Smartphone';
      case 'tablet': return 'Tablet';
      default: return 'Monitor';
    }
  };

  const handleSessionAction = (sessionId, action) => {
    if (action === 'reload' && onSessionReload) {
      onSessionReload(sessionId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Historial de Sesiones</h3>
        <div className="flex gap-2">
          <Button variant="outline" iconName="Filter" className="hidden sm:flex">
            Filtrar
          </Button>
          <Button variant="outline" iconName="Download">
            Exportar
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sessionHistory.map((session) => (
          <div
            key={session.id}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${
              selectedSession === session.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src={session.thumbnail}
                    alt={session.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Session Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900 truncate">{session.name}</h4>
                    <p className="text-sm text-slate-600">{session.notes}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)} whitespace-nowrap`}>
                    {getStatusText(session.status)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(session.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{session.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Package" size={14} />
                    <span>{session.objectsUsed} objetos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name={getDeviceIcon(session.deviceType)} size={14} />
                    <span className="capitalize">{session.deviceType}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="primary"
                    iconName="Play"
                    onClick={() => handleSessionAction(session.id, 'reload')}
                    className="text-xs"
                  >
                    Recargar
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Copy"
                    onClick={() => handleSessionAction(session.id, 'duplicate')}
                    className="text-xs"
                  >
                    Duplicar
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Share"
                    onClick={() => handleSessionAction(session.id, 'share')}
                    className="text-xs"
                  >
                    Compartir
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="MoreHorizontal"
                    onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                    className="text-xs"
                  >
                    Más
                  </Button>
                </div>

                {/* Expanded Actions */}
                {selectedSession === session.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        iconName="Edit"
                        onClick={() => handleSessionAction(session.id, 'edit')}
                        className="text-xs"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Download"
                        onClick={() => handleSessionAction(session.id, 'export')}
                        className="text-xs"
                      >
                        Exportar
                      </Button>
                      <Button
                        variant="danger"
                        iconName="Trash2"
                        onClick={() => handleSessionAction(session.id, 'delete')}
                        className="text-xs"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-6">
        <Button variant="outline" iconName="ChevronDown">
          Cargar Más Sesiones
        </Button>
      </div>
    </div>
  );
};

export default SessionHistory;