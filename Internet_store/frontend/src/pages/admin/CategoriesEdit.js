import { useState, useEffect, useContext } from 'react';
//------Atsakingas uztai kad galetume peradresuoti is vieno tasko i kita-------------
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainContext from '../../context/MainContext';



function EditCategories() {

  const { setLoading, setMessage } = useContext(MainContext);

  const [data, setData] = useState({
    name: '',
    sku: '',
    photo: '',
    warehouse_qty: '',
    price: ''
  });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    setLoading(true);

    axios.get('http://127.0.0.1:8000/api/categories/' + id)
      .then(resp => setData(resp.data))
      .finally(() => setLoading(false));
  }, []);

  //-----------------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios.put('http://127.0.0.1:8000/api/categories/' + id, data)
      .then(resp => {
        setMessage({ m: resp.data, s: 'success' });
        setTimeout(() => navigate('/admin/categories'), 2000);
      })
      .catch(error => {
        setMessage({ m: error.response.data, s: 'danger' })
      })
      .finally(() => setLoading(false));
  }

  const handleField = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  return (
    <>
      <h1>Edit category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" name="name"
            className="form-control"
            value={data.name}
            onChange={handleField}
            required
          />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </>
  );
}

export default EditCategories;