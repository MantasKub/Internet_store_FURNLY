import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './SideBar.css'

function SideBar() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(resp => setCategories(resp.data));
  }, []);


  return (
    <div className="side_bar d-flex flex-column flex-shrink-0 p-3">
      <div className="home">
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0">
          <h2 className="mb-2">Home</h2>
        </Link>
      </div>
      <h4>Categories</h4>
      <ul className="categories_ul nav nav-pills flex-column mb-auto">
        {categories.map(el =>
          <li key={el.id}><Link to={'/category/' + el.id} className="category px-2 link-dar">{el.name}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default SideBar;