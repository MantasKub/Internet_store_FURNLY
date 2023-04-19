import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';
import AdminTableButtons from '../../components/adminTableButtons/AdminTableButtons';

function Categories() {
  const { setLoading, refresh, setRefresh, setMessage } = useContext(MainContext);
  const [data, setData] = useState([]);


  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(resp => {
        setData(resp.data)
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = (id) => {
    setLoading(true);

    axios.delete('http://127.0.0.1:8000/api/categories/' + id)
      .then(resp => {
        setMessage({ m: resp.data, s: 'success' });
        setRefresh(!refresh);
      })
      .finally(() => setLoading(false));
  }


  return (
    <>
      <div className="s-flex justify-content-between align-items-center">
        <h1>Categories list</h1>
        <Link to="/admin/new-category" className="btn btn-primary">New category</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Creation date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{(new Date(item.created_at)).toLocaleString('lt-LT')}</td>
              <td>
                <AdminTableButtons id={item.id} link="category" deleteFn={handleDelete} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )

}

export default Categories;