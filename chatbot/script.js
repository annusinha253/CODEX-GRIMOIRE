const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const suggestionChips = document.querySelectorAll(".chip");

const COHERE_API_KEY = "oBN7YJP6PiacG79pYNCH92qGtyIrHv17JCM8CiYF";

// Chat history to maintain context
let chatHistory = [];

// Add welcome message when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    appendMessage("Ghummakar AI", "Hello! I'm your virtual travel assistant. Ask me anything about destinations, travel tips, or help planning your next adventure!");
  }, 500);
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // Add to chat history for context
  chatHistory.push({role: sender === "You" ? "USER" : "CHATBOT", message: text});
  
  // Keep chat history to last 10 messages to avoid token limits
  if (chatHistory.length > 10) {
    chatHistory = chatHistory.slice(chatHistory.length - 10);
  }
}

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  userInput.value = "";

  const typingMsg = document.createElement("div");
  typingMsg.innerHTML = `<strong>Ghummakar AI:</strong> <span class="typing">Thinking...</span>`;
  chatBox.appendChild(typingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage,
        model: "command-r-plus",
        temperature: 0.7,
        chat_history: formatChatHistory(),
        connectors: [],
        prompt_truncation: "auto",
        preamble: `You are Ghummakar AI, a helpful travel assistant for the Ghummakar travel app. 
        Your expertise is in providing travel advice, destination information, itinerary suggestions, 
        local customs, and travel tips. Keep your answers helpful, friendly, and focused on travel. 
        If asked about non-travel topics, gently steer the conversation back to travel. 
        Use a conversational, friendly tone and offer specific, practical advice when possible.`
      })
    });

    const data = await response.json();
    let reply = data.text || "Sorry, I couldn't generate a reply. Please try again.";

    chatBox.removeChild(typingMsg);
    appendMessage("Ghummakar AI", reply);

  } catch (error) {
    chatBox.removeChild(typingMsg);
    appendMessage("Ghummakar AI", "⚠️ I'm having trouble connecting right now. Please try again later.");
    console.error("API Error:", error);
  }
}

// Format chat history for the API
function formatChatHistory() {
  return chatHistory.map(msg => ({
    role: msg.role,
    message: msg.message
  }));
}

// Handle suggestion chips
suggestionChips.forEach(chip => {
  chip.addEventListener('click', function() {
    userInput.value = this.textContent;
    sendMessage();
  });
});

// Send message on Enter key
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Add typing animation
const style = document.createElement('style');
style.innerHTML = `
  .typing {
    display: inline-block;
    position: relative;
  }
  .typing:after {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: currentColor;
    animation: blink 0.8s infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
`;
document.head.appendChild(style);
