// import internal modules
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// import external modules
import styles from '../styles/Detail.module.css'

const Detail = () => {
    const navigate = useNavigate();
    const { id_nota } = useParams();
    const [detailData, setDetailData] = useState([]);
    const [subTotal, setSubTotal] = useState([]);
    const username = localStorage.getItem("username");
    const id_pelanggan = localStorage.getItem("id_pelanggan")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/detail/${parseInt(id_nota)}`)
            .then((res) => {
                setDetailData(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/history/${parseInt(id_pelanggan)}`)
            .then((res) => {
                setSubTotal(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    let subTotalData = subTotal.find(x => x.id_nota === parseInt(id_nota))
    console.log(subTotalData);
    return (<>
        <header>
            <div className={`text-center`}>UMS Store History</div>
            <div className={`mx-3`}>{`Hai selamat datang, ${username}`}</div>
        </header>
        <section>
            <div className={`py-3 bg-light rounded min-vh-100`}>
                <img onClick={()=>navigate(-1)} className={`${styles.btnBack} my-3`} src={require("../assets/img/arrowback.svg").default} alt="" width={50} height={50}/>
                <div>Detail Anda:</div>
                {detailData.map((item, index) => (
                    <div key={index} className={`bg-white rounded m-3`}>
                        <div>Barang: {item.nama}</div>
                        <div>Kategori: {item.kategori}</div>
                        <div>Harga: {item.harga}</div>
                        <div>Qty: {item.qty}</div>
                    </div>
                ))}
                <div>Subtotal: Rp. {subTotalData?.subtotal}</div>
            </div>
        </section>
    </>)
}

export default Detail