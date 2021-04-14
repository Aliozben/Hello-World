import React, {createContext, useContext} from "react";
import io from "socket.io-client";

import {SERVER} from "../configs/constants";
import {AuthContext} from "./AuthProvider";

let socket = io();
export const SocketContext = createContext<SocketIOClient.Socket>(socket);

interface Props {}
const SocketProvider: React.FC<Props> = ({children}) => {
  const {user} = useContext(AuthContext);

  socket = io(SERVER.BASE_URL, {
    autoConnect: false,
    query: {
      _id: user?._id,
    },
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
