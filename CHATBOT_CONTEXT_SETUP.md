# Chatbot Context Customization Guide

## Overview

The HackBase chatbot now supports custom context configuration, allowing hackathon hosts to customize the AI assistant to provide event-specific help to participants. This feature enables the chatbot to understand your hackathon's unique theme, requirements, and goals.

## Features

✨ **What's New:**
- 🎯 **Custom Hackathon Context** - Add your hackathon name, description, and specific requirements
- 🤖 **Context-Aware Responses** - The AI adjusts its responses based on your hackathon details
- ⚙️ **System Instructions** - Advanced customization for specific chatbot behavior
- 🔄 **Easy Management** - Simple UI to configure context at any time
- 📋 **Reset Capability** - Reset to default settings if needed

## How to Use

### Step 1: Start the Backend Server

Navigate to the chatbot server directory and start the backend:

```bash
cd chatbot/server
npm install  # if not already installed
node index.js
```

You should see:
```
✅ API Key loaded successfully.
Server is running on port 3000
```

### Step 2: Open the Frontend

Open `frontend/main.html` in your web browser.

### Step 3: Configure Chatbot Context

1. Click on the **🎯 Chatbot Context** link in the left sidebar
2. A modal will appear with three fields:

   - **Hackathon Name** (Required): Enter your hackathon's name
     - Example: "Web3 AI Hackathon 2026"
   
   - **Event Description & Context** (Recommended): Describe your hackathon
     - Include: theme, goals, tech stack, timeline, challenges
     - Example: "24-hour Web3 hackathon focused on AI-powered DeFi solutions. Teams will build on Solana blockchain using React and Python. Submissions due by 2 PM Sunday."
   
   - **Custom System Instructions** (Optional): Advanced configuration
     - Leave blank to use the description as context
     - Or write custom instructions to control chatbot behavior
     - Example: "Be concise, provide code examples in Python, focus on Web3 challenges, discourage off-topic questions"

3. Click **Save Context** to apply changes
4. The chatbot will now use this context for all future responses

### Step 4: Use the Customized Chatbot

Ask questions in the chat window, and the AI will provide responses tailored to your hackathon:

- ✅ Without context: "What programming languages are good for hackathons?"
- ✅ With context: "What Python libraries would work best for DeFi on Solana?"

## Backend API Endpoints

### 1. Set/Update Context
```
POST /context
Content-Type: application/json

{
  "name": "Web3 AI Hackathon 2026",
  "description": "24-hour event building AI-powered blockchain apps",
  "customInstructions": "Provide Solana-focused responses"
}
```

**Response:**
```json
{
  "message": "Context updated successfully",
  "context": {
    "name": "Web3 AI Hackathon 2026",
    "description": "24-hour event building AI-powered blockchain apps",
    "customInstructions": "Provide Solana-focused responses"
  }
}
```

### 2. Get Current Context
```
GET /context
```

**Response:**
```json
{
  "name": "Web3 AI Hackathon 2026",
  "description": "24-hour event building AI-powered blockchain apps",
  "customInstructions": "Provide Solana-focused responses"
}
```

### 3. Reset Context to Default
```
POST /context/reset
```

**Response:**
```json
{
  "message": "Context reset to default",
  "context": {
    "name": "Hackathon",
    "description": "",
    "customInstructions": ""
  }
}
```

### 4. Chat with Context-Aware AI
```
POST /chat
Content-Type: application/json

{ "message": "Help me set up a Solana wallet" }
```

**Response:**
```json
{
  "reply": "Based on our Web3 AI Hackathon focus, here's how to set up a Solana wallet for your team..."
}
```

### 5. Clear Chat History
```
POST /chat/clear
```

## How It Works

### Context Application Logic

1. **Custom Instructions Priority**: If `customInstructions` is provided, the chatbot uses those directly
2. **Description Fallback**: If only description is provided, it's appended to the default instructions
3. **Enhancement**: The hackathon name and description are added to provide event-specific context

### Example Configurations

#### Configuration 1: Web3/Blockchain Hackathon
```
Name: "SolanaBrews 2026"
Description: "48-hour hackathon building with Solana, focusing on decentralized finance (DeFi) tools and Web3 infrastructure. Required tech: Rust (optional), JavaScript/TypeScript, Phantom Wallet knowledge."
Custom Instructions: (leave blank)
```

