import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PermissionInstructions = ({ currentStep = 1 }) => {
  const instructions = [
    {
      id: 1,
      title: 'Haz Clic en "Permitir Cámara"',
      description: 'Presiona el botón principal para iniciar la solicitud de permisos.',
      icon: 'MousePointer',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Autoriza en el Navegador',
      description: 'Aparecerá un diálogo del navegador. Selecciona "Permitir" o "Allow".',
      icon: 'Shield',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Confirma el Acceso',
      description: 'Una vez autorizado, verás una confirmación y podrás continuar.',
      icon: 'CheckCircle',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Cómo Autorizar tu Cámara
        </h2>
        <p className="text-text-secondary">
          Sigue estos sencillos pasos para habilitar la funcionalidad AR
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {instructions.map((instruction, index) => (
          <div
            key={instruction.id}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
              currentStep === instruction.id
                ? 'border-primary-300 bg-primary-50 shadow-lg'
                : 'border-secondary-200 bg-white hover:border-secondary-300'
            }`}
          >
            {/* Step Number */}
            <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === instruction.id
                ? 'bg-accent-500 text-white' :'bg-secondary-400 text-white'
            }`}>
              {instruction.id}
            </div>

            {/* Image */}
            <div className="mb-4 rounded-lg overflow-hidden">
              <Image
                src={instruction.image}
                alt={instruction.title}
                className="w-full h-32 object-cover"
              />
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <Icon
                name={instruction.icon}
                size={32}
                className={currentStep === instruction.id ? 'text-green-800' : 'text-secondary-600'}
              />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-text-primary mb-2 text-center">
              {instruction.title}
            </h3>
            <p className="text-text-secondary text-sm text-center leading-relaxed">
              {instruction.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {instructions.map((instruction, index) => (
          <div
            key={instruction.id}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              currentStep === instruction.id
                ? 'border-primary-300 bg-primary-50' :'border-secondary-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Step Number */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep === instruction.id
                  ? 'bg-primary-600 text-white' :'bg-secondary-400 text-white'
              }`}>
                {instruction.id}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  {instruction.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {instruction.description}
                </p>
              </div>

              {/* Icon */}
              <Icon
                name={instruction.icon}
                size={24}
                className={currentStep === instruction.id ? 'text-primary-600' : 'text-secondary-600'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionInstructions;