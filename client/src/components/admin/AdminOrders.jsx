import React,{useEffect,useState} from "react";
import './AdminMenu.scss'
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";
import moment from "moment"
const {Option} =Select
const AdminOrders = () => {

  const [auth,setAuth]=useAuth()
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
      console.log(orders)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
    <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul className="nav-list">
            <li><NavLink to="/admin/create-product" className="item">Create Product</NavLink></li>
            <li><NavLink to="/admin/create-category" className="item">Create category</NavLink></li>
            <li><NavLink to="/admin/users" className="item">User</NavLink></li>
            <li><NavLink to="/admin/products" className="item">Products</NavLink></li>
            <li><NavLink to="/admin/orders" className="item">Orders</NavLink></li>
        </ul>
    </div>
    <div className="content">
        <div className="detail">
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`http://localhost:8080/api/v1/product/get-product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
            
        </div>
    </div>

    </div>
  );
};

export default AdminOrders;