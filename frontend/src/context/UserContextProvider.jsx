import userContext from "./userContext.js";

const UserContextProvider = ({ children }) => {
  return <userContext.Provider value={{}}>{children}</userContext.Provider>;
};

export default UserContextProvider;
