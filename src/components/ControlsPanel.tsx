import clsx from 'clsx'
import Toggle from './Toggle'
import { ROTATION_COUNT } from '../rotations'
import type { Phase } from '../phases'

export type CourtView = {
  grid: boolean
  numbers: boolean
}

const SPEED_PRESETS = ['0.5×', '1×', '2×']

type ControlsPanelProps = {
  rotationIndex: number
  onSelectRotation: (rotationIndex: number) => void
  phases: Phase[]
  phaseIndex: number
  onSelectPhase: (phaseIndex: number) => void
  disabled: boolean
  view: CourtView
  onToggleView: (key: keyof CourtView) => void
}

function ControlsPanel({
  rotationIndex,
  onSelectRotation,
  phases,
  phaseIndex,
  onSelectPhase,
  disabled,
  view,
  onToggleView,
}: ControlsPanelProps) {
  function step(delta: number) {
    if (disabled) {
      return
    }
    onSelectRotation((rotationIndex + delta + ROTATION_COUNT) % ROTATION_COUNT)
  }

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-card p-3.5">
        {/* Playback — deferred, rendered in the mockup's disabled styling. */}
        <div className="flex items-center gap-2.5" title="Playback — coming soon">
          <span className="flex h-[34px] w-[34px] flex-none cursor-not-allowed items-center justify-center rounded-full bg-[#c9cad1] text-[12px] text-white">
            ▶
          </span>
          <div className="flex gap-[3px] text-[11px] font-bold">
            {SPEED_PRESETS.map((label, index) => (
              <span
                key={label}
                className={clsx(
                  'cursor-not-allowed rounded-[5px] px-2.5 py-1',
                  index === 1 ? 'bg-brand text-white' : 'bg-chip text-muted',
                )}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Rotation stepper — wired to the real 5-1 rotations. */}
        <div className="flex items-center gap-1.5 text-[12px] font-semibold text-ash">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={disabled}
            aria-label="Previous rotation"
            className={clsx(
              'flex min-h-11 min-w-11 items-center justify-center lg:min-h-0 lg:min-w-0 lg:px-1.5 lg:py-0.5',
              disabled ? 'cursor-default text-[#c9cad1]' : 'cursor-pointer hover:opacity-75 active:opacity-50',
            )}
          >
            ‹
          </button>
          <div className="flex flex-1 justify-center gap-[3px]">
            {Array.from({ length: ROTATION_COUNT }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSelectRotation(index)}
                disabled={disabled}
                aria-label={`Rotation ${index + 1}`}
                aria-pressed={index === rotationIndex}
                className={clsx(
                  'flex h-11 flex-1 items-center justify-center rounded-md lg:h-6 lg:w-6 lg:flex-none',
                  disabled
                    ? 'cursor-default bg-chip text-[#c9cad1]'
                    : index === rotationIndex
                      ? 'cursor-pointer bg-brand text-white active:opacity-80'
                      : 'cursor-pointer bg-chip text-ash active:opacity-80',
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={disabled}
            aria-label="Next rotation"
            className={clsx(
              'flex min-h-11 min-w-11 items-center justify-center lg:min-h-0 lg:min-w-0 lg:px-1.5 lg:py-0.5',
              disabled ? 'cursor-default text-[#c9cad1]' : 'cursor-pointer hover:opacity-75 active:opacity-50',
            )}
          >
            ›
          </button>
        </div>

        <div className="h-px bg-line" />

        {/* Phase list — clicking moves the on-court dots to that phase's
            conventional position. Auto-play between phases is deferred. */}
        <div className="flex flex-col gap-0.5 text-[12.5px]">
          {phases.map((phase, index) => (
            <button
              key={phase.key}
              type="button"
              onClick={() => onSelectPhase(index)}
              disabled={disabled}
              aria-pressed={index === phaseIndex}
              className={clsx(
                'flex min-h-11 w-full items-center gap-2.5 rounded-[7px] px-2 py-1.5 text-left lg:min-h-0',
                disabled
                  ? 'cursor-default text-[#c9cad1]'
                  : index === phaseIndex
                    ? 'cursor-pointer bg-brand text-white'
                    : 'cursor-pointer text-ash hover:bg-chip active:bg-chip',
              )}
            >
              <span
                className={clsx(
                  'h-[5px] w-[26px] flex-none rounded-[3px]',
                  !disabled && index === phaseIndex ? 'bg-white' : 'bg-[#eeeeea]',
                )}
              />
              {phase.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-card p-3.5 text-[13px]">
        <span className="text-[13px] font-bold">Court view</span>
        <div className="flex items-center justify-between">
          <span>Zone grid</span>
          <Toggle on={view.grid} onClick={() => onToggleView('grid')} />
        </div>
        <div className="flex items-center justify-between">
          <span>Zone numbers</span>
          <Toggle on={view.numbers} onClick={() => onToggleView('numbers')} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Ball marker</span>
          <Toggle on={false} disabled />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Full court</span>
          <Toggle on={false} disabled />
        </div>
      </div>
    </div>
  )
}

export default ControlsPanel
