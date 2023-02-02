import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext([null, (user) => user]);

UserContext.displayName = "Language";

export const UserProvider = ({ value, children }) => {
  const [user, setUser] = useState(null);

  const [data, setData] = value;

  useEffect(() => {
    setUser(data);
  }, [data]);

  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any.isRequired,
  value: PropTypes.object,
};

export const useUser = () => useContext(UserContext);
