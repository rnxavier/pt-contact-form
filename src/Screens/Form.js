import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { serviceID, publicID, templateID } from "../secret";
import emailjs from "@emailjs/browser";

const Form = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceID, templateID, form.current, publicID)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .then(() => {
        alert(`Thank you for your enquiry! ${"\n"}I will be in touch soon 😎`);
      })
      .then(() => {
        setFormData({
          name: "",
          email: "",
          number: "",
          message: "",
        });
      });
  };

  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };
  return (
    <div className="welcome-page">
      <div className="welcome-logo">
        Bizzie💪🏾<span>Trainer</span>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <h1>CONTACT ME</h1>

        <div className="txtb">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>

        <div className="txtb">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>

        <div className="txtb">
          <label>Contact Number</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={(e) => {
              setFormData({ ...formData, number: e.target.value });
            }}
          />
        </div>

        <div className="txtb">
          <label>How can I help you?</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
            }}
          ></textarea>
        </div>

        <div className="form-footer">
          <button type="submit" className="welcome-page-btns welcome-btn">
            <div className="submit-btn-text">
              <span>Submit</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </button>

          <button className="welcome-page-btns home-btn" onClick={routeChange}>
            Back to Home Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
