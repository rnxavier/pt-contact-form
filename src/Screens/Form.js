import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { serviceID, publicID, templateID } from "../secret";
import emailjs from "@emailjs/browser";
import bizLogo from "./bizLogo.PNG";
import yourPTLogo from "./your-pt-logo.png";
import betterLogo from "./better-logo.jpeg";

const Form = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 600000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    numberError: "",
    msgError: "",
  });

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let numberError = "";
    let msgError = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!emailRegex.test(formData.email)) {
      emailError = "Invalid email format";
    }

    if (!formData.name) {
      nameError = "Name cannot be blank";
    }

    const numberRegex = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g;

    if (!numberRegex.test(formData.number)) {
      numberError = "Invalid number";
    }

    if (!formData.message) {
      msgError = "Message cannot be blank";
    }

    if (emailError || nameError || numberError || msgError) {
      setErrors({ ...errors, emailError, nameError, numberError, msgError });
      return false;
    }

    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(errors);
    const isValid = validate();
    if (isValid) {
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
          setFormData({
            name: "",
            email: "",
            number: "",
            message: "",
          });
          setErrors({
            nameError: "",
            emailError: "",
            numberError: "",
            msgError: "",
          });
        })
        .then(() => {
          navigate("/submission");
        });
    }
  };

  return (
    <div className="welcome-page">
      <div className="form-page-logo">
        <img src={yourPTLogo} alt="" className="your-pt-logo" />
        <img src={bizLogo} alt="" className="biz-logo" />
        <img src={betterLogo} alt="" className="better-logo" />
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <h1>CONTACT ME</h1>

        <div className="txtb">
          <label>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          {errors.nameError ? <p>{errors.nameError}</p> : null}
        </div>

        <div className="txtb">
          <label>Email Address</label>
          <input
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          {errors.emailError ? <p>{errors.emailError}</p> : null}
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
          {errors.numberError ? <p>{errors.numberError}</p> : null}
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
          {errors.msgError ? <p>{errors.msgError}</p> : null}
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
