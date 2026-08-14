import PlayerDot from './PlayerDot'
import { ROTATION_COUNT } from '../rotations'
import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX, legacyMockupPixelsToMeters, metersToPixels } from '../court-geometry'

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

// Chrome landmarks, all derived from the coordinate space so this file
// never invents a pixel number that isn't traceable to a meter position.
const NET = metersToPixels({ x: -4.5, y: 0 })
const NET_RIGHT = metersToPixels({ x: 4.5, y: 0 })
const ATTACK_LINE_LEFT = metersToPixels({ x: -4.5, y: 3 })
const ATTACK_LINE_RIGHT = metersToPixels({ x: 4.5, y: 3 })
const COURT_TOP_LEFT = metersToPixels({ x: -4.5, y: 0 })
const COURT_BOTTOM_RIGHT = metersToPixels({ x: 4.5, y: 9 })
const SERVICE_ZONE_BOTTOM_RIGHT = metersToPixels({ x: 4.5, y: 12 })
const GRID_COLUMN_LEFT_X = metersToPixels({ x: -1.5, y: 0 }).x
const GRID_COLUMN_RIGHT_X = metersToPixels({ x: 1.5, y: 0 }).x
const GRID_ROW_Y = metersToPixels({ x: 0, y: 4.5 }).y

// Zone-number labels reuse the mockup's original label positions (in its
// legacy 400x400 pixel space), carried into the new canvas through the same
// two-step conversion Base Zone uses - see court-geometry.ts.
const ZONE_LABELS = [
  { zone: 4, legacyPx: { x: 30, y: 40 } },
  { zone: 3, legacyPx: { x: 196, y: 40 } },
  { zone: 2, legacyPx: { x: 356, y: 40 } },
  { zone: 5, legacyPx: { x: 30, y: 226 } },
  { zone: 6, legacyPx: { x: 196, y: 226 } },
  { zone: 1, legacyPx: { x: 356, y: 226 } },
].map(({ zone, legacyPx }) => ({ zone, ...metersToPixels(legacyMockupPixelsToMeters(legacyPx)) }))

// The court card. The court itself is an SVG (free-zone background, service
// zone, boundary, net, attack line, optional zone grid + numbers); the
// player dots are HTML <div>s layered on top so they can animate between
// positions. The canvas is larger than the court so off-court positions
// (e.g. a server behind the endline) have visible room to render instead of
// being clipped - see CANVAS_WIDTH_PX/CANVAS_HEIGHT_PX.
function Court({ dots, rotationNumber, gridVisible, numbersVisible, invalid, warning, onSelectDot }: CourtProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-[14px] border border-line bg-card p-5">
      <div className="relative" style={{ width: CANVAS_WIDTH_PX, height: CANVAS_HEIGHT_PX }}>
        <svg
          width={CANVAS_WIDTH_PX}
          height={CANVAS_HEIGHT_PX}
          viewBox={`0 0 ${CANVAS_WIDTH_PX} ${CANVAS_HEIGHT_PX}`}
          className="absolute left-0 top-0"
        >
          {/* Free zone: the whole canvas behind everything else. */}
          <rect x={0} y={0} width={CANVAS_WIDTH_PX} height={CANVAS_HEIGHT_PX} rx={8} fill="#f4f5fb" />

          {/* Service zone: a subtly distinct band behind the endline so an
              off-court server dot reads as intentional, not clipped. */}
          <rect
            x={COURT_TOP_LEFT.x}
            y={COURT_BOTTOM_RIGHT.y}
            width={COURT_BOTTOM_RIGHT.x - COURT_TOP_LEFT.x}
            height={SERVICE_ZONE_BOTTOM_RIGHT.y - COURT_BOTTOM_RIGHT.y}
            fill="#dfe2f5"
          />

          {/* The court itself. */}
          <rect
            x={COURT_TOP_LEFT.x}
            y={COURT_TOP_LEFT.y}
            width={COURT_BOTTOM_RIGHT.x - COURT_TOP_LEFT.x}
            height={COURT_BOTTOM_RIGHT.y - COURT_TOP_LEFT.y}
            fill="#eef0ff"
          />
          <rect
            x={COURT_TOP_LEFT.x}
            y={COURT_TOP_LEFT.y}
            width={COURT_BOTTOM_RIGHT.x - COURT_TOP_LEFT.x}
            height={COURT_BOTTOM_RIGHT.y - COURT_TOP_LEFT.y}
            fill="none"
            stroke="#4b53c4"
            strokeWidth={2}
            opacity={0.8}
          />

          {/* Net runs along the top edge; attack line 3m in from it. */}
          <line x1={NET.x} y1={NET.y} x2={NET_RIGHT.x} y2={NET_RIGHT.y} stroke="#1d1e24" strokeWidth={5} />
          <line
            x1={ATTACK_LINE_LEFT.x}
            y1={ATTACK_LINE_LEFT.y}
            x2={ATTACK_LINE_RIGHT.x}
            y2={ATTACK_LINE_RIGHT.y}
            stroke="#4b53c4"
            strokeWidth={2}
          />

          <g opacity={gridVisible ? 0.35 : 0}>
            <line
              x1={GRID_COLUMN_LEFT_X}
              y1={COURT_TOP_LEFT.y}
              x2={GRID_COLUMN_LEFT_X}
              y2={COURT_BOTTOM_RIGHT.y}
              stroke="#4b53c4"
              strokeWidth={1}
              strokeDasharray="5 5"
            />
            <line
              x1={GRID_COLUMN_RIGHT_X}
              y1={COURT_TOP_LEFT.y}
              x2={GRID_COLUMN_RIGHT_X}
              y2={COURT_BOTTOM_RIGHT.y}
              stroke="#4b53c4"
              strokeWidth={1}
              strokeDasharray="5 5"
            />
            <line
              x1={COURT_TOP_LEFT.x}
              y1={GRID_ROW_Y}
              x2={COURT_BOTTOM_RIGHT.x}
              y2={GRID_ROW_Y}
              stroke="#4b53c4"
              strokeWidth={1}
              strokeDasharray="5 5"
            />
          </g>

          <g opacity={numbersVisible ? 0.45 : 0} fill="#4b53c4" fontSize={15} fontWeight={700} fontFamily="Helvetica, sans-serif">
            {ZONE_LABELS.map(({ zone, x, y }) => (
              <text key={zone} x={x} y={y}>
                {zone}
              </text>
            ))}
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
