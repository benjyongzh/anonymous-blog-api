/* import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./authSlice";

export const UserView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchData("/"));
  }, []);

  return (
    <div>
      <h2>List of users</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

export const CakeView = () => {
  const [value, setValue] = React.useState(1);
  //useSelector takes a function, which takes the redux's state as an arg. this function then returns a value
  //state here is redux state, which contains multiple reducers (cake, icecream and user)
  //numOfCakes is basically the property of the cake reducer, found in the cake slice
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);

  //useDispatch returns a function of a dispatch from the redux store
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of cakes - {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button onClick={() => dispatch(restocked(value))}>Restock cakes</button>
    </div>
  );
};
