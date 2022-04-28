// import internal modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import external modules
import styles from '../styles/History.module.css';

const History = () => {
  const navigate = useNavigate();
  const [dataHistory, setDataHistory] = useState([]);
  const [detailHistory, setDetailHistory] = useState([]);
  const username = localStorage.getItem("username");
  const id_pelanggan = localStorage.getItem("id_pelanggan")

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL_BACKEND}/history/${parseInt(id_pelanggan)}`)
      .then((res) => {
        setDataHistory(res.data?.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (<>
    <header>
      <div className={`text-center`}>UMS Store History</div>
      <div className={`mx-3`}>{`Hai selamat datang, ${username}`}</div>
    </header>
    <section>
      <div className={`py-3 bg-light rounded min-vh-100`}>
        <img onClick={() => navigate("/home")} className={`${styles.btnBack} my-3`} src={require("../assets/img/house-door.svg").default} alt="" width={50} height={50} />
        {dataHistory.length !== 0 ? (<>
          <div>History Anda:</div>
        <div><i>Klik untuk melihat detail</i></div>
        {dataHistory.map((history, index) => (
          <div onClick={() => navigate(`/history/${history.id_nota}`)} key={index} className={`${styles.detailItem} bg-white rounded m-3`}>
            <div>Invoice: {history.id_nota}</div>
            <div>Tanggal: {history.tgl}</div>
            <div>Subtotal: Rp. {history.subtotal}</div>
            <div>Dibuat: {history.created_at}</div>
          </div>
        ))}
        </>) : (<div className={`mx-3`}>Anda belum belanja</div>)}

      </div>
    </section>

  </>)
}

export default History