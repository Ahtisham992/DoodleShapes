import React from 'react';

// ─── Status Bar ────────────────────────────────────────────
export function StatusBar({ shapeCount, selectedShape, zoom, historyIndex }) {
  const typeLabel = selectedShape
    ? selectedShape.type.charAt(0).toUpperCase() + selectedShape.type.slice(1)
    : null;

  return (
    <div className="statusbar">
      <div className="status-item">
        <div className={`status-dot ${shapeCount > 0 ? '' : 'warn'}`} />
        <span>
          <span className="status-accent">{shapeCount}</span>
          {' '}shape{shapeCount !== 1 ? 's' : ''}
        </span>
      </div>

      {selectedShape && (
        <div className="status-item">
          <span>Selected: <span className="status-accent">{typeLabel}</span></span>
        </div>
      )}

      <div className="status-item">
        <span>History: <span className="status-accent">{historyIndex}</span></span>
      </div>

      <div className="status-spacer" />

      <div className="status-item">
        <span>Zoom: <span className="status-accent">{Math.round(zoom * 100)}%</span></span>
      </div>

      <div className="status-item" style={{ borderRight: 'none' }}>
        <span style={{ opacity: 0.5 }}>Shape Studio v2.0</span>
      </div>
    </div>
  );
}

// ─── Context Menu ──────────────────────────────────────────
export function ContextMenu({ x, y, onClose, onDuplicate, onDelete, onBringToFront, onSendToBack }) {
  return (
    <div
      className="context-menu"
      style={{ left: x, top: y }}
      onMouseDown={e => e.stopPropagation()}
    >
      <button className="ctx-item" onClick={onDuplicate}>
        <span className="ctx-item-icon">⧉</span>
        Duplicate
        <span className="ctx-item-kb">⌘D</span>
      </button>
      <button className="ctx-item" onClick={onBringToFront}>
        <span className="ctx-item-icon">⬆</span>
        Bring to Front
      </button>
      <button className="ctx-item" onClick={onSendToBack}>
        <span className="ctx-item-icon">⬇</span>
        Send to Back
      </button>
      <div className="ctx-divider" />
      <button className="ctx-item danger" onClick={onDelete}>
        <span className="ctx-item-icon">🗑</span>
        Delete
        <span className="ctx-item-kb">Del</span>
      </button>
    </div>
  );
}

// ─── Toast Manager ─────────────────────────────────────────
export function ToastManager({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast${t.exit ? ' exit' : ''}`}>
          <span className="toast-icon">{t.icon}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

export default StatusBar;