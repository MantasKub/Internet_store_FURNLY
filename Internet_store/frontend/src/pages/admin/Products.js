import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';
import AdminTableButtons from '../../components/adminTableButtons/AdminTableButtons';

function Products() {
  const { setLoading, refresh, setRefresh, setMessage } = useContext(MainContext);
  const [data, setData] = useState([]);


  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/products')
      .then(resp => {
        setData(resp.data)
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = (id) => {
    setLoading(true);

    axios.delete('http://127.0.0.1:8000/api/products/' + id)
      .then(resp => {
        setMessage({ m: resp.data, s: 'success' });
        setRefresh(!refresh);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="s-flex justify-content-between align-items-center">
        <h1>Products list</h1>
        <Link to="/admin/new-product" className="btn btn-primary">New product</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>SKU</th>
            <th>Balance</th>
            <th>Price</th>
            <th>Status</th>
            <th>Categories</th>
            <th>Creation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.warehouse_qty}</td>
              <td>{item.price}</td>
              <td>{item.status ? 'Enabled' : 'Disabled'}</td>
              <td>{item.categories.map(cat => cat.name).join(',')}</td>
              <td>{(new Date(item.created_at)).toLocaleString('lt-LT')}</td>
              <td>
                <AdminTableButtons id={item.id} link="product" deleteFn={handleDelete} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Products;
