import "../css/SubmitButton.css"

function SubmitButton({onClick}) {
    
    return (
      <button className="submit-button" onClick={onClick}>Submit</button>
    );
  }

export default SubmitButton;
