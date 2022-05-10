// import internal modules
import React, { useEffect, useState } from "react";
import axios from "axios";

// import external modules
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [dataItems, setDataItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formAddBarang, setFormAddBarang] = useState({
    nama: "",
    kategori: "",
    harga: "",
    picture: "",
  });
  const username = localStorage.getItem("username");
  const itemsPrice = cartItems.reduce((a, c) => a + c.harga * c.qty, 0);
  const id_pelanggan = localStorage.getItem("id_pelanggan");

  useEffect(() => {
    if (username === null) {
      navigate("/login");
    } else {
      const randomNumber = Math.floor(Math.random() * 999);
      localStorage.setItem("nota", randomNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_BACKEND}/barang`)
      .then((res) => {
        setDataItems(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onAdd = (product) => {
    const nota = parseInt(localStorage.getItem("nota"));
    const exist = cartItems.find((x) => x.kode_barang === product.kode_barang);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.kode_barang === product.kode_barang
            ? { ...exist, qty: exist.qty + 1, nota }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1, nota }]);
    }
  };

  const onRemove = (product) => {
    const nota = parseInt(localStorage.getItem("nota"));
    const exist = cartItems.find((x) => x.kode_barang === product.kode_barang);
    if (exist.qty === 1) {
      setCartItems(
        cartItems.filter((x) => x.kode_barang !== product.kode_barang)
      );
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.kode_barang === product.kode_barang
            ? { ...exist, qty: exist.qty - 1, nota }
            : x
        )
      );
    }
  };

  const onCancel = () => {
    setCartItems([]);
  };

  const onProses = () => {
    const nota = parseInt(localStorage.getItem("nota"));
    cartItems.forEach((element) => {
      console.log(element);
      axios
        .post(`${process.env.REACT_APP_URL_BACKEND}/item_penjualan`, element)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert("Error");
        });
    });
    axios
      .post(`${process.env.REACT_APP_URL_BACKEND}/penjualan`, {
        id_nota: nota,
        tgl: new Date().toLocaleDateString(),
        kode_pelanggan: parseInt(id_pelanggan),
        subtotal: itemsPrice,
      })
      .then((res) => {
        console.log(res);
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFormAddBarang({
      ...formAddBarang,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleAddBarang = () => {
    axios
      .post(`${process.env.REACT_APP_URL_BACKEND}/barang`, {
        nama: formAddBarang.nama,
        kategori: formAddBarang.kategori,
        harga: formAddBarang.harga,
        picture: formAddBarang.picture,
      })
      .then((res) => {
        alert(res.data?.message);
        setFormAddBarang({});
        setShowModal(false);
        window.location.replace("/home");
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };

  const openModal = (params) => {
    setShowModal(params);
  };

  const handleDelete = (kode_barang) => {
    axios
      .delete(`${process.env.REACT_APP_URL_BACKEND}/barang/${kode_barang}`)
      .then((res) => {
        alert(res.data?.message);
        window.location.replace("/home");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <>
      <header className={`d-flex`}>
        <div className={`navbarLeft w-75`}>
          <div className={`d-flex`}>
            {username === "admin" ? (
              <>
                <img
                  onClick={() => navigate("/admin")}
                  className={`${styles.btnBack} my-3 mx-3`}
                  src={require("../assets/img/sliders.svg").default}
                  alt=""
                  width={50}
                  height={50}
                />
                <img
                  onClick={() => openModal(true)}
                  className={`${styles.btnBack} my-3 mx-3`}
                  src={require("../assets/img/plus-circle.svg").default}
                  alt=""
                  width={50}
                  height={50}
                />
                <img
                  onClick={() => navigate("/profile")}
                  className={`${styles.btnBack} my-3 mx-3`}
                  src={require("../assets/img/person.svg").default}
                  alt=""
                  width={50}
                  height={50}
                />
              </>
            ) : (
              <>
                <img
                  onClick={() => navigate("/history")}
                  className={`${styles.btnBack} my-3 mx-3`}
                  src={require("../assets/img/clock-history.svg").default}
                  alt=""
                  width={50}
                  height={50}
                />
                <img
                  onClick={() => navigate("/profile")}
                  className={`${styles.btnBack} my-3 mx-3`}
                  src={require("../assets/img/person.svg").default}
                  alt=""
                  width={50}
                  height={50}
                />
              </>
            )}
            <div className={`text-center flex-grow-1 mt-5`}>
              UMS Store Items
            </div>
          </div>
          <div className={`d-flex justify-content-between`}>
            <div className={`mx-3`}>{`Hai selamat datang, ${username}`}</div>
            <img
              onClick={handleLogout}
              className={`${styles.btnBack} mx-3`}
              src={require("../assets/img/box-arrow-left.svg").default}
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className={`navbarRight w-25`}>
          <div className={`text-center mt-5`}>Cart</div>
        </div>
      </header>
      <section className={`d-flex`}>
        <div className={`w-75 bg-light rounded`}>
          <div className={`d-flex flex-wrap`}>
            {dataItems.map((product, index) => (
              <div className={`${styles.card}`} key={index}>
                <img
                  className="card"
                  src={product.picture}
                  alt={product.name}
                  height={200}
                  width={250}
                />
                <div className="card-body">
                  <h5 className={`text-bold`}>{product.nama}</h5>
                  <div>Kategori: {product.kategori}</div>
                  <p className="card-text">Rp. {product.harga}</p>
                  <button className="button" onClick={() => onAdd(product)}>
                    Add To Cart
                  </button>
                  {username === "admin" && (
                    <button
                      onClick={() => handleDelete(product.kode_barang)}
                      className={`button mx-3`}
                    >
                      Delete Product
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`w-25`}>
          <div className={`d-flex flex-column`}>
            <div className={`cart-item`}>
              {cartItems.length === 0 && (
                <div className={`text-center`}>Your Cart is empty</div>
              )}
              {cartItems.map((product) => (
                <div key={product.kode} className={`my-3 d-flex`}>
                  <img
                    className={`rounded`}
                    src={product.picture}
                    alt=""
                    height={100}
                    width={100}
                  />
                  <div className={`mx-3 mt-3`}>
                    <div className={`fw-bold`}>{product.nama}</div>
                    <div className={`d-flex my-1`}>
                      <div
                        onClick={() => onRemove(product)}
                        className={`${styles.btnMin}`}
                      >
                        -
                      </div>
                      <div className={`${styles.qtyValue}`}>{product.qty}</div>
                      <div
                        onClick={() => onAdd(product)}
                        className={`${styles.btnPlus}`}
                      >
                        +
                      </div>
                    </div>
                    <span className={`${styles.priceFloat}`}>
                      Rp. {product.harga}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length !== 0 && (
              <>
                <div className={`d-flex justify-content-between mx-3`}>
                  <div>Total</div>
                  <div>Rp. {itemsPrice}</div>
                </div>
                <button className={`rounded m-3`} onClick={() => onProses()}>
                  Proses
                </button>
                <button
                  className={`rounded mx-3 bg-light`}
                  onClick={() => onCancel()}
                >
                  Batalkan
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      {showModal === true && (
        <>
          <div className={`${styles.checkoutWrapper}`}>
            <div className={`${styles.checkoutInner}`}>
              <div className={`d-flex justify-content-between`}>
                <div>Input Barang Baru:</div>
                <div
                  onClick={() => openModal(false)}
                  className={`${styles.btnClose} fw-bold`}
                >
                  X
                </div>
              </div>
              <div className={`formWrapper text-center`}>
                <input
                  className="mt-3 py-2 w-75"
                  type="text"
                  name="nama"
                  onChange={handleChange}
                  value={formAddBarang.nama}
                  placeholder="Nama Barang"
                />
                <br />
                <input
                  className="mt-3 py-2 w-75"
                  type="text"
                  name="kategori"
                  onChange={handleChange}
                  value={formAddBarang.kategori}
                  placeholder="Kategori"
                />
                <br />
                <input
                  className="mt-3 py-2 w-75"
                  type="text"
                  name="harga"
                  onChange={handleChange}
                  value={formAddBarang.harga}
                  placeholder="Harga Barang"
                />
                <br />
                <input
                  className="mt-3 py-2 w-75"
                  type="text"
                  name="picture"
                  onChange={handleChange}
                  value={formAddBarang.picture}
                  placeholder="Link foto barang"
                />
              </div>
              <hr />
              <button onClick={handleAddBarang}>Prosess</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
