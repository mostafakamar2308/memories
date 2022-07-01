import { Header } from "../components/header";
import { Memory } from "../components/memory";
import { AddMemoryBtn } from "../components/addMemoryBtn";
import { NewMemoryModal } from "../components/addMemoryModal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user, db } from "../data/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { storage } from "../data/firebase";
import { ref } from "firebase/storage";
import { SideBar } from "../components/sidebar";

export function MemoriesPage() {
  const [memoryVisible, setMemoryVisible] = React.useState(false);
  const [newMemoryTexts, setNewMemoryTexts] = React.useState({
    title: "",
    description: "",
  });
  const [memoriesText, setMemoriesText] = React.useState([]);
  const [activeMemories, setActiveMemories] = React.useState([]);
  const [favoriteMemories, setFavoriteMemories] = React.useState([]);
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
      getFavoriteMemories();
      setActiveMemories(memoriesText);
    });
    document.title = "Memories | Home";
  }, []);

  //show new memory Modal
  function memoryVisibleControl() {
    setMemoryVisible(!memoryVisible);
  }
  async function getFavoriteMemories() {
    let favoritesSnap = await getDoc(doc(db, "users", user.uid));
    let favorites = favoritesSnap.data().favorites;
    console.log(favorites);
    setFavoriteMemories(favorites);
  }

  function allMemoriesBtn() {
    setActiveMemories(memoriesText);
  }
  function favoriteMemoriesBtn() {
    getFavoriteMemories();
    console.log(favoriteMemories);
    console.log(activeMemories);
    setActiveMemories((old) => {
      console.log(old);
      let arr = [];
      for (let i = 0; i < favoriteMemories.length; i++) {
        console.log(favoriteMemories[i]);
        arr.unshift(old.filter((ele) => ele.date === favoriteMemories[i]));
      }
      console.log(arr);
      return arr;
    });
  }

  function changeMemoryText(e) {
    setNewMemoryTexts((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
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
      <main className="main-memories">
        <SideBar
          handleFavorite={getFavoriteMemories}
          handlePressFavorite={favoriteMemoriesBtn}
          handlePressAll={allMemoriesBtn}
        />
        <section className="memories-container">
          {activeMemories.map((ele) => {
            return (
              <Memory
                title={ele.title}
                key={ele.date}
                msg={ele.description}
                img={ele.date}
                date={ele.date}
                favorite={favoriteMemories.includes(ele.date) ? true : false}
              />
            );
          })}
        </section>
      </main>
      <AddMemoryBtn handleClick={memoryVisibleControl} />
      {memoryVisible && (
        <NewMemoryModal
          handleInputChange={changeMemoryText}
          handleClick={memoryVisibleControl}
          handleFormSubmit={makeNewMemoryLocally}
        />
      )}
    </>
  );
}
