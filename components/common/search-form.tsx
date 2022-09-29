import { FaSpinner } from "react-icons/fa";

const SearchForm = () => {
  return (
    <div className="form-control">
      <div className="input-group">
        <select className="select select-bordered">
          <option disabled selected value="post">
            Post
          </option>
          <option value="term">term</option>
        </select>
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered border-l-0"
        />
        <button className="btn">Go</button>
      </div>
    </div>
  );
};

export default SearchForm;
