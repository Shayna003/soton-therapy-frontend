import { Context, createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "@/constants";
import { selectUserInfo } from "@/state/slices/authSlice";
import { addNewMessage, selectCurrentModel, setIsAIGenerating, setSelectedModel } from "@/state/slices/chatSlice";
import { ChatMessage } from "@/types";

const SocketContext : Context<Socket | null> = createContext<Socket | null>(null);
export const useSocket = (): Socket | null => useContext(SocketContext);


export const SocketProvider = ({children} : any) => {
  const userInfo = useSelector(selectUserInfo);
  const currentModel = useSelector(selectCurrentModel);
  const currentModelRef = useRef(currentModel);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    currentModelRef.current = currentModel;
  }, [currentModel]);

  useEffect(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    if (userInfo) {
      const s = io(BACKEND_URL.replace("http", "ws"), {
        withCredentials: true,
        query: {
          userId: userInfo.id,
        },
      });

      s.on("receive-message", (message: ChatMessage) => {
        message.message = message.content;
        dispatch(addNewMessage(message));

        const activeModel = currentModelRef.current;
        
        if (message.sender === activeModel?._id) {
          dispatch(setIsAIGenerating(false));
        }
      });

      setSocket(s);
    }

  }, [userInfo, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

