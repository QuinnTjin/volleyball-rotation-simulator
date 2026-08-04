import PlayerDot from './PlayerDot'
import { ROTATION_COUNT } from '../rotations'

export type CourtDot = {
  id: string
  x: number
  y: number
  color: string
  short: string
  name: string
  selected: boolean
}

type CourtProps = {
  dots: CourtDot[]
  rotationNumber: number
  gridVisible: boolean
  numbersVisible: boolean
  invalid: boolean
  warning?: string
  onSelectDot: (playerId: string) => void
}

// The 400x400 court card. The court itself is an SVG (background, boundary,
// net, attack line, optional zone grid + numbers); the player dots are HTML
// <div>s layered on top so they can animate between positions.
function Court({ dots, rotationNumber, gridVisible, numbersVisible, invalid, warning, onSelectDot }: CourtProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-[14px] border border-line bg-card p-5">
      <div className="relative h-[400px] w-[400px]">
        <svg width={400} height={400} viewBox="0 0 400 400" className="absolute left-0 top-0">
          <rect x={0} y={0} width={400} height={400} rx={8} fill="#eef0ff" />
          <rect x={14} y={14} width={372} height={372} fill="none" stroke="#4b53c4" strokeWidth={2} opacity={0.8} />
          {/* Net runs along the top edge; attack line 3m in from it. */}
          <line x1={14} y1={14} x2={386} y2={14} stroke="#1d1e24" strokeWidth={5} />
          <line x1={14} y1={138} x2={386} y2={138} stroke="#4b53c4" strokeWidth={2} />

          <g opacity={gridVisible ? 0.35 : 0}>
            <line x1={138} y1={14} x2={138} y2={386} stroke="#4b53c4" strokeWidth={1} strokeDasharray="5 5" />
            <line x1={262} y1={14} x2={262} y2={386} stroke="#4b53c4" strokeWidth={1} strokeDasharray="5 5" />
            <line x1={14} y1={200} x2={386} y2={200} stroke="#4b53c4" strokeWidth={1} strokeDasharray="5 5" />
          </g>

          <g opacity={numbersVisible ? 0.45 : 0} fill="#4b53c4" fontSize={15} fontWeight={700} fontFamily="Helvetica, sans-serif">
            <text x={30} y={40}>4</text>
            <text x={196} y={40}>3</text>
            <text x={356} y={40}>2</text>
            <text x={30} y={226}>5</text>
            <text x={196} y={226}>6</text>
            <text x={356} y={226}>1</text>
          </g>
        </svg>

        {dots.map((dot) => (
          <PlayerDot
            key={dot.id}
            x={dot.x}
            y={dot.y}
            color={dot.color}
            short={dot.short}
            name={dot.name}
            selected={dot.selected}
            onClick={() => onSelectDot(dot.id)}
          />
        ))}

        {invalid && (
          <div className="absolute inset-[14px] z-30 flex flex-col items-center justify-center gap-2 px-[34px] text-center">
            <span className="text-[14px] font-bold text-brand">Court cleared</span>
            <span className="text-[12.5px] leading-relaxed text-ash">{warning}</span>
          </div>
        )}
      </div>

      <div className="text-center text-[12px] font-semibold text-muted">
        Rotation {rotationNumber} of {ROTATION_COUNT}
      </div>
    </div>
  )
}

export default Court
