import "./Add.css";
import { Button, Modal } from "antd";
import { useState } from "react";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setName("");
    setPrice("");
    setImage("");
    setCategoryid("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name,
      price,
      image,
      categoryid,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("http://localhost:3000/api/v1/product/add", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Product Add successfully");
      })
      .catch((error) => console.log("error", error));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="body">
        <Button className="add" onClick={showModal}>
          + New Products{" "}
        </Button>
        <Modal
          title="Add New Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className="butt"
            ></input>
          </div>

          <div>
            <p> Price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder=""
              className="butt"
            ></input>
          </div>

          <div>
            <p> Image</p>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder=""
              className="butt"
            ></input>
          </div>

          <div>
            <p> categoryid</p>
            <input
              value={categoryid}
              onChange={(e) => setCategoryid(e.target.value)}
              placeholder=""
              className="butt"
            ></input>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default AddProducts;
