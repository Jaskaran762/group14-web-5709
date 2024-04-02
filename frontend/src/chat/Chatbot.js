import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment, Button } from "semantic-ui-react";
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import { ThemeProvider } from "styled-components"; 

const CHATBOT_THEME = {
  background: "#FFFEFC",
  fontFamily: "Roboto",
  headerBgColor: "#4C4B42",
  headerFontColor: "#FFFFFF", 
  headerFontSize: "11px",
  botBubbleColor: "#e9e7dd",
  botFontColor: "#4C4B42",
  userBubbleColor: "#FFBFB5",
  userFontColor: "#fff"
};

const StyledButton = styled(Button)({
  backgroundColor: "#4C4B42",
  color: "white",
  padding: "10px 15px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#e9e7dd",
    color: "#4C4B42"
  },
});

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to our Finance App',
      trigger: 'AskName'
    },
    {
      id: 'AskName',
      message: 'Please enter your name',
      trigger: 'Waiting1'
    },
    {
      id: 'Waiting1',
      user: true,
      trigger: 'End'
    },
    {
      id: 'End',
      message: 'Thank you! Your name has been recorded.',
      end: true
    }
  ];

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      <StyledButton onClick={toggleChat}>
        {showChat ? <ChatIcon /> : <ChatIcon />}
      </StyledButton>
      <Segment style={{ display: showChat ? "block" : "none", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "5px", marginTop: "20px" }}>
        <ThemeProvider theme={CHATBOT_THEME}>
          <ChatBot steps={steps} />
        </ThemeProvider>
      </Segment>
    </div>
  );
};

export default Chatbot;
