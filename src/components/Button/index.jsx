import './styles.css'

export function Button({ text, onClick, disabled }) {
  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
