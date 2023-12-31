import { useState } from "react";
import Header from "../Header/header";
import AppContainer from "../Contaner/container";
import Swal from "sweetalert2";
import "./products.css";
import AddProducts from "../Add/Add";
import EditProducts from "../Edit/edit";
import { MdOutlineDelete } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  var requestOptions = {
    method: "GET",
  };
  fetch(
    `http://localhost:3000/api/v1/product/all?search=${search}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => setProducts(result))
    .catch((error) => console.log("error", error));

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch({
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(console.log);

        var requestOptions = {
          method: "DELETE",
        };
        fetch(
          `http://localhost:3000/api/v1/product/delete/${id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => console.log("error", error));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleInputChange = () => {
    setSearch(value);
  };

  return (
    <div>
      <Header />
      <AppContainer>
        <div className="contentP">
          <p className="haed">All products in the menu</p>

          <div className="search-edit">
            <div className="search-box">
              <button onClick={handleInputChange}>
                <SearchOutlined
                  style={{ paddingLeft: "10px", fontSize: "15px" }}
                />
              </button>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search"
                style={{ outline: "none", border: "none" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch(value);
                  }
                }}
              />
            </div>
            <AddProducts />
          </div>

          <div className="grid">
            {products.map((item, i) => (
              <div key={i} className="content-product">
                <img src={item.image} alt="/" />
                <div className="content-card">
                  <p>{item.name}</p>
                  <span>
                    {Number(item.price).toLocaleString("en")}
                    <b>$</b>
                  </span>
                </div>
                <div className="delete-edit">
                  <MdOutlineDelete
                    className="delete"
                    onClick={() => handledelete(item.id)}
                  />
                  <EditProducts />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};
