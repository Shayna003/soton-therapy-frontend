import { useEffect, useState, useMemo } from "react";
import { NavBar } from "@/components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx"
import {
  selectCurrentModel,
  selectCurrentModelMessages,
  selectIsAIGenerating,
  selectUserModels,
  setCurrentModelMessages,
  setIsAIGenerating,
  setSelectedModel,
  setUserModels,
} from "@/state/slices/chatSlice";
import {
  usePostFetchMessagesMutation,
} from "@/state/api/chatApi";
import { AIModel, ChatMessage, MessagesResponse, ModelListResponse, UserModelListResponse } from "@/types";
import { selectUserInfo } from "@/state/slices/authSlice";
import { usePostFetchUserModelsMutation, usePostSearchModelMutation } from "@/state/api/modelsApi";
import { useSocket } from "@/io/socket";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [modelName, setModelName] = useState("");
  const [searchModelsList, setSearchModelsList] = useState<AIModel[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const currentModel = useSelector(selectCurrentModel);
  const userInfo = useSelector(selectUserInfo);
  const userModels = useSelector(selectUserModels);
  const messages = useSelector(selectCurrentModelMessages);
  const isAIGenerating = useSelector(selectIsAIGenerating);
  const dispatch = useDispatch();

  const [triggerSearchModel] = usePostSearchModelMutation();
  const [triggerFetchMessages] = usePostFetchMessagesMutation();
  const [triggerFetchUserModels] = usePostFetchUserModelsMutation();
  const socket = useSocket();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    if (currentModel?._id && userInfo?.id) {
        socket.emit("send-message", {
            sender: userInfo.id,
            content: message,
            receiver: currentModel._id,
            receiverModel: "AIModel",
            isAI: false,
            messageType: "text"
        });
    }
    setMessage("");
    dispatch(setIsAIGenerating(true));
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSearch = async () => {
    if (modelName.trim()) {
      const result = await triggerSearchModel({ searchTerm: modelName.trim() }) as ModelListResponse | any;
      if (result?.data?.aiModels) {
        setSearchModelsList(result.data.aiModels);
      } else {
        setSearchModelsList([]);
      }
    }
  };

  const mergedModels = useMemo(() => {
    const hasCurrent = userModels.some((model) => model._id === currentModel?._id);
    return hasCurrent || !currentModel
      ? userModels
      : [currentModel, ...userModels];
  }, [userModels, currentModel]);

  const selectModel = async (model: AIModel) => {
    setShowSearchModal(false);
    dispatch(setSelectedModel(model));
    dispatch(setIsAIGenerating(false));
    const result = await triggerFetchMessages({
        aiModelId: model._id,
        receiverModel: "AIModel"
    }) as MessagesResponse;

    const messages: ChatMessage[] = result.data.messages;
    dispatch(setCurrentModelMessages(messages));
  }

  useEffect(() => {
      const element : HTMLElement | null = document?.getElementById("messages-list");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
  }, [messages]);

  const fetchUserModels = async () => {
    const result = await triggerFetchUserModels({limit: 10}) as UserModelListResponse;
    if (result?.data?.models) {
        dispatch(setUserModels(result.data.models));
    }
  }

  useEffect(() =>  {
    fetchUserModels();    
  }, [currentModel]);

  useEffect(() => {
    if (showSearchModal) {
      document.getElementById("searchModelInput")?.focus();
    }
  }, [showSearchModal]);

  useEffect(() => {
    if (currentModel) {
      document.getElementById("messageInput")?.focus();
    }
  }, [currentModel]);

  useEffect(() => {
    if (!isAIGenerating) {
      document.getElementById("messageInput")?.focus();
    }
  }, [isAIGenerating]);


  const searchModelModal = () => {
    if (!showSearchModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-5 rounded-xl w-3/5 max-w-[40vw] h-50vh max-h-[50vh] shadow-lg relative flex flex-col">
          <button
            className="absolute top-2 right-3 text-gray-500 hover:text-red-400 text-lg"
            onClick={() => setShowSearchModal(false)}
          >
            ✕
          </button>

          <h2 className="text-xl mb-4 text-blue-500">Search AI Models</h2>

          <input
            id="searchModelInput"
            type="text"
            value={modelName}
            onChange={(e) => {
              setModelName(e.target.value);
              handleSearch();
            }}
            placeholder="Enter model name or keywords..."
            className="w-full mb-4 p-2 border border-blue-300 rounded-md"
          />

        <div className="overflow-auto">
            {searchModelsList.length > 0 ? (
                <ul className="space-y-2">
                {searchModelsList.map((model) => (
                    <li key={model._id} onClick={(evnt) => {selectModel(model)}} className="border border-gray-200 rounded-md p-3 hover:bg-blue-50 cursor-pointer">
                    <h3 className="text-blue-500">{model.name}</h3>
                    <p className="text-sm text-gray-600">{model.description || "No description provided."}</p>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-gray-500">No models found. Try typing something.</p>
            )}
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <NavBar />
      {searchModelModal()}

      <div className="flex flex-row flex-grow">
        <div id="model-list" className="flex flex-col border-r-2 border-blue-300 w-1/5 -mt-20 bg-blue-50">
          <button
                className="cursor-pointer rounded-xl mt-25 m-5 border-2 border-blue-400 hover:shadow-lg active:bg-blue-100 bg-white hover:shadow-blue-400/50 p-2 text-blue-400"
                onClick={() => setShowSearchModal(true)}
              >
                +
            </button>
            <div>
            {mergedModels.length > 0 ? (
                <ul className="space-y-2 px-5 overflow-auto">
                {mergedModels.map((model) => {
                    let isSelected = model._id === currentModel?._id;
                    return (
                    <li
                        key={model._id}
                        onClick={() => selectModel(model)}
                        className={clsx(
                        "border-2 rounded-xl p-3 cursor-pointer transition",
                        isSelected
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-400 hover:bg-blue-50"
                        )}
                    >
                        <h3 className={clsx("text-base", isSelected ? "text-blue-700" : "text-blue-500")}>
                        {model.name}
                        </h3>
                        <p className="text-sm text-gray-500">{model.description || "No description provided."}</p>
                    </li>
                    );
                })}
                </ul>
            ) : (
                <p className="text-gray-500 text-center text-sm px-5">No models yet. Try searching for one.</p>
            )}
            </div>
        </div>
        <div id="chat-area" className="flex flex-col w-4/5 flex-grow max-h-[95vh]">
            {currentModel ? (
                <>
                {/* Message history container (scrollable) */}
                <div
                    id="message-history"
                    className="flex flex-col w-full mt-5 min-h-[80%] max-h-[80%] px-10"
                >
                    {messages.length > 0 ? (
                    <ul id="messages-list" className="flex flex-col px-50 gap-3 overflow-auto h-full">
                        {messages.map((msg) => (
                        <li
                            key={msg._id}
                            className={`max-w-[70%] border rounded-lg p-3 ${
                            msg.senderModel === "AIModel"
                                ? "bg-blue-100 text-left mr-auto border-blue-200"
                                : "bg-green-100 text-right ml-auto border-green-200"
                            }`}
                        >
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(msg.timeStamp).toLocaleString()}</p>
                        </li>
                        ))}
                    </ul>
                    ) : null}
                </div>

                {/* Input area — fixed height */}
                <div id="send-area" className="flex flex-col p-5 border-blue-200 justify-center items-center  w-4/5 gap-2 absolute bottom-0">
                    <textarea
                    id="messageInput"
                    disabled={isAIGenerating}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ resize: "none" }}
                    className="border-2 h-20 border-blue-300 bg-blue-50 rounded-3xl p-3 w-3/5"
                    placeholder="Ask anything"
                    />
                    <p className="text-gray-400 text-sm">This chatbot cannot replace professional therapy.</p>
                </div>
                </>
            ) : (
                <div className="flex flex-col flex-grow gap-5 justify-center items-center h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
                <p className="text-blue-500 text-lg">
                    Welcome, <span className="text-2xl text-blue-600">{userInfo?.firstName}</span>
                </p>
                <p className="text-blue-500 text-lg">Select a model at the left to begin.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};