import React from 'react';

export default function TopBar({
  onUndo, onRedo, canUndo, canRedo,
  onClear, showGrid, onToggleGrid,
  zoom, onZoomIn, onZoomOut, onZoomReset,
}) {
  return (
    <div className="topbar">
      {/* Brand */}
      <div className="topbar-brand">
        <div className="topbar-logo">✦</div>
        <div className="topbar-title">
          Shape <span>Studio</span>
        </div>
      </div>

      <div className="topbar-divider" />

      {/* File/Edit Actions */}
      <div className="topbar-group">
        <button
          className="topbar-btn"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (⌘Z)"
        >
          <svg className="topbar-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7.5 C3 4.46 5.46 2 8.5 2 C11.54 2 14 4.46 14 7.5 C14 10.54 11.54 13 8.5 13 L5 13" strokeLinecap="round"/>
            <path d="M3 7.5 L1.5 5.5 M3 7.5 L5 5.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Undo
        </button>
        <button
          className="topbar-btn"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (⌘⇧Z)"
        >
          <svg className="topbar-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 7.5 C13 4.46 10.54 2 7.5 2 C4.46 2 2 4.46 2 7.5 C2 10.54 4.46 13 7.5 13 L11 13" strokeLinecap="round"/>
            <path d="M13 7.5 L14.5 5.5 M13 7.5 L11 5.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Redo
        </button>
      </div>

      <div className="topbar-divider" />

      {/* View options */}
      <div className="topbar-group">
        <button
          className={`topbar-btn ${showGrid ? 'active' : ''}`}
          onClick={onToggleGrid}
          title="Toggle grid"
        >
          <svg className="topbar-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="5" height="5" rx="1"/>
            <rect x="10" y="1" width="5" height="5" rx="1"/>
            <rect x="1" y="10" width="5" height="5" rx="1"/>
            <rect x="10" y="10" width="5" height="5" rx="1"/>
          </svg>
          Grid
        </button>
      </div>

      <div className="topbar-spacer" />

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button
          className="topbar-btn"
          onClick={onZoomOut}
          disabled={zoom <= 0.3}
          title="Zoom out (−)"
          style={{ padding: '4px 8px', minWidth: 0 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="6" x2="10" y2="6" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="zoom-value" onClick={onZoomReset} title="Reset zoom (100%)">
          {Math.round(zoom * 100)}%
        </div>
        <button
          className="topbar-btn"
          onClick={onZoomIn}
          disabled={zoom >= 3}
          title="Zoom in (+)"
          style={{ padding: '4px 8px', minWidth: 0 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="6" y1="2" x2="6" y2="10" strokeLinecap="round"/>
            <line x1="2" y1="6" x2="10" y2="6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="topbar-divider" />

      {/* Clear */}
      <button className="topbar-btn danger" onClick={onClear} title="Clear canvas">
        <svg className="topbar-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 4h10M6 4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4M13 4l-.75 9.5a.5.5 0 0 1-.5.5h-7.5a.5.5 0 0 1-.5-.5L3 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Clear
      </button>
    </div>
  );
}