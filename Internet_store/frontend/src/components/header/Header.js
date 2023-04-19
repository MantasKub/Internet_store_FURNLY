import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import MainContext from '../../context/MainContext';
import './Header.css'
import furnlyLogo from '../../images/logo.png';

function Header() {

  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const { setData, setRefresh } = useContext(MainContext);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search === '') return setRefresh(buvusi => !buvusi);
    axios.get('http://127.0.0.1:8000/api/products/search/' + search)
      .then(resp => setData(resp.data))
  }

  return (
    <header className="p-3 d-flex align-items-center">
      <div className="logo">
        <img className="main_logo" src={furnlyLogo} alt="logo" />
      </div>
      <div className="header d-flex align-items-center ms-auto">
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex align-items-center" role="search" onSubmit={handleSearch}>
          <input type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
            onKeyUp={(e) => setSearch(e.target.value)}
          />
          <button className="brown_button btn ms-2">Search</button>
        </form>
        <div className="dropdown ms-2">
          <div
            className="d-block link-dark text-decoration-none dropdown-toggle"
            onMouseEnter={() => setShow(!show)}
          >
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
          </div>
          {show &&
            <ul className="dropdown-menu text-small show">
              <li><Link to="/admin" className="dropdown-item">Admin</Link></li>
              <li><Link to="/admin/categories" className="dropdown-item">Categories</Link></li>
              <li><Link to="/admin/orders" className="dropdown-item">Orders</Link></li>
            </ul>
          }
        </div>
      </div>
    </header>

  );
}

export default Header;