
interface PopupProps {
  message: string
  type?: 'success' | 'error'
}

const Popup = ({ message, type = 'success' }: PopupProps) => {
  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow-md transition-all duration-300 ${
        type === 'success'
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      {message}
    </div>
  )
}

export default Popup
