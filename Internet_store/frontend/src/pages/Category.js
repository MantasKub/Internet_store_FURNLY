import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../context/MainContext';
import Product from '../components/product/Product';

function Category() {

  const [data, setData] = useState([]);
  const { refresh, setLoading, setMessage } = useContext(MainContext);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setMessage(false);

    axios.get('http://127.0.0.1:8000/api/categories/products/' + id)
      .then(resp => setData(resp.data))
      .finally(() => setLoading(false))
  }, [refresh, id]);

  return (
    <>
      <h1>{data.name}</h1>
      <div className="row">
        {data.products && data.products.map(product =>
          <Product key={product.id} data={product} />
        )}
      </div>
    </>
  );
}

export default Category;
