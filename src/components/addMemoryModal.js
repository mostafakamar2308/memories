import { doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage, user } from "../data/firebase";

export function NewMemoryModal(props) {
  function uploadPhotos(file) {
    const imageRef = ref(
      storage,
      `${
        user.uid
      }/${new Date().getUTCDate()}-${new Date().getMonth()}-${new Date().getFullYear()}/photo`
    );
    uploadBytes(imageRef, file, { contentType: "image/jpeg" });
  }
  return (
    <section className="newMemory">
      <div>
        <p>Add a New Memory</p>
        <button className="close-memory" onClick={props.handleClick}>
          X
        </button>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadPhotos(document.getElementById("img-input").files[0]);
          }}
        >
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
            id="img-input"
            onChange={props.handleInput}
          />
          <input type="submit" value="Save Memory" />
        </form>
      </div>
    </section>
  );
}
