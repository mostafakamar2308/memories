import { doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage, user } from "../data/firebase";
import { db } from "../data/firebase";
import { setDoc } from "firebase/firestore";

export function NewMemoryModal(props) {
  function uploadPhotos(file) {
    const imageRef = ref(
      storage,
      `${user.uid}/${new Date().getUTCDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}/photo`
    );
    uploadBytes(imageRef, file, { contentType: "image/jpeg" }).then(() => {
      props.handleFormSubmit();
      props.handleClick();
    });
  }
  function uploadMemory(title, description) {
    setDoc(
      doc(
        db,
        "users",
        user.uid,
        "memories",
        `${new Date().getUTCDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`
      ),
      {
        title: title,
        description: description,
        date: `${new Date().getUTCDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`,
      }
    );
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
            uploadMemory(
              document.querySelector("#title").value,
              document.querySelector("#description").value
            );
            uploadPhotos(document.getElementById("img-input").files[0]);
          }}
        >
          <input
            placeholder="Memory Title"
            name="title"
            id="title"
            required
            onChange={props.handleInputChange}
          />
          <textarea
            placeholder="Memory Description"
            name="description"
            id="description"
            required
            onChange={props.handleInputChange}
          />
          <input
            type="file"
            placeholder="Memory Img"
            required
            id="img-input"
            onChange={props.handleImageInput}
          />
          <input type="submit" value="Save Memory" />
        </form>
      </div>
    </section>
  );
}
