import React, { useState, useCallback, useEffect, useRef } from 'react';
import Canvas from './components/Canvas';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';
import ContextMenu from './components/ContextMenu';
import ToastManager from './components/ToastManager';
import './App.css';

export default function App() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [contextMenu, setContextMenu] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  // ─── Toast ──────────────────────────────────────────────
  const showToast = useCallback((message, icon = '✓') => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exit: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
    }, 1800);
  }, []);

  // ─── History ────────────────────────────────────────────
  const pushHistory = useCallback((newShapes) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, newShapes];
    });
    setHistoryIndex(i => i + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const ni = historyIndex - 1;
      setHistoryIndex(ni);
      setShapes(history[ni]);
      setSelectedShape(null);
      showToast('Undo', '↩');
    }
  }, [historyIndex, history, showToast]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const ni = historyIndex + 1;
      setHistoryIndex(ni);
      setShapes(history[ni]);
      setSelectedShape(null);
      showToast('Redo', '↪');
    }
  }, [historyIndex, history, showToast]);

  // ─── Shape CRUD ─────────────────────────────────────────
  const addShape = useCallback((shapeType, color = null) => {
    const COLORS = ['#7c3aed','#f59e0b','#10b981','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316','#6366f1','#84cc16'];
    const fill = color || COLORS[Math.floor(Math.random() * COLORS.length)];
    const baseSize = 72;

    const newShape = {
      id: Date.now(),
      type: shapeType,
      x: Math.random() * 380 + 140,
      y: Math.random() * 220 + 100,
      fill,
      opacity: 1,
      size: baseSize,
      rotation: 0,
      isDragging: false,
    };

    if (shapeType === 'triangle') {
      newShape.points = [0, -baseSize/1.5, -baseSize/1.7, baseSize/1.7, baseSize/1.7, baseSize/1.7];
    } else if (shapeType === 'square') {
      newShape.width = baseSize; newShape.height = baseSize;
    } else if (shapeType === 'circle') {
      newShape.radius = baseSize / 2;
    } else if (shapeType === 'rectangle') {
      newShape.width = baseSize * 1.65; newShape.height = baseSize * 0.8;
    } else if (shapeType === 'star') {
      newShape.numPoints = 5; newShape.outerRadius = baseSize / 1.5; newShape.innerRadius = baseSize / 3;
    } else if (shapeType === 'hexagon') {
      newShape.sides = 6; newShape.radius = baseSize / 1.5;
    }

    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    pushHistory(newShapes);
    setSelectedShape(newShape.id);

    const icons = { triangle:'🔺', square:'⬛', circle:'⭕', rectangle:'▬', star:'⭐', hexagon:'⬡' };
    showToast(`${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} added`, icons[shapeType] || '✦');
  }, [shapes, pushHistory, showToast]);

  const eraseSelected = useCallback((id = selectedShape) => {
    if (!id) return;
    const newShapes = shapes.filter(s => s.id !== id);
    setShapes(newShapes);
    pushHistory(newShapes);
    setSelectedShape(null);
    showToast('Shape deleted', '🗑');
  }, [selectedShape, shapes, pushHistory, showToast]);

  const clearBoard = useCallback(() => {
    if (shapes.length === 0) return;
    setShapes([]);
    pushHistory([]);
    setSelectedShape(null);
    showToast('Canvas cleared', '✦');
  }, [shapes, pushHistory, showToast]);

  const updateShape = useCallback((id, newAttrs) => {
    setShapes(prev => prev.map(s => s.id === id ? { ...s, ...newAttrs } : s));
  }, []);

  const commitUpdate = useCallback((id, newAttrs) => {
    setShapes(prev => {
      const newShapes = prev.map(s => s.id === id ? { ...s, ...newAttrs } : s);
      pushHistory(newShapes);
      return newShapes;
    });
  }, [pushHistory]);

  const duplicateShape = useCallback((id = selectedShape) => {
    if (!id) return;
    const shape = shapes.find(s => s.id === id);
    if (!shape) return;
    const newShape = { ...shape, id: Date.now(), x: shape.x + 28, y: shape.y + 28 };
    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    pushHistory(newShapes);
    setSelectedShape(newShape.id);
    showToast('Duplicated', '⧉');
  }, [selectedShape, shapes, pushHistory, showToast]);

  // ─── Property Changes ───────────────────────────────────
  const changeSize = useCallback((value) => {
    if (!selectedShape) return;
    const shape = shapes.find(s => s.id === selectedShape);
    if (!shape) return;
    const v = Math.max(24, Math.min(180, value));
    if (shape.type === 'triangle') {
      const scale = v / shape.size;
      updateShape(selectedShape, { size: v, points: shape.points.map(p => p * scale) });
    } else if (shape.type === 'square') {
      updateShape(selectedShape, { size: v, width: v, height: v });
    } else if (shape.type === 'circle') {
      updateShape(selectedShape, { size: v, radius: v / 2 });
    } else if (shape.type === 'rectangle') {
      updateShape(selectedShape, { size: v, width: v * 1.65, height: v * 0.8 });
    } else if (shape.type === 'star') {
      updateShape(selectedShape, { size: v, outerRadius: v / 1.5, innerRadius: v / 3 });
    } else if (shape.type === 'hexagon') {
      updateShape(selectedShape, { size: v, radius: v / 1.5 });
    }
  }, [selectedShape, shapes, updateShape]);

  const changeColor = useCallback((color) => {
    if (selectedShape) updateShape(selectedShape, { fill: color });
  }, [selectedShape, updateShape]);

  const changeOpacity = useCallback((opacity) => {
    if (selectedShape) updateShape(selectedShape, { opacity });
  }, [selectedShape, updateShape]);

  const rotateShape = useCallback((degrees) => {
    if (selectedShape) updateShape(selectedShape, { rotation: degrees });
  }, [selectedShape, updateShape]);

  const bringToFront = useCallback((id = selectedShape) => {
    if (!id) return;
    setShapes(prev => {
      const shape = prev.find(s => s.id === id);
      const newShapes = shape ? [...prev.filter(s => s.id !== id), shape] : prev;
      pushHistory(newShapes);
      return newShapes;
    });
    showToast('Brought to front', '⬆');
  }, [selectedShape, pushHistory, showToast]);

  const sendToBack = useCallback((id = selectedShape) => {
    if (!id) return;
    setShapes(prev => {
      const shape = prev.find(s => s.id === id);
      const newShapes = shape ? [shape, ...prev.filter(s => s.id !== id)] : prev;
      pushHistory(newShapes);
      return newShapes;
    });
    showToast('Sent to back', '⬇');
  }, [selectedShape, pushHistory, showToast]);

  // ─── Context Menu ────────────────────────────────────────
  const openContextMenu = useCallback((e, shapeId) => {
    e.evt?.preventDefault?.();
    e.cancelBubble = true;
    const clientX = e.evt?.clientX ?? e.clientX ?? 0;
    const clientY = e.evt?.clientY ?? e.clientY ?? 0;
    setSelectedShape(shapeId);
    setContextMenu({ x: clientX, y: clientY, shapeId });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  // ─── Keyboard Shortcuts ──────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const ctrl = e.metaKey || e.ctrlKey;

      if (ctrl && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo(); }
      if (ctrl && e.shiftKey && e.key === 'z')  { e.preventDefault(); redo(); }
      if (ctrl && e.key === 'y') { e.preventDefault(); redo(); }
      if (ctrl && e.key === 'd') { e.preventDefault(); duplicateShape(); }

      if (!ctrl) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (selectedShape) eraseSelected();
        }
        if (e.key === 'Escape') { setSelectedShape(null); setContextMenu(null); }
        if (e.key === 't') addShape('triangle');
        if (e.key === 's') addShape('square');
        if (e.key === 'c') addShape('circle');
        if (e.key === 'r') addShape('rectangle');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo, duplicateShape, eraseSelected, selectedShape, addShape]);

  // Close context menu on click outside
  useEffect(() => {
    const onMouseDown = () => contextMenu && setContextMenu(null);
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [contextMenu]);

  const selectedShapeData = shapes.find(s => s.id === selectedShape);

  return (
    <div className="app">
      <TopBar
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onClear={clearBoard}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(v => !v)}
        zoom={zoom}
        onZoomIn={() => setZoom(z => Math.min(+(z + 0.1).toFixed(1), 3))}
        onZoomOut={() => setZoom(z => Math.max(+(z - 0.1).toFixed(1), 0.3))}
        onZoomReset={() => setZoom(1)}
      />

      <div className="workspace">
        <LeftPanel onAddShape={addShape} />

        <div className="canvas-area">
          <Canvas
            shapes={shapes}
            selectedShape={selectedShape}
            onSelectShape={setSelectedShape}
            onUpdateShape={updateShape}
            onCommitUpdate={commitUpdate}
            onContextMenu={openContextMenu}
            showGrid={showGrid}
            zoom={zoom}
          />
        </div>

        <RightPanel
          shape={selectedShapeData}
          onChangeSize={changeSize}
          onChangeColor={changeColor}
          onChangeOpacity={changeOpacity}
          onRotate={rotateShape}
          onDuplicate={duplicateShape}
          onDelete={eraseSelected}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
        />
      </div>

      <StatusBar
        shapeCount={shapes.length}
        selectedShape={selectedShapeData}
        zoom={zoom}
        historyIndex={historyIndex}
      />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          shapeId={contextMenu.shapeId}
          onClose={closeContextMenu}
          onDuplicate={() => { duplicateShape(contextMenu.shapeId); closeContextMenu(); }}
          onDelete={() => { eraseSelected(contextMenu.shapeId); closeContextMenu(); }}
          onBringToFront={() => { bringToFront(contextMenu.shapeId); closeContextMenu(); }}
          onSendToBack={() => { sendToBack(contextMenu.shapeId); closeContextMenu(); }}
        />
      )}

      <ToastManager toasts={toasts} />
    </div>
  );
}