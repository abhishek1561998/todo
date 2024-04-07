import React from "react";
import axios from "axios";
import "./login.css"; // Import the CSS file

function Login({ setToken }) {
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: email.value,
        password: password.value,
      });
      setToken(res.data.token);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
