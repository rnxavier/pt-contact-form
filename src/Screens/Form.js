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

    const numberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

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
        });
      // .then(() => {
      //   alert(
      //     `Thank you for your enquiry! ${"\n"}I will be in touch soon 😎`
      //   );
      // });
    }
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
            // type="text"
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
            // type="email"
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
            // type="number"
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
