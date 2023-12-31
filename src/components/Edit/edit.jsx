import "./edit.css";
import { Button, Modal } from "antd";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
const EditProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name,
      image,
      price,
      categoryid,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };

    fetch(`http://localhost:3000/api/v1/product/update/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <FaRegEdit className="editbu" onClick={showModal}>
          Edit Products{" "}
        </FaRegEdit>
        <Modal
          title="Add New Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <p>ID</p>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder=""
              className="butt"
            ></input>
          </div>

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
export default EditProducts;
