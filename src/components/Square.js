import React from 'react';
import { Rect } from 'react-konva';

/**
 * Square component - represents a single draggable square
 * Uses Konva Rect to create square shape
 */
function Square({ shape, isSelected, onSelect, onUpdate }) {
  
  /**
   * Handle drag start - mark square as being dragged
   */
  const handleDragStart = () => {
    onUpdate({ isDragging: true });
  };

  /**
   * Handle drag end - update position and stop dragging
   */
  const handleDragEnd = (e) => {
    // Get the current position of the rect (top-left corner)
    const rectX = e.target.x();
    const rectY = e.target.y();
    
    // Convert back to center position for storage
    const centerX = rectX + shape.width / 2;
    const centerY = rectY + shape.height / 2;
    
    onUpdate({
      x: centerX,
      y: centerY,
      isDragging: false
    });
  };

  /**
   * Handle click on square - select it
   */
  const handleClick = (e) => {
    e.cancelBubble = true; // Prevent stage click
    onSelect();
  };

  return (
    <Rect
      // Square properties
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#000' : shape.fill}
      strokeWidth={isSelected ? 3 : 1}
      
      // Position (convert from center to top-left corner)
      x={shape.x - shape.width / 2}
      y={shape.y - shape.height / 2}
      
      // Rotation
      rotation={shape.rotation || 0}
      offsetX={shape.width / 2}
      offsetY={shape.height / 2}
      
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

export default Square;