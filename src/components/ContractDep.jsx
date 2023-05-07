import React, { useEffect, useState } from "react";
import emblem from "../images/logo.png";
import "../css/ContractDep.css";
import { NavLink } from "react-router-dom";

const ContractDep = (props) => {
  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [adminData, setAdminData] = useState({
    address: "",
  });

  const onChangeFunc = (event) => {
    const { name, value } = event.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async () => {
    await contract.addAdmin(
      adminData.address,
      {
        from: account,
      }
    );

    console.log("admin details submitted");
    setAdminData({ address: "" });
  };

  return (
    <div className="container superAdmin-mainDiv">
      <div className="superAdmin-heading-div">
              <NavLink to="/">
          <img src={emblem} alt="emblem" className="emblem" />
        </NavLink>
        <h1>Contract Owner</h1>
      </div>

      <p className="superAdmin-p">Add an Admin</p>

      <form method="POST" className="admin-form">
        <div className="form-group">
          <label>Admin Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter admin address"
            autoComplete="off"
            value={adminData.address}
            onChange={onChangeFunc}
          />
        </div>
      </form>
      <button className="admin-form-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ContractDep;
