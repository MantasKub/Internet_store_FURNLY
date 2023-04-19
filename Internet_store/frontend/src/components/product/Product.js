import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

function Product({ data }) {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    return navigate('/' + data.id + '/' + qty);
  }

  return (
    <div className="col-3" key={data.id}>
      <div className="product_img">
        <img
          src={data.photo}
          alt={data.name}
        />
      </div>
      <div className="product_info">
        <h4>{data.name}</h4>
        <h5>€ {data.price}</h5>
      </div>
      <form className="py-2 input-group mb-3"
        onSubmit={handleSubmit}
      >
        <input type="number"
          value={qty}
          className="form-control"
          onChange={(e) => setQty(e.target.value)}
        />
        <button className="btn brown_button">Order</button>
      </form>
    </div>
  )
}

export default Product;