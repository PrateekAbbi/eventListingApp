import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Screens/Home/Home";
import Event from "./Screens/Event/Event";
import LogIn from "./Screens/LogIn/LogIn";
import SignUp from "./Screens/SignUp/SignUp";
import AddEvent from "./Screens/AddEvent/AddEvent";
import UpdateEvent from "./Screens/AddEvent/UpdateEvent";

//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="logIn" element={<LogIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="event/:Id" element={<Event />} />
          <Route path="updateEvent/:Id" element={<UpdateEvent />} />
          <Route path="/addEvent" element={<AddEvent />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
