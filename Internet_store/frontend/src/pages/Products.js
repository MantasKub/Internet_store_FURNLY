import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import MainContext from '../context/MainContext';
import Product from '../components/product/Product';
import '../components/product/Product.css';

function Products() {
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const { data, setData, refresh, setLoading, setMessage } = useContext(MainContext);


  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/products/';

    if (sort != '' && direction != '') {
      url += sort + '/' + direction + '/';
    }

    setLoading(true);
    setMessage(false);
    //----------Paimame duomenis fetch funkcija--------------
    //   fetch('http://127.0.0.1:8000/api/')
    //     .then(resp => resp.json())
    //     .then(resp => {
    //       setData(resp);
    //     });

    //----------Paimame duomenis axios modulio pagalba--------

    axios.get(url)
      .then(resp => setData(resp.data))
      .finally(() => setLoading(false));
  }, [refresh, sort, direction]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center ms-3">
        <h1>New products</h1>
        <div className="sort d-flex gap-2">
          <select
            className="form-select"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Select order</option>
            <option value="name">By name</option>
            <option value="price">By price</option>
          </select>
          <select
            className="form-select"
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="">Select direction</option>
            <option value="asc">Asceding</option>
            <option value="desc">Desceding</option>
          </select>
        </div>
      </div>

      <div className="row">
        {data.map(product =>
          <Product key={product.id} data={product} />
        )}
      </div>
    </>
  );
}

export default Products;
