import React, { useEffect, useState } from "react";
import Header from "../Header/header";

import AppContainer from "../Contaner/container";
import dayjs from "dayjs";
import "./Invoices.css";
export const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const getInvoices = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/v1/invoice", requestOptions)
      .then((response) => response.json())
      .then((result) => setInvoices(result))
      .catch((error) => console.log("error", error));
  };
  console.log(invoices);
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
      <Header />
      <AppContainer>
        <div className="invoices">
          <div className="contentI">
            {invoices.map((item, index) => (
              <div key={index} className="invoice-item">
                <h2 style={{ marginBottom: "20px" }}>
                  <b>{item.number} : رقم الفاتورة</b>
                </h2>
                <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  {dayjs(item.date).format("DD/MM/YYYY,hh:mm:A")} :التاريخ{" "}
                </p>
                <div>
                  {item.items.cart.map((product, idx) => (
                    <div key={idx}>
                      <p>{product.qt} : الكمية</p>
                      <p>الاسم:{product.product.name}</p>
                      <p>
                        {Number(product.product.price).toLocaleString("en")} :
                        السعر
                      </p>
                      <img
                        src={product.product.image}
                        alt={product.product.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};
