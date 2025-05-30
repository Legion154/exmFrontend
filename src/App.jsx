import React, { useEffect, useRef, useState } from "react";
import { Loading } from "./components/Loading";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const nameRef = useRef(null);
  const ageRef = useRef(null);

  const getUsers = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users`)
      .then((res) => setUsers(res.data));
  };

  const submitted = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users`, {
        name: nameRef.current.value,
        age: ageRef.current.value,
      })
      .then(() => getUsers());

    nameRef.current.value = null;
    ageRef.current.value = null;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return !users ? (
    <Loading />
  ) : (
    <div>
      <h1 className="text-5xl font-bold">Hello world</h1>

      <form
        onSubmit={submitted}
        className="flex flex-row items-center gap-1 mt-4"
      >
        <input
          ref={nameRef}
          type="text"
          className="rounded-md border focus:outline-none focus:border-gray-400"
          required
        />
        <input
          ref={ageRef}
          type="number"
          className="rounded-md border focus:outline-none focus:border-gray-400 w-14 text-center"
          required
        />
        <button
          type="submit"
          className="px-4 py-1 text-sm bg-gray-500 font-bold text-white rounded-md"
        >
          submit
        </button>
      </form>

      {users.map((el) => {
        return (
          <table key={el._id} className="mt-5">
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
