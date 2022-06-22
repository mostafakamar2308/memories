import React from "react";
import { storage, user } from "../data/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export function Memory(props) {
  const [photoURL, setPhotoURL] = React.useState("");
  React.useEffect(() => {
    getDownloadURL(ref(storage, `${user.uid}/${props.img}/photo`))
      .then((url) => {
        setPhotoURL(url);
      })
      .catch((err) => console.log(err));
  }, [photoURL]);
  return (
    <div className="memory">
      <img src={photoURL} />
      <h1>{props.title}</h1>
      <p>{props.msg}</p>
      <span>{props.date}</span>
    </div>
  );
}
