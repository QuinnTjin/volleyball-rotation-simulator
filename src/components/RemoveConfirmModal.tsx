type RemoveConfirmModalProps = {
  playerName: string
  systemLabel: string
  onCancel: () => void
  onConfirm: () => void
}

// Confirmation dialog for removing a player. The backdrop click cancels; the
// inner card stops propagation so clicking inside it doesn't dismiss.
function RemoveConfirmModal({ playerName, systemLabel, onCancel, onConfirm }: RemoveConfirmModalProps) {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(29,30,36,0.45)]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-80 flex-col gap-2.5 rounded-[14px] bg-card p-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <span className="text-[15px] font-bold">Remove {playerName}?</span>
        <span className="text-[13px] leading-normal text-ash">
          They will be removed from the roster entirely. This can affect your {systemLabel} lineup
          requirements.
        </span>
        <div className="mt-1.5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg bg-chip px-4 py-2 text-[13px] font-semibold hover:bg-chip-hover"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-lg bg-danger px-4 py-2 text-[13px] font-semibold text-white hover:bg-danger-dark"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveConfirmModal
