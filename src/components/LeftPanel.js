import React from 'react';

const SHAPES = [
  {
    type: 'triangle',
    label: 'Triangle',
    hotkey: 'T',
    color: '#7c3aed',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <polygon points="20,4 36,36 4,36" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    type: 'square',
    label: 'Square',
    hotkey: 'S',
    color: '#3b82f6',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect x="4" y="4" width="32" height="32" rx="3" fill="#3b82f6" />
      </svg>
    ),
  },
  {
    type: 'circle',
    label: 'Circle',
    hotkey: 'C',
    color: '#10b981',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="17" fill="#10b981" />
      </svg>
    ),
  },
  {
    type: 'rectangle',
    label: 'Rectangle',
    hotkey: 'R',
    color: '#f59e0b',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect x="2" y="10" width="36" height="20" rx="3" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    type: 'star',
    label: 'Star',
    hotkey: '',
    color: '#f43f5e',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <polygon
          points="20,3 24.9,14.5 37.6,15.5 28.3,23.4 31.3,36 20,29.2 8.7,36 11.7,23.4 2.4,15.5 15.1,14.5"
          fill="#f43f5e"
        />
      </svg>
    ),
  },
  {
    type: 'hexagon',
    label: 'Hexagon',
    hotkey: '',
    color: '#14b8a6',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <polygon points="20,2 35,11 35,29 20,38 5,29 5,11" fill="#14b8a6" />
      </svg>
    ),
  },
];

const PRESET_COLORS = [
  '#7c3aed','#3b82f6','#10b981','#f59e0b',
  '#f43f5e','#ec4899','#14b8a6','#f97316',
  '#6366f1','#84cc16','#06b6d4','#a855f7',
];

export default function LeftPanel({ onAddShape }) {
  const [activeColor, setActiveColor] = React.useState(null);

  const handleColorClick = (color) => {
    setActiveColor(prev => prev === color ? null : color);
  };

  const handleShapeClick = (type) => {
    onAddShape(type, activeColor);
  };

  return (
    <div className="left-panel">
      {/* Shape Grid */}
      <div className="panel-header">Shapes</div>
      <div className="shape-grid">
        {SHAPES.map(shape => (
          <button
            key={shape.type}
            className="shape-card"
            onClick={() => handleShapeClick(shape.type)}
            title={`Add ${shape.label}${shape.hotkey ? ` (${shape.hotkey})` : ''}`}
          >
            {shape.hotkey && <span className="shape-hotkey">{shape.hotkey}</span>}
            <div className="shape-preview">{shape.svg}</div>
            <span className="shape-label">{shape.label}</span>
          </button>
        ))}
      </div>

      <div className="left-panel-divider" />

      {/* Quick Colors */}
      <div className="panel-header">Quick Color</div>
      <div className="panel-section">
        <div className="preset-colors">
          {PRESET_COLORS.map(color => (
            <button
              key={color}
              className="preset-color-btn"
              style={{
                background: color,
                outline: activeColor === color ? `2.5px solid white` : 'none',
                outlineOffset: '2px',
              }}
              onClick={() => handleColorClick(color)}
              title={color}
            />
          ))}
        </div>
        {activeColor && (
          <div style={{
            marginTop: 8,
            fontSize: 11,
            color: 'var(--accent-light)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: activeColor, display: 'inline-block',
              boxShadow: `0 0 6px ${activeColor}`,
            }} />
            Next shape uses this color
          </div>
        )}
      </div>

      {/* Keyboard Tips */}
      <div className="tips-section">
        <div className="panel-header" style={{ padding: '0 0 6px' }}>Shortcuts</div>
        {[
          { keys: ['T', 'S', 'C', 'R'], label: 'Add shape' },
          { keys: ['Del'], label: 'Delete selected' },
          { keys: ['⌘', 'D'], label: 'Duplicate' },
          { keys: ['⌘', 'Z'], label: 'Undo' },
          { keys: ['Esc'], label: 'Deselect' },
        ].map((tip, i) => (
          <div key={i} className="tip-item">
            <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
              {tip.keys.map(k => <span key={k} className="tip-key">{k}</span>)}
            </div>
            <span>{tip.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}