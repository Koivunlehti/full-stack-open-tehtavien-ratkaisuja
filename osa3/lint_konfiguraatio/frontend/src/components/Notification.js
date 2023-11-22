
const Notification = ({ message, cssclass }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={cssclass}>
        {message}
      </div>
    )
  }

export default Notification