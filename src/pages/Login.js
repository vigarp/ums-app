// import internal modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import external modules
import styles from "../styles/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [dataPelanggan, setDataPelanggan] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_BACKEND}/pelanggan`)
      .then((res) => {
        setDataPelanggan(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let validateLogin = dataPelanggan.find(
      (x) => x.nama === formLogin.username
    );
    if (formLogin.username === "" && formLogin.password === "") {
      alert("username/password tidak boleh kosong");
    } else if (validateLogin === undefined) {
      alert("username/password salah");
    } else if (
      formLogin.username === validateLogin.nama &&
      formLogin.password === validateLogin.password
    ) {
      localStorage.setItem("username", formLogin.username);
      localStorage.setItem("id_pelanggan", validateLogin.id_pelanggan);
      window.location.replace("/home");
    } else {
      alert("error");
    }
  };
  return (
    <>
      <div className="text-center d-flex flex-column justify-content-center align-items-center mt-5">
        <div>Silahkan login:</div>
        <input
          className="mt-3 py-2"
          type="text"
          name="username"
          onChange={handleChange}
          value={formLogin.username}
          placeholder="Username"
        />
        <input
          className="mt-3 py-2"
          type="password"
          name="password"
          onChange={handleChange}
          value={formLogin.password}
          placeholder="Password"
        />
        <div
          onClick={() => navigate("/register")}
          className={`${styles.register} text-primary`}
        >
          Register?
        </div>
        <button
          onClick={handleLogin}
          className="py-3 px-5 bg-secondary bg-opacity-50 text-white rounded-3 mt-3 w-25 fw-bold"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
