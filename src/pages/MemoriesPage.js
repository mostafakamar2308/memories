import { Header } from "../components/header";
import { Memory } from "../components/memory";
import { AddMemoryBtn } from "../components/addMemoryBtn";
import img from "../images/japan.jpg";
import { NewMemoryModal } from "../components/addMemoryModal";
import React from "react";

export function MemoriesPage() {
  const [memoryVisible, setMemoryVisible] = React.useState(false);
  const [newMemoryInputs, setNewMemoryInputs] = React.useState({});

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
