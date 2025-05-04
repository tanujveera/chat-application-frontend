import React, { useEffect, useRef } from "react";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { addChat, fetchChatHistory } from "../../redux/chat-slice.js";
import stompClient from "../../util/websocket.js";

const Chat = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.chatMessages);
  const chatBoxRef = useRef(); // We'll use this to scroll to bottom automatically

  useEffect(() => {
    //Fetch chat history from backend (Redis) on mount
    dispatch(fetchChatHistory());

    //Configure WebSocket connection
    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");

      //Subscribe to public topic to receive messages
      stompClient.subscribe("/topic/public", (message) => {
        dispatch(addChat(JSON.parse(message.body)));
      });
    };

    //Activate WebSocket client
    stompClient.activate();

    //Cleanup: deactivate WebSocket when component unmounts
    return () => {
      stompClient.deactivate();
    };
  }, [dispatch]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a message via WebSocket
  const sendMessage = () => {
    const content = inputRef.current.value.trim();
    if (!content) return; // Avoid sending empty messages

    const message = JSON.stringify({
      sender: "John",
      content,
      type: "CHAT",
    });

    stompClient.publish({ destination: "/app/chat.sendMessage", body: message });
    inputRef.current.value = "";
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">WebSocket Chat</h2>
      <div className="chat-box" ref={chatBoxRef}>
        <div className="message-list">
          {/* Reverse so newest messages appear at the bottom */}
          {messages.slice().reverse().map((msg, index) => (
            <p key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.content}
            </p>
          ))}
        </div>
      </div>

      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
