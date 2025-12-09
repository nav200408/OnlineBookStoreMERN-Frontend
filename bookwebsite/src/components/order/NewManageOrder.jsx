import { useEffect, useState } from "react";
import { showAllOrders, updateOrderStatus } from "../../service/orderAPI";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/NewManageOrder.css";

export function NewManageOrder() {
  let [data, setData] = useState();
  let [type, setType] = useState("Pending");
  let [changeFlag,setChangeFlag] = useState(true);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // Lấy type từ query
    const query = new URLSearchParams(location.search);
    const queryType = query.get("type");
    if (queryType && queryType !== type) {
      setType(queryType);
    }
  }, [location.search]);

  async function getData(type) {
    let res = await showAllOrders(type);
    setData(res.data);
  }

  useEffect(() => {
    getData(type);
  }, [type,changeFlag]);

  // Chuyển tab
  function handleFilter(newType) {
    setType(newType);
    navigate(`?type=${newType}`);
  }

  return (
    <>
    <h3 className="manage-order-page-title">ORDER MANAGEMENT PAGE</h3>
      {/* ---------------- FILTER BUTTONS ---------------- */}
      <div className="manage-order-filter">
        <button 
          className={`manage-order-filter-btn ${type === "Pending" ? "active" : ""}`}
          onClick={() => handleFilter("Pending")}
        >
          Pending
        </button>

        <button 
          className={`manage-order-filter-btn ${type === "Fail" ? "active" : ""}`}
          onClick={() => handleFilter("Fail")}
        >
          Fail
        </button>

        <button 
          className={`manage-order-filter-btn ${type === "Success" ? "active" : ""}`}
          onClick={() => handleFilter("Success")}
        >
          Success
        </button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <table className="manage-order-table">
        <thead>
          <tr className="manage-order-header-row">
            <th className="manage-order-header">Full Name</th>
            <th className="manage-order-header">Username</th>
            <th className="manage-order-header">Phone Number</th>
            <th className="manage-order-header">Address</th>
            <th className="manage-order-header">Payment Method</th>
            <th className="manage-order-header">Payment Status</th>
            <th className="manage-order-header">Order Info</th>
            <th className="manage-order-header">Total Price</th>
            <th className="manage-order-header">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.orders?.map((item, i) => (
            <tr className="manage-order-row" key={i}>
              <td className="manage-order-cell">{data.users[i].fullName}</td>
              <td className="manage-order-cell">{data.users[i].username}</td>
              <td className="manage-order-cell">{data.users[i].phoneNumber}</td>
              <td className="manage-order-cell">{data.users[i].address}</td>
              <td className="manage-order-cell">{data.payment[i].paymentMethod}</td>
              <td className="manage-order-cell manage-order-status-paid">
                {data.payment[i].paymentStatus}
              </td>
              <td className="manage-order-cell">
                {data.books[i].bookTitle} × {data.quantities[i]}
              </td>
              <td className="manage-order-cell">{data.payment[i].paymentAmount}</td>

              <td className="manage-order-cell manage-order-action">
                <button className="manage-order-btn fail" onClick={async ()=>{
                   let res = await updateOrderStatus(item._id,"Fail");
                   if(res.status ==200){
                   return setChangeFlag(!changeFlag);
                   }
                   alert("Some thing has happended")
                }}>Fail</button>
                <button className="manage-order-btn pending" onClick={async ()=>{
                   let res = await updateOrderStatus(item._id,"Pending");
                   if(res.status ==200){
                   return setChangeFlag(!changeFlag);
                   }
                   alert("Some thing has happended")
                }}>Pending</button>
                <button className="manage-order-btn success" onClick={async ()=>{
                   let res = await updateOrderStatus(item._id,"Success");
                   if(res.status ==200){
                   return setChangeFlag(!changeFlag);
                   }
                   alert("Some thing has happended")
                }}>Success</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
