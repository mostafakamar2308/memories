import { Header } from "../components/header";
import { Memory } from "../components/memory";
import img from "../images/japan.jpg";

export function MemoriesPage() {
  return (
    <>
      <Header />
      <section className="memories-container">
        <Memory
          title="First Memory"
          msg="I really want to marry more than 1 wife, apart from Fun also helping women and raising an orphan is a way to Gannah"
          img={img}
          date="10/6/2022"
        ></Memory>
      </section>
    </>
  );
}
