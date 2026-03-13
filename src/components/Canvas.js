import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Triangle from './Triangle';
import Square from './Square';
import CircleShape from './Circle';
import Rectangle from './Rectangle';
import Star from './Star';
import Hexagon from './Hexagon';

export default function Canvas({
  shapes, selectedShape, onSelectShape, onUpdateShape,
  onCommitUpdate, onContextMenu, showGrid, zoom,
}) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) onSelectShape(null);
  };

  const renderShape = (shape) => {
    const props = {
      key: shape.id,
      shape,
      isSelected: selectedShape === shape.id,
      onSelect: () => onSelectShape(shape.id),
      onUpdate: (attrs) => onUpdateShape(shape.id, attrs),
      onCommit: (attrs) => onCommitUpdate(shape.id, attrs),
      onContextMenu: (e) => onContextMenu(e, shape.id),
    };
    switch (shape.type) {
      case 'triangle':   return <Triangle {...props} />;
      case 'square':     return <Square {...props} />;
      case 'circle':     return <CircleShape {...props} />;
      case 'rectangle':  return <Rectangle {...props} />;
      case 'star':       return <Star {...props} />;
      case 'hexagon':    return <Hexagon {...props} />;
      default:           return null;
    }
  };

  const canvasW = size.w * 0.92;
  const canvasH = size.h * 0.88;

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        className="canvas-frame"
        style={{
          width: canvasW,
          height: canvasH,
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <div className={`canvas-grid${showGrid ? '' : ' hidden'}`} />

        <div
          className={`canvas-empty-hint${shapes.length > 0 ? ' hidden' : ''}`}
        >
          <div className="canvas-empty-icon">✦</div>
          <div className="canvas-empty-text">Your canvas is empty</div>
          <div className="canvas-empty-sub">Click a shape on the left to begin</div>
        </div>

        <Stage
          width={canvasW}
          height={canvasH}
          onClick={handleStageClick}
          onTap={handleStageClick}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Layer>
            {shapes.map(renderShape)}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}