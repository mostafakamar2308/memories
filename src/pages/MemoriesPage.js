import { Header } from "../components/header";
import { Memory } from "../components/memory";
import { AddMemoryBtn } from "../components/addMemoryBtn";
import { NewMemoryModal } from "../components/addMemoryModal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user, db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { storage } from "../data/firebase";
import { ref } from "firebase/storage";

export function MemoriesPage() {
  const [memoryVisible, setMemoryVisible] = React.useState(false);
  const [newMemoryTexts, setNewMemoryTexts] = React.useState({
    title: "",
    description: "",
  });
  const [newMemoryImage, setNewMemoryImage] = React.useState("");
  const [memoriesText, setMemoriesText] = React.useState([]);
  const navigate = useNavigate();

  async function fetchMemoriesText() {
    const refe = collection(db, "users", user.uid, "memories");
    const data = await getDocs(refe);
    let arr = [];
    data.forEach((doc) => {
      const storageRef = ref(storage, user.uid, doc.data().date);
      arr.unshift(doc.data());
      arr[0].photoRef = storageRef;
    });
    return arr;
  }

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
    const memories = fetchMemoriesText();
    memories.then((res) => {
      setMemoriesText(res);
    });

    document.title = "Memories | Home";
  }, []);
  function memoryVisibleControl() {
    setMemoryVisible(!memoryVisible);
  }

  function changeMemoryText(e) {
    setNewMemoryTexts((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
  }
  function changeMemoryImage(e) {
    setNewMemoryImage(e.target.value);
  }
  function makeNewMemoryLocally() {
    setMemoriesText((old) => {
      old.unshift({
        title: newMemoryTexts.title,
        description: newMemoryTexts.description,
        date: `${new Date().getUTCDate()}-${
          new Date().getMonth() + 1
        }-${new Date().getFullYear()}`,
      });
      return old;
    });
  }
  return (
    <>
      <Header />
      <section className="memories-container">
        {memoriesText.map((ele) => {
          return (
            <Memory
              title={ele.title}
              key={ele.date}
              msg={ele.description}
              img={ele.date}
              date={ele.date}
            />
          );
        })}
      </section>
      <AddMemoryBtn handleClick={memoryVisibleControl} />
      {memoryVisible && (
        <NewMemoryModal
          handleInputChange={changeMemoryText}
          handleClick={memoryVisibleControl}
          handleImageInput={changeMemoryImage}
          handleFormSubmit={makeNewMemoryLocally}
        />
      )}
    </>
  );
}
