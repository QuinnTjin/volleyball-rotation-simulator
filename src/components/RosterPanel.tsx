import clsx from 'clsx'
import Toggle from './Toggle'
import { COLOR_PALETTE, getPositionLabel, POSITION_OPTIONS } from '../roster'
import type { PositionKey, RosterPlayer } from '../roster'

// One roster line: the player plus the zone chip shown on the right ("Z3",
// "L sub", "—"). App computes the chip from the current rotation.
export type RosterRow = {
  player: RosterPlayer
  chip: string
}

type RosterPanelProps = {
  roster: RosterPlayer[]
  onCourtRows: RosterRow[]
  offCourtRows: RosterRow[]
  selectedPlayerId: string | null
  onSelectPlayer: (playerId: string) => void
  onUpdatePlayer: (
    playerId: string,
    changes: Partial<Pick<RosterPlayer, 'name' | 'position' | 'color' | 'isStarter'>>,
  ) => void
  onRequestRemove: (playerId: string) => void
  onAddPlayer: () => void
  canAddPlayer: boolean
}

type PlayerRowProps = {
  row: RosterRow
  roster: RosterPlayer[]
  offCourt: boolean
  selected: boolean
  onSelect: () => void
  onUpdatePlayer: RosterPanelProps['onUpdatePlayer']
  onRequestRemove: () => void
}

function PlayerRow({
  row,
  roster,
  offCourt,
  selected,
  onSelect,
  onUpdatePlayer,
  onRequestRemove,
}: PlayerRowProps) {
  const { player, chip } = row

  return (
    <div className="flex flex-col">
      <div
        onClick={onSelect}
        className={clsx(
          'flex cursor-pointer items-center gap-2.5 rounded-lg p-2 hover:bg-page',
          offCourt && 'opacity-75 hover:opacity-100',
          selected && 'bg-page',
        )}
      >
        <span
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: player.color }}
        >
          {getPositionLabel(player, roster)}
        </span>
        <span className="flex-1 truncate text-[13.5px] font-semibold">{player.name}</span>
        <span
          className={clsx(
            'text-[10.5px] font-bold',
            offCourt
              ? 'text-muted'
              : 'rounded-[5px] bg-brand-soft px-[7px] py-0.5 text-brand',
          )}
        >
          {chip}
        </span>
      </div>

      {selected && (
        <div className="mt-1 flex flex-col gap-2 rounded-[10px] border-[1.5px] border-brand bg-[#fbfbff] p-2.5">
          <div className="text-[11px] text-muted">NAME</div>
          <input
            type="text"
            value={player.name}
            onChange={(event) => onUpdatePlayer(player.id, { name: event.target.value })}
            className="box-border w-full rounded-md border border-line bg-card px-2 py-1.5 text-[13px] outline-none"
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <div className="mb-1 text-[11px] text-muted">POSITION</div>
              <select
                value={player.position}
                onChange={(event) =>
                  onUpdatePlayer(player.id, { position: event.target.value as PositionKey })
                }
                className="w-full rounded-md border border-line bg-card px-1 py-1.5 text-[12.5px]"
              >
                {POSITION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-1 text-[11px] text-muted">ON COURT</div>
              <div className="mt-[5px]">
                <Toggle
                  on={player.isStarter}
                  onClick={() => onUpdatePlayer(player.id, { isStarter: !player.isStarter })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-1.5">
            {COLOR_PALETTE.map((color) => (
              <span
                key={color}
                onClick={() => onUpdatePlayer(player.id, { color })}
                className="h-[18px] w-[18px] cursor-pointer rounded-full"
                style={{
                  background: color,
                  outline: color === player.color ? '2px solid #1d1e24' : 'none',
                  outlineOffset: '1px',
                }}
              />
            ))}
          </div>

          <div
            onClick={onRequestRemove}
            className="mt-0.5 cursor-pointer rounded-[7px] border border-[#f0d7d3] p-[7px] text-center text-[12px] font-semibold text-danger hover:bg-[#fdf3f1]"
          >
            Remove from roster
          </div>
        </div>
      )}
    </div>
  )
}

function RosterPanel({
  roster,
  onCourtRows,
  offCourtRows,
  selectedPlayerId,
  onSelectPlayer,
  onUpdatePlayer,
  onRequestRemove,
  onAddPlayer,
  canAddPlayer,
}: RosterPanelProps) {
  function renderRow(row: RosterRow, offCourt: boolean) {
    return (
      <PlayerRow
        key={row.player.id}
        row={row}
        roster={roster}
        offCourt={offCourt}
        selected={row.player.id === selectedPlayerId}
        onSelect={() => onSelectPlayer(row.player.id)}
        onUpdatePlayer={onUpdatePlayer}
        onRequestRemove={() => onRequestRemove(row.player.id)}
      />
    )
  }

  return (
    <div className="flex w-[250px] flex-none flex-col gap-1.5 rounded-xl border border-line bg-card p-3.5">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">On court</span>
        <span className="text-[11.5px] text-muted">{onCourtRows.length}</span>
      </div>
      {onCourtRows.map((row) => renderRow(row, false))}

      <div className="my-1.5 h-px bg-line" />
      <div className="my-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">Off court</div>
      {offCourtRows.map((row) => renderRow(row, true))}

      {/* Hiding the add player button until Team Owner functionality is added */}
      {/* <button
        type="button"
        onClick={onAddPlayer}
        disabled={!canAddPlayer}
        className="mt-1.5 cursor-pointer rounded-lg border border-line bg-transparent px-3 py-2 text-[12.5px] font-semibold text-ash hover:bg-page disabled:cursor-not-allowed disabled:opacity-50"
      >
        + Add player
      </button> */}
    </div>
  )
}

export default RosterPanel
