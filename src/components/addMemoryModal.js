export function NewMemoryModal(props) {
  return (
    <section className="newMemory">
      <div>
        <p>Add a New Memory</p>
        <button className="close-memory" onClick={props.handleClick}>
          X
        </button>
      </div>
      <div>
        <form>
          <input
            placeholder="Memory Title"
            name="title"
            required
            onChange={props.handleInput}
          />
          <textarea
            placeholder="Memory Description"
            name="description"
            required
            onChange={props.handleInput}
          />
          <input
            type="file"
            placeholder="Memory Img"
            required
            onChange={props.handleInput}
          />
          <input type="submit" value="Save Memory" />
        </form>
      </div>
    </section>
  );
}
