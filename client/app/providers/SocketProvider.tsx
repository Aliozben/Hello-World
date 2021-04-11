import React, {createContext} from "react";
import io from "socket.io-client";
import {SERVER} from "../configs/constants";

const socket = io.connect(SERVER.BASE_URL);
export const SocketContext = createContext<SocketIOClient.Socket>(socket);

interface Props {}
const SocketProvider: React.FC<Props> = ({children}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
