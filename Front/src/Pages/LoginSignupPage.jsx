import React, { useState } from "react";
import "./css/LoginSignupPage.css";
import ggbutt from "../assets/img/google-button.svg";
import { useNavigate } from "react-router-dom";



const FormPage = ({authChange}) => {
  const [signin, setSignin] = useState(true);
 

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      // Perform authentication logic here
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: logmail,
          password: logpass
        }),
      });

      const parseRes = await response.json();

      console.log(parseRes, "parseRes");

      localStorage.setItem("token", parseRes.token);

      authChange();


      navigate('/dashboard');

    } catch (error) {
      console.log(error, "handleSignIn error");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Perform authentication logic here

      //const body = { regname, regmail, regpass };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regname,
          email: regmail,
          password: regpass
        }),
      });

      const parseRes = await response.json();
      console.log(parseRes, "parseRes");

      localStorage.setItem("token", parseRes.token);
      
      authChange();

      navigate('/dashboard');

    } catch (error) {
      console.log(error, "handleSignUp error");
    }
  };


  const [regname, setName] = useState("");
  const [regmail, setEmail] = useState("");
  const [regpass, setPassword] = useState("");
  const [logmail, setLogEmail] = useState("");
  const [logpass, setLogPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogEmailChange = (event) => {
    setLogEmail(event.target.value);
  };

  const handleLogPasswordChange = (event) => {
    setLogPassword(event.target.value);
  };




  return (
    <div className="zama-form">
      <div className={`containermain ${!signin ? 'right-panel-active' : ''}`} id="containermain">
        <div className="form-container sign-up-container">
        <form className="logregform" action='#' onSubmit={handleSignUp} >
            <h1 className="reg-text">Registracija</h1>
            <div className="social-container">
              <a href="#" className="social"><img src={ggbutt} alt="Google" /></a>
            </div>
            <span className="additional">arba registruokitės su paštu</span>
            <input className="regname" type="text" placeholder="Vardas" value={regname} onChange={handleNameChange} />
            <input className="regmail" type="email" placeholder="El.Paštas" value={regmail} onChange={handleEmailChange} />
            <input className="regpass" type="password" placeholder="Slaptažodis" value={regpass} onChange={handlePasswordChange} />
            <button className="logregbutt" type="submit">Užsiregistruoti</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="logregform" action="#" onSubmit={handleSignIn} >
            <h1 className="log-text">Prisijungimas</h1>
            <div className="social-containerform">
              <a href="#" className="social"><img src={ggbutt} alt="Google"/></a>
            </div>
            <span className="additional">arba prisijunkite su paštu</span>
            <input className="logmail" type="email" placeholder="El.Paštas" value={logmail} onChange={handleLogEmailChange} />
            <input className="logpass" type="password" placeholder="Slaptažodis" value={logpass} onChange={handleLogPasswordChange} />
            <a className="additional1" href="#">Pamiršau slaptažodį</a>
            <button className="logregbutt">Prisijungti</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlayform">
            <div className="overlay-panel overlay-left">
              <h1>Sveikas, Žvejy!</h1>
              <p className="greeting">Pradėkite savo geriausią žvejybos kelionę su mumis!</p>
              <button className="ghost" onClick={e => setSignin(true)}>Prsijungti</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Sveikas, Žvejy!</h1>
              <p className="greeting">Prisijunkite, kad neprarastumėte naujienų!</p>
              <button className="ghost" onClick={e => setSignin(false)}>Registruotis</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;