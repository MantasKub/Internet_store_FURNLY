import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';

function Orders() {
  const { setLoading, refresh, setRefresh, setMessage } = useContext(MainContext);
  const [data, setData] = useState([]);


  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/orders')
      .then(resp => {
        setData(resp.data)
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleChange = (id, is_completed) => {
    setLoading(true);

    axios.put('http://127.0.0.1:8000/api/orders/' + id, { is_completed: !is_completed })
      .then(resp => {
        setMessage({ m: resp.data, s: 'success' });
        setRefresh(!refresh);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="s-flex justify-content-between align-items-center">
        <h1>Orders list</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Adress</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Payment method</th>
            <th>Shipping method</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.adress}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.payment_method === 1 && 'Paysera'}
                {item.payment_method === 2 && 'Visa'}
                {item.payment_method === 3 && 'MasterCard'}
              </td>
              <td>{item.shipping_method === 1 ? 'Pickup at DPD post machine' : 'Home delivery'}</td>
              <td>
                <div className="form-check form-switch">
                  <label className="form-check-label">
                    <input className="form-check-input"
                      type="checkbox"
                      role="switch"
                      onChange={() => handleChange(item.id, item.is_completed)}
                      checked={item.is_completed}
                    />
                    {!item.is_completed ? 'Being prepared' : 'Shipped'}
                  </label>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table >
    </>
  );
}

export default Orders;
