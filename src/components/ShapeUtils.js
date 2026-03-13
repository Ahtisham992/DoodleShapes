// Shared drag handlers for all shapes
export function useDragHandlers(shape, onUpdate, onCommit, onSelect, onContextMenu) {
  const handleDragStart = () => onUpdate({ isDragging: true });

  const handleDragEnd = (e) => {
    onCommit({ x: e.target.x(), y: e.target.y(), isDragging: false });
  };

  const handleClick = (e) => {
    e.cancelBubble = true;
    onSelect();
  };

  const handleContextMenu = (e) => {
    e.evt.preventDefault();
    e.cancelBubble = true;
    onContextMenu(e);
  };

  const shadowProps = {
    shadowBlur: shape.isDragging ? 20 : 8,
    shadowColor: shape.isDragging ? '#7c3aed' : 'rgba(0,0,0,0.35)',
    shadowOpacity: shape.isDragging ? 0.9 : 0.4,
    shadowOffsetY: shape.isDragging ? 6 : 3,
  };

  const strokeProps = {
    stroke: shape.isSelected ? '#7c3aed' : 'transparent',
    strokeWidth: 2.5,
  };

  return { handleDragStart, handleDragEnd, handleClick, handleContextMenu, shadowProps, strokeProps };
}