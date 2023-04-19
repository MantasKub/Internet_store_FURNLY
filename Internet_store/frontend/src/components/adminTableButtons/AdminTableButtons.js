import { Link } from 'react-router-dom';

function AdminTableButtons({ id, deleteFn, link }) {
  return (
    <div className="d-flex gap-3 justify-content-end">
      <button className="btn btn-danger"
        onClick={() => deleteFn(id)}>Delete</button>

      <Link to={'/admin/edit-' + link + '/' + id}
        className="btn btn-warning">Edit</Link>
    </div>
  );
}

export default AdminTableButtons;