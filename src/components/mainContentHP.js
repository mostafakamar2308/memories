import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../images/attraction", false, /\.(png|jpe?g|svg)$/)
);
export function Home() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    let inter = setInterval(() => {
      if (currentImg === 3) {
        setCurrentImg(0);
      } else {
        setCurrentImg((old) => old + 1);
      }
    }, 3000);
    return () => {
      clearInterval(inter);
    };
  }, [currentImg]);

  return (
    <main>
      <section className="photos">
        <img
          className="attraction"
          src={images[Object.keys(images)[currentImg]]}
          alt="attraction"
        ></img>
      </section>
      <section className="descriptionSite">
        <h1>Keep Your memories in one Safe Place</h1>
        <p>
          Memories is a cloud diary for you. You can save, view and sort your
          memories anytime, anywhere
        </p>
        <div>
          <button>
            <Link to="/sign-up">Sign Up</Link>{" "}
          </button>

          <button>
            <Link to="/sign-in">Sign In</Link>{" "}
          </button>
        </div>
      </section>
    </main>
  );
}
