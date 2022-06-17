import { Header } from "../components/header";
import { Memory } from "../components/memory";
import { AddMemoryBtn } from "../components/addMemoryBtn";
import img from "../images/japan.jpg";
import { NewMemoryModal } from "../components/addMemoryModal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user, db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";

export function MemoriesPage() {
  const [memoryVisible, setMemoryVisible] = React.useState(false);
  const [memoriesText, setMemoriesText] = React.useState([]);
  const [newMemoryInputs, setNewMemoryInputs] = React.useState({});
  const navigate = useNavigate();

  async function fetchMemoriesText() {
    const ref = collection(db, "users", user.uid, "memories");
    const data = await getDocs(ref);
    let arr = [];
    data.forEach((doc) => {
      console.log(doc.id);
      console.log(doc.data());
      arr.push(doc.data());
    });
    return arr;
  }
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
    const memories = fetchMemoriesText();
    memories.then((res) => {
      console.log(res);
      setMemoriesText(res);
    });

    document.title = "Memories | Home";
  }, []);
  function memoryVisibleControl() {
    setMemoryVisible(!memoryVisible);
  }

  function handleNewMemory(e) {
    setNewMemoryInputs((old) => {
      console.log(e.target.value);
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <>
      <Header />
      <section className="memories-container">
        {memoriesText.map((ele) => {
          console.log(ele.description);
          return (
            <Memory
              title={ele.title}
              key={ele.date}
              msg={ele.description}
              img={img}
              date={ele.date}
            />
          );
        })}
        <Memory
          title="First Memory"
          msg="I really want to marry more than 1 wife, apart from Fun also helping women and raising an orphan is a way to Gannah"
          img={img}
          date="10/6/2022"
        />
      </section>
      <AddMemoryBtn handleClick={memoryVisibleControl} />
      {memoryVisible && (
        <NewMemoryModal
          handleClick={memoryVisibleControl}
          handleInput={handleNewMemory}
        />
      )}
    </>
  );
}
