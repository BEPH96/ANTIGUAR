import React, { useRef, useEffect } from 'react';
import 'aframe';
import 'ar.js';

const ARScene = ({ 
  isSessionActive, 
  placedObjects, 
  onMarkerDetected,
  onMarkerLost 
}) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current && isSessionActive) {
      const scene = sceneRef.current;
      
      // Configurar eventos de AR.js
      scene.addEventListener('markerFound', (event) => {
        console.log('Marcador detectado:', event.detail);
        onMarkerDetected && onMarkerDetected(event.detail);
      });

      scene.addEventListener('markerLost', (event) => {
        console.log('Marcador perdido:', event.detail);
        onMarkerLost && onMarkerLost(event.detail);
      });
    }
  }, [isSessionActive, onMarkerDetected, onMarkerLost]);

  if (!isSessionActive) {
    return null;
  }

  return (
    <a-scene 
      ref={sceneRef}
      embedded 
      arjs="sourceType: webcam; debugUIEnabled: false;"
      style={{ width: '100%', height: '100%', position: 'absolute' }}
    >
      {/* Marcador Hiro (patrón predefinido) */}
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
        ></a-entity>
      </a-marker>

      {/* Marcador personalizado (puedes agregar más) */}
      <a-marker preset="kanji">
        <a-box position="0 0.5 0" material="color: red"></a-box>
      </a-marker>

      {/* Cámara */}
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;