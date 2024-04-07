import React from "react";
import axios from "axios";
import "./SignUp.css"; // Import the CSS file

function SignUp() {
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target.elements;
    try {
      await axios.post("http://localhost:5000/api/register", {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
