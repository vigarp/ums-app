// import internal modules
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// import external modules
import styles from '../styles/History.module.css';

const Penjualan = () => {
    const { id_pelanggan } = useParams();
    const navigate = useNavigate();
    const [dataPelanggan, setDataPelanggan] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/history/${id_pelanggan}`)
            .then((res) => {
                setDataPelanggan(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deletePenjualan = (id_nota) => {
        axios.delete(`${process.env.REACT_APP_URL_BACKEND}/penjualan/${id_nota}`)
            .then(() => {
                axios.delete(`${process.env.REACT_APP_URL_BACKEND}/item_penjualan/${id_nota}`)
                    .then((res) => {
                        alert(res.data?.message)
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err)
                        alert("Error")
                    })
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
                {dataPelanggan.length !== 0 ? (<>
                    <div>User yang terdaftar:</div>
                    <div><i>Klik untuk melihat detail</i></div>
                    {dataPelanggan.map((user, index) => (
                        <div key={index} className={`bg-white rounded m-3`}>
                            <div className={`d-flex justify-content-between m-3`}>
                                <div className={`description`}>
                                    <div>ID Nota: {user.id_nota}</div>
                                    <div>Tgl: {user.tgl}</div>
                                    <div>Kode Pelanggan: {user.kode_pelanggan}</div>
                                    <div>Subtotal: {user.subtotal}</div>
                                    <div>Dibuat: {user.created_at}</div>
                                </div>
                                <div className={`${styles.detailItem} deleteicon`}>
                                    <img onClick={() => deletePenjualan(user.id_nota)} className={`my-3`} src={require("../assets/img/trash.svg").default} alt="" width={50} height={50} />
                                </div>
                            </div>
                        </div>
                    ))}
                </>) : (<div className={`mx-3`}>Tidak ada data</div>)}

            </div>
        </section>

    </>)
}

export default Penjualan