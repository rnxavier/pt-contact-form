import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Submitted = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const routeChange = () => {
    navigate("/");
  };
  return (
    <div className="welcome-page">
      <div className="welcome-logo submitted-logo">
        {" "}
        Bizzie💪🏾<span>Trainer</span>
      </div>
      <div>
        <h1>Thank you! </h1>
        <h1>I will be in touch soon 😎</h1>
        <button
          className="welcome-page-btns home-btn submitted-page-btn"
          onClick={routeChange}
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default Submitted;
