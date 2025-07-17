import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Triangle from './Triangle';
import Square from './Square';
import CircleShape from './Circle';
import Rectangle from './Rectangle';

/**
 * Canvas component that manages the drawing area
 * Handles canvas resizing and shape interactions
 */
function Canvas({ shapes, selectedShape, onSelectShape, onUpdateShape }) {
  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  /**
   * Update canvas size when window is resized
   */
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setStageSize({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    // Set initial size
    updateSize();

    // Add resize listener
    window.addEventListener('resize', updateSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  /**
   * Handle clicks on empty canvas area (deselect shapes)
   */
  const handleStageClick = (e) => {
    // Check if click was on the stage (not on a shape)
    if (e.target === e.target.getStage()) {
      onSelectShape(null);
    }
  };

  /**
   * Render the appropriate shape component based on shape type
   */
  const renderShape = (shape) => {
    const commonProps = {
      key: shape.id,
      shape: shape,
      isSelected: selectedShape === shape.id,
      onSelect: () => onSelectShape(shape.id),
      onUpdate: (newAttrs) => onUpdateShape(shape.id, newAttrs)
    };

    switch (shape.type) {
      case 'triangle':
        return <Triangle {...commonProps} />;
      case 'square':
        return <Square {...commonProps} />;
      case 'circle':
        return <CircleShape {...commonProps} />;
      case 'rectangle':
        return <Rectangle {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Stage 
        width={stageSize.width} 
        height={stageSize.height}
        onClick={handleStageClick}
        onTap={handleStageClick} // For touch devices
      >
        <Layer>
          {/* Render all shapes */}
          {shapes.map(renderShape)}
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;