export function Memory(props) {
  return (
    <div className="memory">
      <img src={props.img} />
      <h1>{props.title}</h1>
      <p>{props.msg}</p>
      <span>{props.date}</span>
    </div>
  );
}
