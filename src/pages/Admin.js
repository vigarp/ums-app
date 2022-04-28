// import internal modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import external modules
import styles from '../styles/History.module.css';

const Admin = () => {
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/pelanggan/`)
            .then((res) => {
                setAllUser(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteUser = (id_pelanggan) => {
        axios.delete(`${process.env.REACT_APP_URL_BACKEND}/pelanggan/${id_pelanggan}`)
        .then((res) => {
            alert(res.data?.message)
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
            alert("Error")
        })
    }
    return (<>
        <header>
            <div className={`text-center`}>UMS Store Admin Panel</div>
            <div className={`mx-3`}>{`Hai selamat datang, ${username}`}</div>
        </header>
        <section>
            <div className={`py-3 bg-light rounded min-vh-100`}>
                <img onClick={() => navigate("/home")} className={`${styles.btnBack} my-3`} src={require("../assets/img/house-door.svg").default} alt="" width={50} height={50} />
                {allUser.length !== 0 ? (<>
                    <div>User yang terdaftar:</div>
                    <div><i>Klik untuk melihat detail</i></div>
                    {allUser.map((user, index) => (
                        <div key={index} className={`bg-white rounded m-3`}>
                            <div className={`d-flex justify-content-between m-3`}>
                                <div onClick={() => navigate(`/admin/${user.id_pelanggan}`)} className={`${styles.detailItem} description`}>
                                    <div>ID Pelanggan: {user.id_pelanggan}</div>
                                    <div>Nama: {user.nama}</div>
                                    <div>Domisili: {user.domisili}</div>
                                    <div>Tanggal Daftar: {user.created_at}</div>
                                </div>
                                <div className={`${styles.detailItem} deleteicon`}>
                                    <img onClick={()=>deleteUser(user.id_pelanggan)} className={`my-3`} src={require("../assets/img/trash.svg").default} alt="" width={50} height={50} />
                                </div>
                            </div>
                        </div>
                    ))}
                </>) : (<div className={`mx-3`}>Tidak ada data</div>)}

            </div>
        </section>

    </>)
}

export default Admin