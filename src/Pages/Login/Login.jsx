import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !name.trim()) return setError("Name is required");
    if (!email.trim()) return setError("Email is required");
    if (!password.trim()) return setError("Password is required");

    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("http://localhost:8008/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username: name, email, password })
        });

        
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Signup failed");
          return;
        }

        navigate("/");
      } else {
        const res = await fetch("http://localhost:8008/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Login failed");
          return;
        }

        navigate("/");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-title">{mode === "login" ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
          </button>

          {error && (
            <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>
              {error}
            </p>
          )}
        </form>

        <p className="auth-switch">
          {mode === "login" ? (
            <>
              New user?
              <span onClick={() => setMode("signup")}> Signup</span>
            </>
          ) : (
            <>
              Already have an account?
              <span onClick={() => setMode("login")}> Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
