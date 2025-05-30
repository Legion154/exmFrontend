import React, { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users`)
      .then((res) => setUsers(res.data));
  }, []);

  return !users ? (
    <Loading />
  ) : (
    <div>
      <h1>Hello world</h1>

      <label htmlFor="new">
        <input type="text" name="new" />
        <input type="number" />
        <button type="submit">submit</button>
      </label>

      {users.map((el) => {
        return (
          <table key={el._id}>
            <thead>
              <tr>
                <th>{el._id}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{el.name}</td>
                <td>{el.age}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default App;
