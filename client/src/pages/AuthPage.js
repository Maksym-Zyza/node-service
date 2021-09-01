import React, { useState } from "react";
import useHttp from "../hooks/useHttp";

export default function AuthPage() {
  const { loading, request } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const data = await request("/api/auth/register", "POST", { ...form });
    console.log("Data", data);
    try {
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2 className="title">Short link</h2>

        <div className="card blue ligthen-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Input email"
                  id="email"
                  name="email"
                  type="text"
                  className="auth-imput"
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field ">
                <input
                  placeholder="Input password"
                  id="password"
                  name="password"
                  type="password"
                  className="auth-imput"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-3" disabled={loading}>
              Log in
            </button>
            <button
              className="btn #8bc34a light-green black-text"
              disabled={loading}
              onClick={handleRegister}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
