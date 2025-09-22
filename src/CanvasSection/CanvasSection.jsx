import { useEffect, useMemo, useRef, useState } from 'react';
import { Stage, Layer, Line, Circle, Group } from 'react-konva';
import { Dot } from 'lucide-react';
import ColorPalette from './ColorPalette';

import styles from './CanvasSection.module.css';

const CanvasSection = () => {
  const [lines, setLines] = useState([])
  const [dots, setDots] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('line')
  const [showGrid, setShowGrid] = useState(true)
  const [gridSize, setGridSize] = useState(40)
  const [color, setColor] = useState('#7A2F2F')
  const [symmetry, setSymmetry] = useState('none') // none | v | h | r4
  const [history, setHistory] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [size, setSize] = useState({ width: 800, height: 600 })
  const containerRef = useRef(null)
  const stageRef = useRef()

  useEffect(() => {
    const handle = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const h = Math.min(0.75 * w, 700)
      setSize({ width: w, height: h })
    }
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  const snap = (n) => Math.round(n / gridSize) * gridSize

  const pushHistory = (action) => {
    setHistory((h) => [...h, action])
    setRedoStack([])
  }

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition()
    const x = snap(pos.x)
    const y = snap(pos.y)
    if (tool === 'line') {
      setIsDrawing(true)
      setLines((prev) => [...prev, { points: [x, y], color }])
      pushHistory({ type: 'line-start' })
    } else if (tool === 'dot') {
      const dot = { x, y, id: Date.now() }
      setDots((prev) => [...prev, dot])
      pushHistory({ type: 'add-dot', dot })
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing || tool !== 'line') return
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const x = snap(point.x)
    const y = snap(point.y)
    const lastLine = lines[lines.length - 1]
    if (lastLine) {
      lastLine.points = lastLine.points.concat([x, y])
      setLines([...lines])
    }
  }

  const handleMouseUp = () => {
    if (isDrawing) pushHistory({ type: 'line-end' })
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setLines([])
    setDots([])
  }

  const undoLast = () => {
    setHistory((h) => {
      if (h.length === 0) return h
      const newH = [...h]
      const last = newH.pop()
      setRedoStack((r) => [...r, last])
      if (last.type === 'add-dot') {
        setDots((d) => d.filter((dd) => dd.id !== last.dot.id))
      } else if (last.type === 'line-end' || last.type === 'line-start') {
        setLines((l) => l.slice(0, -1))
      }
      return newH
    })
  }

  const redo = () => {
    setRedoStack((r) => {
      if (r.length === 0) return r
      const newR = [...r]
      const action = newR.pop()
      if (action.type === 'add-dot') {
        setDots((d) => [...d, action.dot])
      } else if (action.type === 'line-end') {
        // cannot reconstruct intermediate points, kept simple
      }
      setHistory((h) => [...h, action])
      return newR
    })
  }

  const mirroredPoints = (pts, mode) => {
    if (mode === 'none') return [pts]
    const sets = [pts]
    const w = size.width
    const h = size.height
    if (mode === 'v' || mode === 'r4') {
      const v = pts.map((v, i) => (i % 2 === 0 ? w - v : v))
      sets.push(v)
    }
    if (mode === 'h' || mode === 'r4') {
      const hor = pts.map((v, i) => (i % 2 === 1 ? h - v : v))
      sets.push(hor)
    }
    if (mode === 'r4') {
      const both = pts.map((v, i) => (i % 2 === 0 ? w - v : h - v))
      sets.push(both)
    }
    return sets
  }

  const exportPNG = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 })
    const a = document.createElement('a')
    a.href = uri
    a.download = 'kolam.png'
    a.click()
  }

  const exportSVG = () => {
    // basic SVG export of dots and lines
    const svgLines = lines
      .map((l) => `<polyline fill="none" stroke="${l.color}" stroke-width="3" points="${l.points.join(',')}" />`)
      .join('')
    const svgDots = dots
      .map((d) => `<circle cx="${d.x}" cy="${d.y}" r="4" fill="#7A2F2F" />`)
      .join('')
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}">${svgLines}${svgDots}</svg>`
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kolam.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Simple animation playback: reveal lines sequentially
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!isAnimating) return
    const total = lines.reduce((sum, l) => sum + l.points.length, 0)
    let current = 0
    const id = setInterval(() => {
      current += 8
      const p = Math.min(current / total, 1)
      setProgress(p)
      if (p >= 1) {
        clearInterval(id)
        setIsAnimating(false)
      }
    }, 30)
    return () => clearInterval(id)
  }, [isAnimating])

  const getTruncatedPoints = (pts) => {
    if (!isAnimating) return pts
    const count = Math.max(2, Math.floor(pts.length * progress))
    return pts.slice(0, count)
  }

  return (
    <section className={styles.section}>
      <div className={styles.canvasSection}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Kolam Design Canvas</h1>
          <p className={styles.subtitle}>
            Create your own Kolam patterns using dots and lines. Start with dots as your foundation, then connect them with beautiful curves.
          </p>
        </div>

        <div className={styles.gridContainer}>
          {/* Tools Panel */}
          <div className={styles.toolsPanel}>
            <h2 className={styles.toolsTitle}>Tools</h2>
            <div className={styles.toolGroup}>
              <label className={styles.toolLabel}>Drawing Tool</label>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => setTool('dot')}
                  className={`${styles.toolButton} ${tool === 'dot' ? styles.toolButtonActive : styles.toolButtonInactive}`}
                >
                  <div className={styles.toolIconWrapper}>
                    <div className={styles.toolIcon}>
                      <Dot/>
                    </div>
                    <span>Place Dots</span>
                  </div>
                </button>
                <button
                  onClick={() => setTool('line')}
                  className={`${styles.toolButton} ${tool === 'line' ? styles.toolButtonActive : styles.toolButtonInactive}`}
                >
                  <div className={styles.toolIconWrapper}>
                    <svg className={styles.toolIcon} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.13L18.87,8.88L20.71,7.04Z" />
                    </svg>
                    <span>Draw Lines</span>
                  </div>
                </button>
              </div>
            </div>
            {/* Symmetry */}
            <div className={styles.toolGroup}>
              <label className={styles.toolLabel}>Symmetry</label>
              <div className={styles.symmetryGrid}>
                {[
                  { key: 'none', label: 'None' },
                  { key: 'v', label: 'Vertical' },
                  { key: 'h', label: 'Horizontal' },
                  { key: 'r4', label: 'Radial' },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSymmetry(s.key)}
                    className={`${styles.symmetryButton} ${symmetry === s.key ? styles.symmetryButtonActive : styles.symmetryButtonInactive}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Grid Toggle */}
            <div className={styles.toggleContainer}>
              <label className={styles.toggleLabel}>Show Grid</label>
              <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
            </div>
            <div className={styles.sliderContainer}>
              <label className={styles.sliderLabel}>Grid Size</label>
              <input
                type="range"
                min={20}
                max={80}
                step={5}
                value={gridSize}
                onChange={(e) => setGridSize(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
            {/* Color Picker */}
            <div className={styles.toolGroup}>
              <label className={styles.toolLabel}>Colors</label>
              {/* Ensure ColorPalette is visible and styled */}
              <ColorPalette value={color} onChange={setColor} />
            </div>
            {/* Actions */}
            <div className={styles.actionButtons}>
              <button
                onClick={undoLast}
                className={styles.btnSecondary}
                disabled={lines.length === 0 && dots.length === 0}
              >
                Undo Last
              </button>
              <button
                onClick={redo}
                className={styles.btnSecondary}
                disabled={redoStack.length === 0}
              >
                Redo
              </button>
              <button
                onClick={clearCanvas}
                className={styles.btnDanger}
              >
                Clear All
              </button>
              <div className={styles.exportButtons}>
                <button onClick={exportPNG} className={styles.btnPrimary}>Save PNG</button>
                <button onClick={exportSVG} className={styles.btnSecondary}>Save SVG</button>
              </div>
            </div>
            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.statItem}>Dots: {dots.length}</div>
              <div className={styles.statItem}>Lines: {lines.length}</div>
            </div>
          </div>
          {/* Canvas Area */}
          <div className={styles.canvasArea}>
            <div className={styles.canvasContainer}>
              <Stage
                width={size.width - 48}
                height={size.height}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                ref={stageRef}
                className={styles.canvasWrapper}
              >
                {/* Grid Layer */}
                <Layer>
                  {showGrid && (() => {
                    const gridLines = [];
                    // Vertical lines
                    for (let x = gridSize / 2; x < size.width - 48; x += gridSize) {
                      gridLines.push(
                        <Line
                          key={`grid-v-${x}`}
                          points={[x, 0, x, size.height]}
                          stroke="#bdbdbd"
                          strokeWidth={1}
                          opacity={0.3}
                        />
                      );
                    }
                    // Horizontal lines
                    for (let y = gridSize / 2; y < size.height; y += gridSize) {
                      gridLines.push(
                        <Line
                          key={`grid-h-${y}`}
                          points={[0, y, size.width - 48, y]}
                          stroke="#bdbdbd"
                          strokeWidth={1}
                          opacity={0.3}
                        />
                      );
                    }
                    return gridLines;
                  })()}
                </Layer>
                {/* Dots and Lines Layer */}
                <Layer>
                  {/* Draw user dots */}
                  {dots.map((d) => (
                    <Circle key={d.id} x={d.x} y={d.y} radius={6} fill="#7A2F2F" />
                  ))}
                  {/* Draw user lines with symmetry */}
                  {lines.map((l, idx) =>
                    mirroredPoints(l.points, symmetry).map((pts, i) => (
                      <Line
                        key={`line-${idx}-${i}`}
                        points={getTruncatedPoints(pts)}
                        stroke={l.color}
                        strokeWidth={3}
                        lineCap="round"
                        lineJoin="round"
                        tension={0.5}
                      />
                    ))
                  )}
                </Layer>
              </Stage>
            </div>
            <div className={styles.canvasFooter}>
              <p className={styles.canvasHint}>
                Every dot is a story, every line a tradition. Click to place dots; click and drag to draw.
              </p>
              <div className={styles.animationControls}>
                <button onClick={() => setIsAnimating(true)} className={styles.btnPrimary}>
                  Animate Drawing
                </button>
                {isAnimating && (
                  <span className={styles.animationProgress}>
                    Weaving patterns... {(progress * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Instructions */}
        <div className={styles.instructions}>
          <h3 className={styles.instructionsTitle}>Kolam Drawing Tips</h3>
          <div className={styles.instructionsGrid}>
            <div>
              <h4 className={styles.textInk}>Traditional Approach</h4>
              <ul className={styles.instructionList}>
                <li className={styles.instructionItem}>Start by placing dots in a grid pattern</li>
                <li className={styles.instructionItem}>Connect dots with smooth, flowing curves</li>
                <li className={styles.instructionItem}>Maintain symmetry and balance</li>
                <li className={styles.instructionItem}>Use geometric patterns as your foundation</li>
              </ul>
            </div>
            <div>
              <h4 className={styles.textInk}>Design Principles</h4>
              <ul className={styles.instructionList}>
                <li className={styles.instructionItem}>Create radial patterns from the center</li>
                <li className={styles.instructionItem}>Use repetition for visual harmony</li>
                <li className={styles.instructionItem}>Balance complexity with simplicity</li>
                <li className={styles.instructionItem}>Let your creativity flow naturally</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CanvasSection;