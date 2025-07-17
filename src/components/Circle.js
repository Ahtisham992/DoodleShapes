import React from 'react';
import { Circle } from 'react-konva';

/**
 * Circle component - represents a single draggable circle
 * Uses Konva Circle to create circle shape
 */
function CircleShape({ shape, isSelected, onSelect, onUpdate }) {
  
  /**
   * Handle drag start - mark circle as being dragged
   */
  const handleDragStart = () => {
    onUpdate({ isDragging: true });
  };

  /**
   * Handle drag end - update position and stop dragging
   */
  const handleDragEnd = (e) => {
    onUpdate({
      x: e.target.x(),
      y: e.target.y(),
      isDragging: false
    });
  };

  /**
   * Handle click on circle - select it
   */
  const handleClick = (e) => {
    e.cancelBubble = true; // Prevent stage click
    onSelect();
  };

  return (
    <Circle
      // Circle properties
      radius={shape.radius}
      fill={shape.fill}
      stroke={isSelected ? '#000' : shape.fill}
      strokeWidth={isSelected ? 3 : 1}
      
      // Position (circle is positioned by center)
      x={shape.x}
      y={shape.y}
      
      // Rotation (circles look the same when rotated, but we include it for consistency)
      rotation={shape.rotation || 0}
      
      // Interaction
      draggable={true}
      onClick={handleClick}
      onTap={handleClick} // For touch devices
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      
      // Visual feedback
      shadowBlur={shape.isDragging ? 15 : isSelected ? 10 : 5}
      shadowColor={shape.isDragging ? 'blue' : isSelected ? 'red' : 'gray'}
      shadowOpacity={shape.isDragging ? 0.8 : isSelected ? 0.6 : 0.3}
      
      // Smooth dragging
      perfectDrawEnabled={false}
    />
  );
}

export default CircleShape;