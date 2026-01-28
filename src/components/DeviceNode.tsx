import { Handle, Position, NodeProps } from 'reactflow'
import { Device } from '../types'

const nodeStyles: Record<string, string> = {
  // Computing devices (Blue)
  'laptop': 'bg-[#3a539b]',
  'desktop': 'bg-[#3a539b]',
  'pc': 'bg-[#3a539b]',
  'macbook': 'bg-[#3a539b]',

  // Infrastructure/Hubs (Teal)
  'usb-hub': 'bg-[#2d7a7a]',
  'dock': 'bg-[#2d7a7a]',
  'switcher': 'bg-[#2d7a7a]',
  'monitor': 'bg-[#2d7a7a]',
  'dac': 'bg-[#2d7a7a]',
  'power-adapter': 'bg-[#2d7a7a]',

  // Peripherals (Gold/Ochre)
  'keyboard': 'bg-[#d4a574]',
  'mouse': 'bg-[#d4a574]',
  'trackpad': 'bg-[#d4a574]',
  'camera': 'bg-[#d4a574]',
  'microphone': 'bg-[#d4a574]',
  'speaker': 'bg-[#d4a574]',
  'headset': 'bg-[#d4a574]',
  'storage': 'bg-[#d4a574]',
  'webcam': 'bg-[#d4a574]',
  'stream-deck': 'bg-[#d4a574]',
  'ssd': 'bg-[#d4a574]',
  'controller': 'bg-[#d4a574]',
  'chromecast': 'bg-[#d4a574]',
  'numeric-keypad': 'bg-[#d4a574]',
}

const getNodeColor = (type: string) => {
  return nodeStyles[type] || nodeStyles['laptop']
}

export default function DeviceNode({ data }: NodeProps<Device>) {
  const bgColor = getNodeColor(data.type)
  const isDark = document.querySelector('.dark') !== null

  return (
    <div
      className={`
        relative px-4 py-2.5 rounded-lg border-2
        min-w-[140px] max-w-[180px]
        shadow-lg
        hover:shadow-xl
        transition-shadow duration-200
        text-center
      `}
      style={{
        backgroundColor: isDark ? bgColor : '#ffffff',
        borderColor: isDark ? '#ffffff' : '#e2e8f0',
      }}
    >
      {/* Title (bold) */}
      <div className="text-xs font-semibold mb-0.5 leading-tight tracking-tight" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
        {data.name}
      </div>

      {/* Subtitle (smaller, regular weight) */}
      <div className="text-[10px] opacity-90 leading-tight" style={{ color: isDark ? '#ffffff' : '#64748b' }}>
        {data.type.replace('-', ' ').replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </div>

      {/* Connection handles on all 4 sides with IDs */}
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className="!opacity-0 !bg-transparent !border-none !w-2 !h-2"
      />
    </div>
  )
}
