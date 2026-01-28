import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
  BackgroundVariant,
  ConnectionMode,
  EdgeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import DeviceNode from './DeviceNode'
import ConnectionEdge from './ConnectionEdge'
import { Device, DiagramData } from '../types'

const nodeTypes = {
  device: DeviceNode,
}

const edgeTypes = {
  connection: ConnectionEdge,
}

// Clear React Flow localStorage on mount to reset positions
const clearFlowStorage = () => {
  try {
    // React Flow stores state with these keys
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('reactflow__')) {
        localStorage.removeItem(key)
      }
    })
  } catch (e) {
    // Ignore errors
  }
}

// Manual layout based on reference screenshot positions
const createNodes = (data: DiagramData): Node<Device>[] => {
  const nodes: Node<Device>[] = []

  // 3-COLUMN LAYOUT from your reference
  const positions: Record<string, { x: number; y: number }> = {
    // COLUMN 1 (LEFT) - x: 50
    'doio-16-keys': { x: 50, y: 50 },          // Top
    'baseus-hub': { x: 50, y: 180 },           // Middle-top
    'personal-laptop': { x: 50, y: 310 },      // Middle ← SAME ROW as monitors
    'magic-trackpad': { x: 50, y: 570 },       // Bottom ← LAST ROW (no devices below)

    // COLUMN 2 (CENTER) - x: 400
    'logitech-brio': { x: 400, y: 50 },        // Top
    'samsung-monitor': { x: 400, y: 310 },     // Center ← SAME ROW as laptop
    'ergodox-ez': { x: 320, y: 570 },          // Bottom-left ← LAST ROW (child of Samsung, NOT overlapping)
    'yeti-mic': { x: 480, y: 570 },            // Bottom-right ← LAST ROW (child of Samsung, NOT overlapping)

    // COLUMN 3 (RIGHT) - split into sub-columns
    'nintendo-switch': { x: 700, y: 50 },      // Top-left
    'chromecast': { x: 850, y: 50 },           // Top-right
    'ugreen-switcher': { x: 775, y: 180 },     // Middle (centered)
    'aoc-monitor': { x: 775, y: 310 },         // ← SAME ROW as laptop & Samsung (centered)
  }

  data.devices.forEach((device: Device) => {
    const pos = positions[device.id] || { x: 100, y: 100 }
    nodes.push({
      id: device.id,
      type: 'device',
      position: pos,
      data: device,
    })
  })

  return nodes
}

// Helper function to determine best handle based on relative positions
const getBestHandle = (
  sourceId: string,
  targetId: string,
  nodes: Node<Device>[]
): { sourceHandle: string | null; targetHandle: string | null } => {
  const sourceNode = nodes.find(n => n.id === sourceId)
  const targetNode = nodes.find(n => n.id === targetId)

  if (!sourceNode || !targetNode) {
    return { sourceHandle: null, targetHandle: null }
  }

  const dx = targetNode.position.x - sourceNode.position.x
  const dy = targetNode.position.y - sourceNode.position.y

  // Determine best handles based on relative position
  let sourceHandle = null
  let targetHandle = null

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal connection
    if (dx > 0) {
      sourceHandle = 'right'
      targetHandle = 'left'
    } else {
      sourceHandle = 'left'
      targetHandle = 'right'
    }
  } else {
    // Vertical connection
    if (dy > 0) {
      sourceHandle = 'bottom'
      targetHandle = 'top'
    } else {
      sourceHandle = 'top'
      targetHandle = 'bottom'
    }
  }

  return { sourceHandle, targetHandle }
}

// Create edges from device connections with smart handle selection
const createEdges = (data: DiagramData): Edge[] => {
  const edges: Edge[] = []
  const nodes = createNodes(data)

  data.devices.forEach((device: Device) => {
    device.connections.forEach((conn) => {
      let sourceHandle: string | null = null
      let targetHandle: string | null = null

      // Special case 1: UGREEN to AOC - force BOTTOM to TOP
      if (device.id === 'ugreen-switcher' && conn.targetId === 'aoc-monitor') {
        sourceHandle = 'bottom'
        targetHandle = 'top'
      }
      // Special case 2: UGREEN to Nintendo Switch - force TOP to BOTTOM
      else if (device.id === 'ugreen-switcher' && conn.targetId === 'nintendo-switch') {
        sourceHandle = 'top'
        targetHandle = 'bottom'
      }
      // Special case 3: UGREEN to Chromecast - force TOP to BOTTOM
      else if (device.id === 'ugreen-switcher' && conn.targetId === 'chromecast') {
        sourceHandle = 'top'
        targetHandle = 'bottom'
      }
      // Use smart routing for all other connections
      else {
        const handles = getBestHandle(device.id, conn.targetId, nodes)
        sourceHandle = handles.sourceHandle
        targetHandle = handles.targetHandle
      }

      edges.push({
        id: `${device.id}-${conn.targetId}`,
        source: device.id,
        target: conn.targetId,
        sourceHandle,
        targetHandle,
        type: 'connection',
        label: conn.type,
        animated: false,
        style: { stroke: '#a855f7', strokeWidth: 2.5 },
        data: { label: conn.type },
      })
    })
  })

  return edges
}

interface WorkstationCanvasProps {
  theme: 'light' | 'dark'
  showGrid: boolean
  diagramData: any
}

export default function WorkstationCanvas({ theme, showGrid, diagramData }: WorkstationCanvasProps) {
  const [renderKey, setRenderKey] = useState(0)
  const [nodes, setNodes] = useState<Node<Device>[]>(createNodes(diagramData))
  const [edges, setEdges] = useState<Edge[]>(createEdges(diagramData))

  // Force re-render when theme changes
  useEffect(() => {
    setRenderKey(prev => prev + 1)
    clearFlowStorage()
    const initialNodes = createNodes(diagramData)
    const initialEdges = createEdges(diagramData)
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [theme, diagramData])

  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds) as Node<Device>[])
  }, [])

  const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => [...eds, { ...params, type: 'connection' } as Edge]),
    []
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        key={renderKey}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: 'connection',
          animated: false,
        }}
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color={theme === 'dark' ? '#ffffff22' : '#00000011'}
          />
        )}
      </ReactFlow>
    </div>
  )
}
