import clsx from 'clsx'

type ToggleProps = {
  on: boolean
  disabled?: boolean
  onClick?: () => void
}

// The little sliding on/off pill used by both the roster editor ("ON COURT")
// and the court-view options. The knob position is inline because it's a
// computed pixel value the CSS transition animates.
function Toggle({ on, disabled = false, onClick }: ToggleProps) {
  return (
    <span
      role="switch"
      aria-checked={on}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'relative inline-block h-[19px] w-[34px] shrink-0 rounded-[10px]',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      )}
      style={{ background: on ? '#4b53c4' : '#d4d4cf' }}
    >
      <span
        className="absolute top-0.5 h-[15px] w-[15px] rounded-full bg-white"
        style={{ left: on ? '17px' : '2px', transition: 'left .15s' }}
      />
    </span>
  )
}

export default Toggle
