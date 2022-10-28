import { useNavigate } from "react-router-dom";
// import welcomeImg from "./welcomeImg.png";
import welcomeLogo from "./welcomeLogo.png";

const Welcome = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/form");
  };

  return (
    <div className="welcome-page">
      <p>PERSONAL TRAINER ENQUIRIES</p>

      <div className="img-div">
        <img src={welcomeLogo} alt="" />
      </div>
      <div>
        <h1>Ready to start your fitness journey?</h1>
      </div>

      <div className="btn-div">
        <button className="welcome-btn welcome-page-btns" onClick={routeChange}>
          Get in Touch
        </button>
      </div>
    </div>
  );
};

export default Welcome;
