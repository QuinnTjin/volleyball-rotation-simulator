import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { RotationSystem } from '../roster'

// The four systems from the mockup. 5-1, 4-2, and 6-2 are wired up to real
// rotation-building logic; 6-6 (every player rotates roles instead of
// holding a fixed position) is a different-enough model that it's still
// shown unavailable ("soon") and can't be picked.
const SYSTEM_PRESETS: { label: RotationSystem | '6-6'; desc: string; available: boolean }[] = [
  { label: '5-1', desc: '1 setter, 5 hitters', available: true },
  { label: '4-2', desc: '2 setters, front-row sets', available: true },
  { label: '6-2', desc: '2 setters, back-row sets', available: true },
  { label: '6-6', desc: 'everyone rotates roles', available: false },
]

// Per-system blurb shown in the info popover.
const SYSTEM_INFO: Record<RotationSystem, { desc: string; bullets: string[] }> = {
  '5-1': {
    desc: 'One setter runs the offense through all six rotations.',
    bullets: [
      'Needs on court: 1 setter, 2 outside hitters, 2 middle blockers, 1 opposite',
      'Setter sets from the back row in 3 of 6 rotations, leaving 3 front-row attackers',
      'Consistent offense — hitters always get sets from the same player',
      'Libero typically subs for the back-row middle blocker',
    ],
  },
  '4-2': {
    desc: 'Two setters opposite each other; the front-row setter sets.',
    bullets: [
      'Needs on court: 2 setters (placed opposite each other), 2 outside hitters, 2 middle blockers',
      'Setter is always front row — simplest system, common for beginners',
      'Only 2 front-row attackers in every rotation',
      'Libero typically subs for the back-row middle blocker',
    ],
  },
  '6-2': {
    desc: 'Two setters opposite each other; the back-row setter sets.',
    bullets: [
      'Needs on court: 2 setters (placed opposite each other), 2 outside hitters, 2 middle blockers',
      'Setter always sets from the back row — keeps 3 front-row attackers',
      'Setters must also hit or block when they rotate to the front row',
      'Libero typically subs for the back-row middle blocker',
    ],
  },
}

type OpenMenu = 'system' | 'info' | null

type AppHeaderProps = {
  systemLabel: RotationSystem
  onSelectSystem: (system: RotationSystem) => void
  warning?: string
}

function AppHeader({ systemLabel, onSelectSystem, warning }: AppHeaderProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close whichever popover is open when a click lands outside the menu
  // cluster.
  useEffect(() => {
    if (openMenu === null) {
      return
    }
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [openMenu])

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  return (
    <header className="flex items-center gap-2 border-b border-line bg-card px-3 py-4 sm:gap-3.5 sm:px-5 lg:px-7">
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
        V
      </div>
      <div className="text-base font-bold tracking-[-0.2px]">VolleyVisuals</div>

      <div ref={menuRef} className="flex items-center gap-3.5">
        <div className="relative">
          <div
            onClick={() => toggleMenu('system')}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-chip px-3.5 py-2 text-[13px] font-semibold hover:bg-chip-hover"
          >
            {systemLabel} System <span className="text-muted">▾</span>
          </div>
          {openMenu === 'system' && (
            <div className="fixed inset-x-3 top-[60px] z-[60] flex flex-col gap-0.5 rounded-[10px] border border-line bg-card p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:absolute sm:inset-x-auto sm:left-0 sm:top-[42px] sm:w-[230px]">
              <div className="px-2.5 pb-1 pt-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted">
                Presets
              </div>
              {SYSTEM_PRESETS.map((preset) => (
                <div
                  key={preset.label}
                  title={preset.available ? undefined : 'Coming soon'}
                  onClick={() => {
                    if (preset.available) {
                      onSelectSystem(preset.label as RotationSystem)
                      setOpenMenu(null)
                    }
                  }}
                  className={clsx(
                    'flex flex-col gap-0.5 rounded-[7px] px-2.5 py-2',
                    preset.available ? 'cursor-pointer hover:bg-chip' : 'cursor-not-allowed opacity-45',
                    preset.label === systemLabel && 'bg-brand-soft',
                  )}
                >
                  <span className="text-[13px] font-bold">
                    {preset.label}
                    {!preset.available && ' · soon'}
                  </span>
                  <span className="text-[11.5px] text-muted">{preset.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div
            onClick={() => toggleMenu('info')}
            className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full bg-chip font-serif text-[12.5px] font-bold italic text-muted hover:bg-brand-soft hover:text-brand"
          >
            i
          </div>
          {openMenu === 'info' && (
            <div className="fixed inset-x-3 top-[60px] z-[60] flex flex-col gap-2 rounded-[10px] border border-line bg-card p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:absolute sm:inset-x-auto sm:left-[-110px] sm:top-9 sm:w-[280px]">
              <span className="text-[13px] font-bold">{systemLabel} System</span>
              <span className="text-[12px] leading-relaxed text-ash">{SYSTEM_INFO[systemLabel].desc}</span>
              <div className="flex flex-col gap-1.5">
                {SYSTEM_INFO[systemLabel].bullets.map((text) => (
                  <div key={text} className="flex gap-2 text-[12px] leading-snug text-ink2">
                    <span className="flex-none text-brand">•</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {warning && (
        <span className="rounded-[20px] bg-warn-bg px-3 py-1.5 text-[12px] font-semibold text-warn-ink">
          ⚠ {warning}
        </span>
      )}

      <div className="flex-1" />
    </header>
  )
}

export default AppHeader
