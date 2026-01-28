import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer } from 'reactflow'

export default function ConnectionEdge(props: EdgeProps) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    borderRadius: 8,
  })

  const label = props.label as string || ''
  const isDark = document.querySelector('.dark') !== null

  return (
    <>
      {/* Main connection line */}
      <path
        d={path}
        style={{
          fill: 'none',
          stroke: isDark ? '#a855f7' : '#9333ea',
          strokeWidth: 2,
          opacity: isDark ? 0.5 : 0.6,
        }}
      />

      {/* Connection label */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
              backgroundColor: isDark ? '#a855f7' : '#9333ea',
              color: '#ffffff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            }}
            className="
              px-2 py-0.5 rounded-md
              text-[9px] font-semibold
              whitespace-nowrap
            "
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
