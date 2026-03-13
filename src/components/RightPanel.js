import React, { useState, useEffect } from 'react';

const COLORS = [
  '#7c3aed','#3b82f6','#10b981','#f59e0b',
  '#f43f5e','#ec4899','#14b8a6','#f97316',
  '#6366f1','#84cc16','#06b6d4','#a855f7',
  '#ffffff','#94a3b8','#475569','#0f172a',
];

const SHAPE_ICONS = {
  triangle: '🔺',
  square: '⬛',
  circle: '⭕',
  rectangle: '▬',
  star: '⭐',
  hexagon: '⬡',
};

export default function RightPanel({
  shape,
  onChangeSize, onChangeColor, onChangeOpacity, onRotate,
  onDuplicate, onDelete, onBringToFront, onSendToBack,
}) {
  const [rotInput, setRotInput] = useState('0');
  const [hexInput, setHexInput] = useState('#7c3aed');

  useEffect(() => {
    if (shape) {
      setRotInput(String(Math.round(shape.rotation || 0)));
      setHexInput(shape.fill || '#7c3aed');
    }
  }, [shape?.id, shape?.rotation, shape?.fill]);

  if (!shape) {
    return (
      <div className="right-panel">
        <div className="right-panel-empty">
          <div className="right-panel-empty-icon">⬡</div>
          <div className="right-panel-empty-text">
            Select a shape to<br />edit its properties
          </div>
        </div>
      </div>
    );
  }

  const handleRotInput = (e) => {
    setRotInput(e.target.value);
  };

  const handleRotCommit = () => {
    const v = parseFloat(rotInput);
    if (!isNaN(v)) onRotate(v % 360);
  };

  const handleHexInput = (e) => {
    setHexInput(e.target.value);
    if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
      onChangeColor(e.target.value);
    }
  };

  const sizeDisplay = Math.round(shape.size);
  const opacityPct = Math.round((shape.opacity ?? 1) * 100);

  return (
    <div className="right-panel">
      {/* Shape identity */}
      <div className="shape-identity">
        <div className="shape-badge">
          <div className="shape-badge-icon">{SHAPE_ICONS[shape.type] || '✦'}</div>
          <div className="shape-badge-info">
            <div className="shape-badge-name">{shape.type}</div>
            <div className="shape-badge-id">#{String(shape.id).slice(-6)}</div>
          </div>
        </div>
      </div>

      {/* Transform */}
      <div className="prop-section">
        <div className="prop-section-title">Transform</div>

        <div className="prop-row">
          <span className="prop-label">Position</span>
          <div className="prop-value" style={{ fontSize: 11 }}>
            {Math.round(shape.x)}, {Math.round(shape.y)}
          </div>
        </div>

        <div className="prop-row">
          <span className="prop-label">Size</span>
          <div className="prop-slider-wrap">
            <input
              type="range"
              className="prop-slider"
              min="24"
              max="180"
              value={shape.size}
              onChange={e => onChangeSize(Number(e.target.value))}
            />
            <span className="prop-number">{sizeDisplay}</span>
          </div>
        </div>

        <div className="prop-row">
          <span className="prop-label">Rotate</span>
          <div className="rotation-wheel" style={{ flex: 1 }}>
            <button className="rot-btn" onClick={() => { const r = (shape.rotation||0)-45; onRotate(r); setRotInput(String(Math.round(r))); }} title="Rotate -45°">↺</button>
            <input
              className="rotation-input"
              value={rotInput}
              onChange={handleRotInput}
              onBlur={handleRotCommit}
              onKeyDown={e => e.key === 'Enter' && handleRotCommit()}
              title="Rotation in degrees"
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>°</span>
            <button className="rot-btn" onClick={() => { const r = (shape.rotation||0)+45; onRotate(r); setRotInput(String(Math.round(r))); }} title="Rotate +45°">↻</button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="prop-section">
        <div className="prop-section-title">Appearance</div>

        <div className="prop-row">
          <span className="prop-label">Opacity</span>
          <div className="prop-slider-wrap">
            <input
              type="range"
              className="prop-slider"
              min="0"
              max="1"
              step="0.01"
              value={shape.opacity ?? 1}
              onChange={e => onChangeOpacity(Number(e.target.value))}
            />
            <span className="prop-number">{opacityPct}%</span>
          </div>
        </div>

        {/* Color swatches */}
        <div style={{ marginBottom: 8 }}>
          <div className="color-swatches">
            {COLORS.map(c => (
              <button
                key={c}
                className={`color-swatch ${shape.fill === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => onChangeColor(c)}
                title={c}
              />
            ))}
          </div>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={shape.fill}
              onChange={e => { onChangeColor(e.target.value); setHexInput(e.target.value); }}
              title="Custom color"
            />
            <input
              className="color-hex"
              value={hexInput}
              onChange={handleHexInput}
              maxLength={7}
              placeholder="#7c3aed"
            />
          </div>
        </div>
      </div>

      {/* Layer Actions */}
      <div className="prop-section">
        <div className="prop-section-title">Layer</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="action-btn" style={{ flex: 1 }} onClick={onBringToFront} title="Bring to front">
            <span className="action-btn-icon">⬆</span>
            Front
          </button>
          <button className="action-btn" style={{ flex: 1 }} onClick={onSendToBack} title="Send to back">
            <span className="action-btn-icon">⬇</span>
            Back
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="prop-actions">
        <button className="action-btn primary" onClick={onDuplicate} title="Duplicate (⌘D)">
          <span className="action-btn-icon">⧉</span>
          Duplicate
          <span className="action-btn-kb">⌘D</span>
        </button>
        <button className="action-btn danger" onClick={onDelete} title="Delete (Del)">
          <span className="action-btn-icon">🗑</span>
          Delete Shape
          <span className="action-btn-kb">Del</span>
        </button>
      </div>
    </div>
  );
}