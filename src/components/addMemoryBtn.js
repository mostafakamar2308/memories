import photo from "../images/add-memory.png";
export function AddMemoryBtn(props) {
  return (
    <button className="memory-btn" onClick={props.handleClick}>
      <img src={photo}></img>
    </button>
  );
}
