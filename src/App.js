import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { SignInPage } from "./pages/SignIn";
import { NotFound } from "./pages/notFound";
import { SignUpPage } from "./pages/SignUp";
import { MemoriesPage } from "./pages/MemoriesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/memories" element={<MemoriesPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
