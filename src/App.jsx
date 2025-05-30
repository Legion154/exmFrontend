import React, { useEffect, useRef, useState } from "react";
import { Loading } from "./components/Loading";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(import.meta.env.VITE_REACT_APP_BACKEND_URL);

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

  const deleteUser = (id) => {
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users/${id}`)
      .then(() => getUsers());
  };
  useEffect(() => {
    socket.on("user-updated", getUsers);

    return () => socket.off("user-updated", getUsers);
  }, []);

  return !users ? (
    <Loading />
  ) : (
    <main className="p-2">
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
                <th>
                  <button
                    onClick={() => deleteUser(el._id)}
                    className="ml-10 px-4 py-0.5 text-sm text-white bg-red-500 rounded-md"
                  >
                    delete
                  </button>
                </th>
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
    </main>
  );
};

export default App;
