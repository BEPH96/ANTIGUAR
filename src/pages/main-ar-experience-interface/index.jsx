import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplifiedGlobalHeader from '../../components/ui/SimplifiedGlobalHeader';
import FloatingActionHub from '../../components/ui/FloatingActionHub';
import ARSessionStatusIndicator from '../../components/ui/ARSessionStatusIndicator';
import ContextualSlidePanel from '../../components/ui/ContextualSlidePanel';
import ARCameraView from './components/ARCameraView';
import ARObjectCarousel from './components/ARObjectCarousel';
import ARTransformationControls from './components/ARTransformationControls';
import ARSessionControls from './components/ARSessionControls';
import ARQuickActionsPanel from './components/ARQuickActionsPanel';
import ARGestureHandler from './components/ARGestureHandler';

const MainARExperienceInterface = () => {
  const navigate = useNavigate();
  
  // AR Session State
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStatus, setSessionStatus] = useState('inactive'); // 'inactive', 'initializing', 'active', 'error'
  const [cameraPermission, setCameraPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'
  const [trackingQuality, setTrackingQuality] = useState('good'); // 'good', 'limited', 'poor'
  
  // Object Management State
  const [selectedObject, setSelectedObject] = useState(null);
  const [placedObjects, setPlacedObjects] = useState([]);
  
  // UI State
  const [showObjectCarousel, setShowObjectCarousel] = useState(true);
  const [showTransformControls, setShowTransformControls] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showLibraryPanel, setShowLibraryPanel] = useState(false);
  
  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Performance Metrics
  const [frameRate, setFrameRate] = useState(60);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Check camera permissions on mount
  useEffect(() => {
    checkCameraPermissions();
  }, []);

  // Session duration timer
  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    } else {
      setSessionDuration(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive]);

  // Recording duration timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const checkCameraPermissions = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' });
      setCameraPermission(result.state);
      
      result.addEventListener('change', () => {
        setCameraPermission(result.state);
      });
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      setCameraPermission('prompt');
    }
  };

  const handleSessionToggle = async (shouldStart) => {
    if (shouldStart) {
      setSessionStatus('initializing');
      
      try {
        // Simulate AR session initialization
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSessionActive(true);
        setSessionStatus('active');
        setCameraPermission('granted');
        setShowObjectCarousel(true);
      } catch (error) {
        console.error('Error starting AR session:', error);
        setSessionStatus('error');
        setIsSessionActive(false);
      }
    } else {
      setIsSessionActive(false);
      setSessionStatus('inactive');
      setSelectedObject(null);
      setShowTransformControls(false);
      setShowObjectCarousel(false);
    }
  };

  const handleObjectSelect = (object) => {
    if (typeof object === 'object' && object.id) {
      // Object selected from carousel
      setSelectedObject(object);
      setShowTransformControls(true);
      
      // Add to placed objects if not already placed
      if (!placedObjects.find(obj => obj.id === object.id)) {
        const newPlacedObject = {
          ...object,
          position: { x: 0, y: 0, z: -2 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          placedAt: Date.now()
        };
        setPlacedObjects(prev => [...prev, newPlacedObject]);
      }
    } else {
      // Tap/click selection from gesture handler
      const { x, y } = object;
      
      // Simulate object detection at tap position
      const detectedObject = placedObjects.find(obj => {
        // Simple hit detection simulation
        const distance = Math.sqrt(
          Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2)
        );
        return distance < 0.2; // Within selection radius
      });
      
      if (detectedObject) {
        setSelectedObject(detectedObject);
        setShowTransformControls(true);
      } else {
        setSelectedObject(null);
        setShowTransformControls(false);
      }
    }
  };

  const handleObjectTransform = ({ mode, values, selectedObject: obj }) => {
    if (!obj) return;
    
    setPlacedObjects(prev => 
      prev.map(placedObj => 
        placedObj.id === obj.id 
          ? { ...placedObj, ...values }
          : placedObj
      )
    );
    
    // Update selected object
    setSelectedObject(prev => prev ? { ...prev, ...values } : null);
  };

  const handleObjectMove = ({ object, delta }) => {
    if (!object) return;
    
    setPlacedObjects(prev => 
      prev.map(obj => 
        obj.id === object.id 
          ? {
              ...obj,
              position: {
                x: obj.position.x + delta.x,
                y: obj.position.y + delta.y,
                z: obj.position.z + delta.z
              }
            }
          : obj
      )
    );
  };

  const handleObjectScale = ({ object, scale }) => {
    if (!object) return;
    
    setPlacedObjects(prev => 
      prev.map(obj => 
        obj.id === object.id 
          ? {
              ...obj,
              scale: {
                x: obj.scale.x * scale,
                y: obj.scale.y * scale,
                z: obj.scale.z * scale
              }
            }
          : obj
      )
    );
  };

  const handleObjectRotate = ({ object, angle }) => {
    if (!object) return;
    
    setPlacedObjects(prev => 
      prev.map(obj => 
        obj.id === object.id 
          ? {
              ...obj,
              rotation: {
                ...obj.rotation,
                y: obj.rotation.y + angle
              }
            }
          : obj
      )
    );
  };

  const handleCapture = () => {
    // Simulate screenshot capture
    console.log('Capturing screenshot...');
    
    // Create mock capture data
    const captureData = {
      timestamp: new Date().toISOString(),
      objects: placedObjects.length,
      sessionDuration: sessionDuration,
      quality: trackingQuality
    };
    
    console.log('Capture data:', captureData);
  };

  const handleRecord = (shouldRecord) => {
    setIsRecording(shouldRecord);
    
    if (shouldRecord) {
      console.log('Starting video recording...');
    } else {
      console.log('Stopping video recording...');
    }
  };

  const handleReset = () => {
    setPlacedObjects([]);
    setSelectedObject(null);
    setShowTransformControls(false);
    console.log('Scene reset');
  };

  const handleLibraryOpen = () => {
    setShowLibraryPanel(true);
  };

  const handleSessionManagement = () => {
    navigate('/ar-session-management');
  };

  const handleShare = () => {
    // Implement sharing functionality
    console.log('Sharing AR scene...');
  };

  const handleSettings = () => {
    navigate('/camera-permission-setup');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <SimplifiedGlobalHeader arSessionActive={isSessionActive} />

      {/* Main AR Interface */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* AR Camera View with Gesture Handling */}
        <ARGestureHandler
          onObjectSelect={handleObjectSelect}
          onObjectMove={handleObjectMove}
          onObjectScale={handleObjectScale}
          onObjectRotate={handleObjectRotate}
          selectedObject={selectedObject}
        >
          <ARCameraView
            isSessionActive={isSessionActive}
            onSessionStart={() => handleSessionToggle(true)}
            onSessionEnd={() => handleSessionToggle(false)}
            trackingQuality={trackingQuality}
            frameRate={frameRate}
          />
        </ARGestureHandler>

        {/* AR Session Status Indicator */}
        <ARSessionStatusIndicator
          sessionStatus={sessionStatus}
          cameraPermission={cameraPermission}
          trackingQuality={trackingQuality}
          onStatusClick={(status) => console.log('Status clicked:', status)}
        />

        {/* AR Session Controls */}
        <ARSessionControls
          isSessionActive={isSessionActive}
          onSessionToggle={handleSessionToggle}
          onCapture={handleCapture}
          onRecord={handleRecord}
          onReset={handleReset}
          isRecording={isRecording}
          recordingDuration={recordingDuration}
        />

        {/* Object Carousel 
        <ARObjectCarousel
          onObjectSelect={handleObjectSelect}
          selectedObjectId={selectedObject?.id}
          isVisible={showObjectCarousel && isSessionActive}
        />*/}

        {/* Transformation Controls */}
        <ARTransformationControls
          selectedObject={selectedObject}
          onTransform={handleObjectTransform}
          isVisible={showTransformControls && isSessionActive}
        />

        {/* Floating Action Hub 
        <FloatingActionHub
          arSessionActive={isSessionActive}
          onLibraryOpen={() => setShowQuickActions(true)}
          onSessionOpen={() => setShowQuickActions(true)}
        />*/}

        {/* Quick Actions Panel */}
        <ARQuickActionsPanel
          isOpen={showQuickActions}
          onClose={() => setShowQuickActions(false)}
          onLibraryOpen={handleLibraryOpen}
          onSessionManagement={handleSessionManagement}
          onShare={handleShare}
          onSettings={handleSettings}
        />

        {/* Library Panel */}
        <ContextualSlidePanel
          isOpen={showLibraryPanel}
          onClose={() => setShowLibraryPanel(false)}
          title="Biblioteca de Objetos AR"
          position="right"
        >
          <div className="space-y-4">
            <p className="text-text-muted">
              Explora y selecciona objetos 3D para añadir a tu escena AR.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-secondary-200 transition-colors"
                  onClick={() => {
                    // Add object to scene
                    setShowLibraryPanel(false);
                  }}
                >
                  <span className="text-text-muted">Objeto {item}</span>
                </div>
              ))}
            </div>
          </div>
        </ContextualSlidePanel>
      </div>
    </div>
  );
};

export default MainARExperienceInterface;