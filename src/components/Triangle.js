import React from 'react';
import { Line } from 'react-konva';

export default function Triangle({ shape, isSelected, onSelect, onUpdate, onCommit, onContextMenu }) {
  const handleDragStart = () => onUpdate({ isDragging: true });
  const handleDragEnd = (e) => onCommit({ x: e.target.x(), y: e.target.y(), isDragging: false });
  const handleClick = (e) => { e.cancelBubble = true; onSelect(); };
  const handleContextMenu = (e) => { e.evt.preventDefault(); e.cancelBubble = true; onContextMenu(e); };

  return (
    <Line
      points={shape.points}
      fill={shape.fill}
      stroke={isSelected ? '#7c3aed' : 'transparent'}
      strokeWidth={isSelected ? 2.5 : 0}
      closed
      x={shape.x}
      y={shape.y}
      rotation={shape.rotation || 0}
      opacity={shape.opacity ?? 1}
      draggable
      onClick={handleClick}
      onTap={handleClick}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      shadowBlur={shape.isDragging ? 22 : isSelected ? 14 : 6}
      shadowColor={isSelected ? '#7c3aed' : 'rgba(0,0,0,0.3)'}
      shadowOpacity={shape.isDragging ? 0.9 : isSelected ? 0.7 : 0.3}
      shadowOffsetY={shape.isDragging ? 8 : 3}
      perfectDrawEnabled={false}
    />
  );
}