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
import { RotatingCircleLoader } from "react-loaders-kit";

export function MemoriesPage() {
  const [memoryVisible, setMemoryVisible] = React.useState(false);
  const [newMemoryTexts, setNewMemoryTexts] = React.useState({
    title: "",
    description: "",
  });
  const [memoriesText, setMemoriesText] = React.useState([]);
  const [activeMemories, setActiveMemories] = React.useState([]);
  const [favoriteMemories, setFavoriteMemories] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
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
  //check if user is signed in
  useEffect(() => {
    if (!user) navigate("/sign-in");
    document.title = "Memories | Home";
  }, []);

  //fetch all data from memories
  useEffect(() => {
    let timer;
    const memories = fetchMemoriesText();
    memories
      .then((res) => {
        setMemoriesText(res);
        timer = setTimeout(() => {
          console.log(loaded);
          setLoaded(true);
          document.querySelector(".all-btn").click();
        }, 2000);
      })
      .catch((e) => console.log(e));
    return () => {
      clearTimeout(timer);
    };
  }, []);

  //display loader while data are being fetched
  useEffect(() => {}, []);

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
    setLoaded(false);
    setActiveMemories(memoriesText);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }
  async function favoriteMemoriesBtn() {
    await getFavoriteMemories().then(() => {
      console.log(favoriteMemories);
      setActiveMemories((old) => {
        let arr = [];
        for (let i = 0; i < favoriteMemories.length; i++) {
          console.log(favoriteMemories[i]);
          let f = old.filter((ele) => ele.date === favoriteMemories[i]);
          console.log(f);
          arr.push(f[0]);
        }
        console.log(arr);
        return arr;
      });
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
  const loaderColor = { colors: ["#5e22f0", "#f6b93b"] };

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
          {!loaded ? (
            <div className="loader-container">
              <RotatingCircleLoader
                size={100}
                duration={2}
                {...loaderColor}
                loading
              />{" "}
            </div>
          ) : (
            activeMemories.map((ele) => {
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
            })
          )}
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
