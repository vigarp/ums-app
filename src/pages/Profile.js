// import internal modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import external modules
import styles from '../styles/Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const [dataPelanggan, setDataPelanggan] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formEditPelanggan, setFormEditPelanggan] = useState({
        nama: '',
        domisili: '',
        jenis_kelamin: '',
        password: ''
    });
    const id_pelanggan = localStorage.getItem("id_pelanggan");
    const username = localStorage.getItem("username");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/pelanggan/${id_pelanggan}`)
            .then((res) => {
                setDataPelanggan(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const openModal = (params) => {
        setShowModal(params)
    }

    const handleChange = (e) => {
        setFormEditPelanggan({
            ...formEditPelanggan,
            [e.target.name]: e.target.value
        })
    }

    const handleEditPelanggan = () => {
        axios.put(`${process.env.REACT_APP_URL_BACKEND}/pelanggan/${id_pelanggan}`, {
            nama: formEditPelanggan.nama,
            domisili: formEditPelanggan.domisili,
            jenis_kelamin: formEditPelanggan.jenis_kelamin,
            password: formEditPelanggan.password
        })
            .then((res) => {
                alert(res.data?.message)
                setFormEditPelanggan({});
                setShowModal(false)
                window.location.replace("/profile")
            })
            .catch((err) => {
                console.log(err)
                alert("Error")
            })
    }
    return (<>
        <header>
            <div className={`text-center`}>UMS Store Profile</div>
            <div className={`mx-3`}>{`Hai selamat datang, ${username}`}</div>
        </header>
        <section>
            <div className={`py-3 bg-light rounded min-vh-100`}>
                <img onClick={() => navigate("/home")} className={`${styles.btnBack} my-3`} src={require("../assets/img/house-door.svg").default} alt="" width={50} height={50} />
                <div className={`bg-white rounded m-3`}>
                    <div className={`d-flex justify-content-between m-3`}>
                        <div className={`description`}>
                            <div>ID Pelanggan: {dataPelanggan.id_pelanggan}</div>
                            <div>Nama: {dataPelanggan.nama}</div>
                            <div>Domisili: {dataPelanggan.domisili}</div>
                            <div>Jenis Kelamin: {dataPelanggan.jeniskelamin}</div>
                            <div>Dibuat: {dataPelanggan.created_at}</div>
                            <div>Update: {dataPelanggan.updated_at}</div>
                            <div onClick={() => openModal(true)} className={`${styles.editBtn} text-primary`}>Edit</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {showModal === true && (<>
            <div className={`${styles.checkoutWrapper}`}>
                <div className={`${styles.checkoutInner}`}>
                    <div className={`d-flex justify-content-between`}>
                        <div>Input Barang Baru:</div>
                        <div onClick={() => openModal(false)} className={`${styles.btnClose} fw-bold`}>X</div>
                    </div>
                    <div className={`formWrapper text-center`}>
                        <input
                            className="mt-3 py-2 w-75"
                            type="text"
                            name="nama"
                            onChange={handleChange}
                            value={formEditPelanggan.nama}
                            placeholder="Nama"
                        />
                        <br />
                        <input
                            className="mt-3 py-2 w-75"
                            type="text"
                            name="domisili"
                            onChange={handleChange}
                            value={formEditPelanggan.domisili}
                            placeholder="Domisili"
                        />
                        <br />
                        <input
                            className="mt-3 py-2 w-75"
                            type="text"
                            name="jenis_kelamin"
                            onChange={handleChange}
                            value={formEditPelanggan.jenis_kelamin}
                            placeholder="Jenis Kelamin"
                        />
                        <br />
                        <input
                            className="mt-3 py-2 w-75"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formEditPelanggan.password}
                            placeholder="Password"
                        />
                    </div>
                    <hr />
                    <button onClick={handleEditPelanggan}>Prosess</button>
                </div>
            </div>
        </>)}
    </>)
}

export default Profile