#### Configuration 2: AI/ML Hackathon
```
Name: "AI Innovation Lab 2026"
Description: "24-hour AI/ML hackathon emphasizing practical applications. Teams should use Python, TensorFlow/PyTorch, and modern LLMs. Focus on production-ready solutions with documentation."
Custom Instructions: "Prioritize Python solutions. Always suggest TensorFlow or PyTorch over other frameworks. Emphasize documentation and testing. Avoid proprietary AI APIs."
```

#### Configuration 3: Sustainability Focused
```
Name: "Green Tech Hack 2026"
Description: "Building sustainable technology solutions. Focus on reducing carbon footprint, renewable energy integration, and environmental monitoring. Tech stack: Node.js, React, MongoDB."
Custom Instructions: "All suggestions must consider environmental impact. Promote energy-efficient code and green technologies. Ask about sustainability goals for solutions."
```

## Frontend Integration

### Context Modal Features

- **Auto-load**: Loads current context when opened
- **Real-time Validation**: Basic validation ensures at least hackathon name or description
- **Error Handling**: Clear error messages if backend is unavailable
- **Success Feedback**: Modal closes and shows success message
- **Reset Confirmation**: Asks for confirmation before resetting

### Chat Integration

- **API Communication**: All messages sent to backend for context-aware processing
- **Error Display**: Network errors shown to user with helpful messages
- **Typing Indicator**: Shows while waiting for response
- **Auto-scroll**: Chat window scrolls to latest messages

## File Changes

### Backend (`chatbot/server/index.js`)
✅ Added context storage object
✅ Added `getSystemInstructions()` function
✅ Added `/context` POST endpoint
✅ Added `/context` GET endpoint
✅ Added `/context/reset` POST endpoint
✅ Added `/chat/clear` POST endpoint
✅ Updated `/chat` endpoint to use context-aware instructions

### Frontend (`frontend/main.html`)
✅ Added modal styles (`.modal`, `.form-*`, `.modal-*`)
✅ Added context modal HTML
✅ Added `openContextModal()` function
✅ Added `closeContextModal()` function
✅ Added `loadContextForm()` function
✅ Added `saveContext()` function
✅ Added `resetContextForm()` function
✅ Updated `sendMessage()` to call backend API
✅ Added "🎯 Chatbot Context" sidebar navigation item

## Troubleshooting

### Issue: "Error saving context. Make sure the backend server is running."
**Solution**: 
1. Ensure Node.js is installed
2. Check that `chatbot/server/index.js` is running
3. Verify backend is on `http://localhost:3000`
4. Check console for error messages

### Issue: Chatbot not responding to context
**Solution**:
1. New context takes effect on next message
2. Clear chat history via `POST /chat/clear` endpoint
3. Verify context was saved by clicking "Chatbot Context" again
4. Check browser console (F12) for errors

### Issue: Backend shows "GOOGLE_API_KEY is missing"
**Solution**:
1. Create `.env` file in `chatbot/server/` directory
2. Add: `GOOGLE_API_KEY=your_api_key_here`
3. Restart the server

## Advanced Usage

### Programmatic Context Setting

You can set context from any application:

```javascript
const API_URL = 'http://localhost:3000';

async function setHackathonContext() {
  const response = await fetch(`${API_URL}/context`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'My Hackathon',
      description: 'My event details',
      customInstructions: 'My custom instructions'
    })
  });
  
  const data = await response.json();
  console.log('Context set:', data);
}
```

### Chat with Context

```javascript
async function chatWithContext(message) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  console.log('AI Response:', data.reply);
}
```

## Best Practices

1. **Be Specific**: Include details about tech stack, timeline, and goals
2. **Update Before Event**: Configure context before hackathon starts
3. **Test Questions**: Ask sample questions to verify context is working
4. **Use Custom Instructions for Constraints**: If you want to prevent certain topics
5. **Reset if Needed**: Clear context and chat history if you need to change approach

## Future Enhancements

Potential improvements:
- Persistent context storage (database)
- Multiple context profiles
- Context templates for common hackathon types
- Per-user context settings
- Context analytics and tracking
- Integration with hackathon registration data

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console (F12) for error messages
3. Check backend logs for server errors
4. Verify .env file has correct API key

---

**Enjoy your customized hackathon chatbot! 🚀**
