import "./item.css";
import { categories, products } from "../../fake";
import { useEffect, useState } from "react";
export const Items = () => {
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);
  const [cats, setCats] = useState([]);

  const getProducts = (cat) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let url = "http://localhost:3000/api/v1/product/all";
    if (cat) url = `http://localhost:3000/api/v1/product?cat=${cat}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => setList(result))

      .catch((error) => console.log("error", error));
  };

  const getCategories = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/v1/category", requestOptions)
      .then((response) => response.json())
      .then((result) => setCats(result))

      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handleAdd = (item) => {
    let index = cart?.findIndex((el) => el.product.id === item.id);
    if (index === -1) {
      let newObj = { product: item, qt: 1 };
      setCart([...cart, newObj]);
    }
  };

  const handleInc = (item) => {
    setCart(
      cart.map((el) => {
        if (el?.product?.id === item?.product?.id) el.qt = el.qt + 1;
        return el;
      })
    );
  };

  const handledec = (item) => {
    if (item.qt === 1)
      setCart(cart.filter((el) => el.product.id !== item.product.id));
    else
      setCart(
        cart.map((el) => {
          if (el?.product?.id === item?.product?.id) el.qt = el.qt - 1;
          return el;
        })
      );
  };

  const getTotal = () => {
    return cart
      ?.map((el) => el.product.price * el.qt)
      ?.reduce((a, b) => a + b, 0);
  };

  const handleConfirm = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      items: { cart },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("http://localhost:3000/api/v1/invoice/add", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="items">
    <div className="content">
      <div className="items">
        <div className="categories">
          {cats.map((el, i) => (
            <div onClick={() => getProducts(el.id)} key={i} className="card">
              <p>{el.name}</p>
            </div>
          ))}
        </div>
        <div className="products">
          {list.map((ietm, i) => (
            <div onClick={() => handleAdd(ietm)} key={i} className="grid">
              <img src={ietm.image} alt="صورة" />
              <div className="content-card">
                <p>{ietm.name}</p>
                <span>{Number(ietm.price).toLocaleString("en")}<b>$</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="invoice">
        <h2>Items List</h2>
        <div className="itemsList">
          {cart.map((el, i) => (
            <div key={i} className="invoiceCard">
              <div className="qt">
                <button onClick={() => handleInc(el)}>+</button>
                <p>{el.qt}</p>
                <button onClick={() => handledec(el)}>-</button>
              </div>
              <div style={{ textAlign: "end" }}>
                <p>{el.product.name}</p>
                <b>{Number(el.product.price * el.qt).toLocaleString("en")}</b>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <p>Total Value:</p>
          <h1>{Number(getTotal()).toLocaleString("en")}$</h1>
        </div>
        <div className="action">
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
    </div>
  );
};
