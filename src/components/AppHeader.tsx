import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

// The four systems from the mockup. Only 5-1 is wired up today; the rest are
// shown in the dropdown but marked unavailable ("soon") and can't be picked.
const SYSTEM_PRESETS = [
  { label: '5-1', desc: '1 setter, 5 hitters', available: true },
  { label: '4-2', desc: '2 setters, front-row sets', available: false },
  { label: '6-2', desc: '2 setters, back-row sets', available: false },
  { label: '6-6', desc: 'everyone rotates roles', available: false },
]

const SYSTEM_INFO = {
  title: '5-1 System',
  desc: 'One setter runs the offense through all six rotations.',
  bullets: [
    'Needs on court: 1 setter, 2 outside hitters, 2 middle blockers, 1 opposite',
    'Setter sets from the back row in 3 of 6 rotations, leaving 3 front-row attackers',
    'Consistent offense — hitters always get sets from the same player',
    'Libero typically subs for the back-row middle blocker',
  ],
}

type OpenMenu = 'system' | 'info' | null

type AppHeaderProps = {
  systemLabel: string
  warning?: string
}

function AppHeader({ systemLabel, warning }: AppHeaderProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close whichever popover is open when a click lands outside the menu
  // cluster (including on the Receive/Serve toggle beside it).
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
    <header className="flex items-center gap-3.5 border-b border-line bg-card px-7 py-4">
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
        R
      </div>
      <div className="text-base font-bold tracking-[-0.2px]">Rotations</div>

      <div ref={menuRef} className="flex items-center gap-3.5">
        <div className="relative">
          <div
            onClick={() => toggleMenu('system')}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-chip px-3.5 py-2 text-[13px] font-semibold hover:bg-chip-hover"
          >
            {systemLabel} System <span className="text-muted">▾</span>
          </div>
          {openMenu === 'system' && (
            <div className="absolute left-0 top-[42px] z-[60] flex w-[230px] flex-col gap-0.5 rounded-[10px] border border-line bg-card p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <div className="px-2.5 pb-1 pt-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted">
                Presets
              </div>
              {SYSTEM_PRESETS.map((preset) => (
                <div
                  key={preset.label}
                  title={preset.available ? undefined : 'Coming soon'}
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
            <div className="absolute left-[-110px] top-9 z-[60] flex w-[280px] flex-col gap-2 rounded-[10px] border border-line bg-card p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <span className="text-[13px] font-bold">{SYSTEM_INFO.title}</span>
              <span className="text-[12px] leading-relaxed text-ash">{SYSTEM_INFO.desc}</span>
              <div className="flex flex-col gap-1.5">
                {SYSTEM_INFO.bullets.map((text) => (
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

      <div className="flex rounded-lg bg-chip p-[3px] text-[12.5px] font-semibold">
        <div className="rounded-md bg-card px-3.5 py-1.5 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
          Receive
        </div>
        <div
          title="Coming soon"
          className="cursor-not-allowed rounded-md px-3.5 py-1.5 text-muted"
        >
          Serve
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
