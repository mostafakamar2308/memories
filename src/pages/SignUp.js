import { SignUpForm } from "../components/signUpForm";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../images/scribbles", false, /\.(png|jpe?g|svg)$/)
);

let keys = Object.keys(images);

export function SignUpPage() {
  return (
    <div className="form-container">
      {keys.map((ele, index) => {
        return (
          <img
            src={images[ele]}
            alt="scribble"
            className={`scribble-${index + 1} scribble`}
            key={index}
            style={{
              position: "absolute",
              zIndex: -1,
            }}
          ></img>
        );
      })}
      <SignUpForm />
    </div>
  );
}
