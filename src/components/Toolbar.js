import React, { useState } from 'react';

/**
 * Toolbar component with buttons for shape operations
 * Contains: Shape Dropdown, Size Controls, Color Picker, Rotation Controls, Erase Selected, Clear Board
 */
function Toolbar({ onAddShape, onErase, onClear, onChangeSize, onChangeColor, onRotate, hasSelection }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ff6b6b');

  /**
   * Handle shape selection from dropdown
   */
  const handleShapeSelect = (shapeType) => {
    onAddShape(shapeType);
    setIsDropdownOpen(false);
  };

  /**
   * Handle color change
   */
  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    onChangeColor(color);
  };

  /**
   * Close dropdown when clicking outside
   */
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="toolbar">
      {/* Shapes Dropdown */}
      <div className="toolbar-group">
        <div className="shapes-dropdown">
          <button 
            className="dropdown-button"
            onClick={handleDropdownToggle}
            title="Select a shape to add"
          >
            🔺⬜ Add Shape ▼
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button 
                className="dropdown-item"
                onClick={() => handleShapeSelect('triangle')}
              >
                🔺 Triangle
              </button>
              <button 
                className="dropdown-item"
                onClick={() => handleShapeSelect('square')}
              >
                ⬜ Square
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Size Controls */}
      <div className="toolbar-group">
        <div className="size-controls">
          <span className="size-label">Size:</span>
          <button 
            className="size-button"
            onClick={() => onChangeSize(-10)}
            disabled={!hasSelection}
            title="Decrease size"
          >
            -
          </button>
          <button 
            className="size-button"
            onClick={() => onChangeSize(10)}
            disabled={!hasSelection}
            title="Increase size"
          >
            +
          </button>
        </div>
      </div>

      {/* Rotation Controls */}
      <div className="toolbar-group">
        <div className="size-controls">
          <span className="size-label">Rotate:</span>
          <button 
            className="size-button"
            onClick={() => onRotate('left')}
            disabled={!hasSelection}
            title="Rotate left 45°"
          >
            ↺
          </button>
          <button 
            className="size-button"
            onClick={() => onRotate('right')}
            disabled={!hasSelection}
            title="Rotate right 45°"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Color Picker */}
      <div className="toolbar-group">
        <div className="color-picker">
          <span className="color-label">Color:</span>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            disabled={!hasSelection}
            className="color-input"
            title="Change shape color"
          />
        </div>
      </div>

      {/* Erase Selected Button */}
      <button 
        className="toolbar-button erase" 
        onClick={onErase}
        disabled={!hasSelection}
        title={hasSelection ? "Erase the selected shape" : "Select a shape first"}
        style={{ 
          opacity: hasSelection ? 1 : 0.5,
          cursor: hasSelection ? 'pointer' : 'not-allowed'
        }}
      >
        🧽 Erase Selected
      </button>

      {/* Clear Board Button */}
      <button 
        className="toolbar-button clear" 
        onClick={onClear}
        title="Clear all shapes from the canvas"
      >
        🗑️ Clear Board
      </button>
    </div>
  );
}

export default Toolbar;