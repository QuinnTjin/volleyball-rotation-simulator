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
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex min-h-11 min-w-11 shrink-0 items-center justify-center lg:min-h-0 lg:min-w-0',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer active:opacity-80',
      )}
    >
      <span
        className={clsx('relative block h-[19px] w-[34px] rounded-[10px]', disabled && 'opacity-60')}
        style={{ background: on ? '#4b53c4' : '#d4d4cf' }}
      >
        <span
          className="absolute top-0.5 h-[15px] w-[15px] rounded-full bg-white"
          style={{ left: on ? '17px' : '2px', transition: 'left .15s' }}
        />
      </span>
    </button>
  )
}

export default Toggle
