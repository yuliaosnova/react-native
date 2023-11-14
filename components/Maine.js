import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Maine = () => {
//   const state = useSelector((state) => state.auth);

  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
