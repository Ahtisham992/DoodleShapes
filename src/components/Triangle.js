import React from 'react';
import { Line } from 'react-konva';

/**
 * Triangle component - represents a single draggable triangle
 * Uses Konva Line with closed path to create triangle shape
 */
function Triangle({ shape, isSelected, onSelect, onUpdate }) {
  
  /**
   * Handle drag start - mark triangle as being dragged
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
   * Handle click on triangle - select it
   */
  const handleClick = (e) => {
    e.cancelBubble = true; // Prevent stage click
    onSelect();
  };

  return (
    <Line
      // Triangle properties
      points={shape.points}
      fill={shape.fill}
      stroke={isSelected ? '#000' : shape.fill}
      strokeWidth={isSelected ? 3 : 1}
      closed={true} // This makes it a closed shape (triangle)
      
      // Position
      x={shape.x}
      y={shape.y}
      
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

export default Triangle;