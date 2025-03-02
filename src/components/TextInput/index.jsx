import './styles.css'

export function TextInput({ onChange, value, placeholder }) {
  return (
    <input
      className="text-input"
      type="search"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  )
}
