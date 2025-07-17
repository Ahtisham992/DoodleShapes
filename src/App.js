import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import './App.css';

function App() {
  // State to store all shapes on the canvas
  const [shapes, setShapes] = useState([]);
  
  // State to track which shape is currently selected
  const [selectedShape, setSelectedShape] = useState(null);

  /**
   * Add a new shape to the canvas
   * Creates a shape with random position and bright colors
   */
  const addShape = (shapeType) => {
    const colors = ['orange', 'skyblue', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#e74c3c', '#9b59b6'];
    const baseSize = 60; // Base size for shapes
    
    const newShape = {
      id: Date.now(), // Simple unique ID using timestamp
      type: shapeType, // 'triangle', 'square', 'circle', or 'rectangle'
      x: Math.random() * 300 + 100, // Random x position
      y: Math.random() * 200 + 100, // Random y position
      fill: colors[Math.floor(Math.random() * colors.length)], // Random bright color
      size: baseSize, // Size multiplier
      rotation: 0, // Initial rotation in degrees
      isDragging: false
    };

    // Set shape-specific properties
    if (shapeType === 'triangle') {
      newShape.points = [0, -baseSize/1.5, -baseSize/1.7, baseSize/1.7, baseSize/1.7, baseSize/1.7];
    } else if (shapeType === 'square') {
      newShape.width = baseSize;
      newShape.height = baseSize;
    } else if (shapeType === 'circle') {
      newShape.radius = baseSize / 2;
    } else if (shapeType === 'rectangle') {
      newShape.width = baseSize * 1.5; // Make rectangles wider
      newShape.height = baseSize * 0.8; // Make rectangles shorter
    }
    
    setShapes([...shapes, newShape]);
  };

  /**
   * Delete the currently selected shape
   */
  const eraseSelected = () => {
    if (selectedShape) {
      setShapes(shapes.filter(shape => shape.id !== selectedShape));
      setSelectedShape(null);
    }
  };

  /**
   * Clear all shapes from the canvas
   */
  const clearBoard = () => {
    setShapes([]);
    setSelectedShape(null);
  };

  /**
   * Update shape properties when modified
   */
  const updateShape = (id, newAttrs) => {
    setShapes(shapes.map(shape => 
      shape.id === id ? { ...shape, ...newAttrs } : shape
    ));
  };

  /**
   * Change size of selected shape
   */
  const changeSize = (increment) => {
    if (selectedShape) {
      const shape = shapes.find(s => s.id === selectedShape);
      if (shape) {
        const newSize = Math.max(20, Math.min(150, shape.size + increment));
        
        if (shape.type === 'triangle') {
          const scale = newSize / shape.size;
          const newPoints = shape.points.map(point => point * scale);
          updateShape(selectedShape, { size: newSize, points: newPoints });
        } else if (shape.type === 'square') {
          updateShape(selectedShape, { size: newSize, width: newSize, height: newSize });
        } else if (shape.type === 'circle') {
          updateShape(selectedShape, { size: newSize, radius: newSize / 2 });
        } else if (shape.type === 'rectangle') {
          const scale = newSize / shape.size;
          updateShape(selectedShape, { 
            size: newSize, 
            width: newSize * 1.5, 
            height: newSize * 0.8 
          });
        }
      }
    }
  };

  /**
   * Change color of selected shape
   */
  const changeColor = (color) => {
    if (selectedShape) {
      updateShape(selectedShape, { fill: color });
    }
  };

  /**
   * Rotate the selected shape
   */
  const rotateShape = (direction) => {
    if (selectedShape) {
      const shape = shapes.find(s => s.id === selectedShape);
      if (shape) {
        const rotationIncrement = direction === 'left' ? -45 : 45;
        const newRotation = shape.rotation + rotationIncrement;
        updateShape(selectedShape, { rotation: newRotation });
      }
    }
  };

  /**
   * Bring the selected shape to the front (top layer)
   */
  const bringToFront = () => {
    if (selectedShape) {
      const shape = shapes.find(s => s.id === selectedShape);
      if (shape) {
        // Remove the selected shape from its current position
        const otherShapes = shapes.filter(s => s.id !== selectedShape);
        // Add it to the end of the array (which renders on top)
        setShapes([...otherShapes, shape]);
      }
    }
  };

  return (
    <div className="app">
      <div className="title">🔺⬜⭕📐 Shape Canvas - Learn Shapes! 🔺⬜⭕📐</div>
      
      <Toolbar 
        onAddShape={addShape}
        onErase={eraseSelected}
        onClear={clearBoard}
        onChangeSize={changeSize}
        onChangeColor={changeColor}
        onRotate={rotateShape}
        onBringToFront={bringToFront}
        hasSelection={selectedShape !== null}
      />
      
      <div className="canvas-container">
        <Canvas 
          shapes={shapes}
          selectedShape={selectedShape}
          onSelectShape={setSelectedShape}
          onUpdateShape={updateShape}
        />
      </div>
    </div>
  );
}

export default App;