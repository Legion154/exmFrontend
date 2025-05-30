import React, { useEffect, useState } from "react";
import { Loading } from "./components/Loading";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const api = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users`
    );
    const res = api.json();
    setUsers(res.data);
  }, []);

  return !users ? (
    <Loading />
  ) : (
    <div>
      <h1>Hello world</h1>
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
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default App;
