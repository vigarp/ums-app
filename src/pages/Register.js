// import internal modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import external modules
import styles from '../styles/Register.module.css';
const Register = () => {
    const navigate = useNavigate();
    const [formRegister, setFormRegister] = useState({
        username: '',
        domisili: '',
        jeniskelamin: '',
        password: ''
    })
    const [dataPelanggan, setDataPelanggan] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/pelanggan`)
            .then((res) => {
                setDataPelanggan(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(formRegister)
        axios.post(`${process.env.REACT_APP_URL_BACKEND}/pelanggan`, {
            nama: formRegister.username,
            domisili: formRegister.domisili,
            jenis_kelamin: formRegister.jeniskelamin,
            password: formRegister.password
        })
        .then((res) => {
            alert(res.data?.message)
            navigate("/login")
        })
        .catch((err) => {
            console.log(err)
            alert("Error")
        })
    }
    return (<>
        <div className="text-center d-flex flex-column justify-content-center align-items-center mt-5">
            <div>Silahkan register:</div>
            <input
                className="mt-3 py-2"
                type="text"
                name="username"
                onChange={handleChange}
                value={formRegister.username}
                placeholder="Username"
            />
            <input
                className="mt-3 py-2"
                type="text"
                name="domisili"
                onChange={handleChange}
                value={formRegister.domisili}
                placeholder="Domisili"
            />
            <input
                className="mt-3 py-2"
                type="text"
                name="jeniskelamin"
                onChange={handleChange}
                value={formRegister.jeniskelamin}
                placeholder="Jenis Kelamin"
            />
            <input
                className="mt-3 py-2"
                type="password"
                name="password"
                onChange={handleChange}
                value={formRegister.password}
                placeholder="Password"
            />
            <div onClick={()=>navigate("/login")} className={`${styles.login} text-primary`}>Login?</div>
            <button onClick={handleRegister} className="py-3 px-5 bg-secondary bg-opacity-50 text-white rounded-3 mt-3 w-25 fw-bold">Register</button>
        </div>
    </>)
}

export default Register