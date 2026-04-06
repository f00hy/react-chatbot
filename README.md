# React Chatbot

This project is a small chat UI that renders user/robot messages, generates responses asynchronously, and persists the conversation in your browser so refreshing the page keeps the chat.

The live demo is hosted at: https://f00hy.github.io/react-chatbot/

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
  - [Chat Flow](#chat-flow)
  - [Bot Responses](#bot-responses)
  - [Local Storage Persistence](#local-storage-persistence)
- [Local Development](#local-development)
  - [Install](#install)
  - [Run](#run)
  - [Configuration](#configuration)
  - [Switching Response Modes](#switching-response-modes)
  - [Lint and Format](#lint-and-format)
- [Build & Deploy](#build--deploy)
  - [GitHub Pages](#github-pages)
- [Project Structure](#project-structure)
- [TODO](#todo)
- [Acknowledgements](#acknowledgements)

## Features

- Send messages with `Enter` (button click also works)
- Clear the input with `Escape`
- Loading indicator while waiting for a bot response
- Auto-scroll to the latest message
- Clear all chat history via a `Clear` button
- Persist chat history to `localStorage`
- Use prior chat history as context for LLM responses

## Tech Stack

- React
- TailwindCSS
- `@google/genai` for Gemini LLM responses
- `supersimpledev` for simulated chatbot responses ([npm](https://www.npmjs.com/package/supersimpledev))
- `dayjs` for formatting timestamps

## How It Works

### Chat Flow

1. `src/App.jsx` initializes `chatMessages` from `localStorage` and keeps it synced back to `localStorage`.
2. `src/components/ChatMessages.jsx` renders the message list and auto-scrolls whenever messages change.
3. `src/components/ChatInput.jsx` handles input, sends messages, and triggers the bot response.

### Bot Responses

This project supports two response modes:

1. **Hosted demo mode (simulated responses)**  
   The live demo at `https://f00hy.github.io/react-chatbot/` uses the simulated response approach from `supersimpledev` (`Chatbot.getResponseAsync(inputText)`).

2. **Local/dev mode (Gemini LLM)**  
   Local development can use Gemini through `@google/genai`, where `ChatInput` creates a chat session, sends the message, and streams response chunks back into the UI.
   The LLM is also given prior chat history so responses are context-aware across the conversation.

In both modes, a loading spinner is appended while waiting for a bot response, then replaced with the final response text.

### Local Storage Persistence

Conversation state is stored in `localStorage` under the key `messages`.

- On initial load, `src/App.jsx` reads `localStorage.getItem('messages')`.
- On every chat update, `src/App.jsx` writes the updated `chatMessages` back via `localStorage.setItem('messages', ...)`.
- In Gemini LLM mode, the saved chat history is also passed as conversation context for follow-up responses.

The `Clear` button resets the React state to an empty array, which also clears the stored `messages`.

## Local Development

### Install

```bash
pnpm install
```

You can also use npm:

```bash
npm install
```

### Run

```bash
pnpm dev
```

### Configuration

Create a `.env` file from `.env.example` and set:

```env
VITE_GEMINI_API_KEY=your-api-key
VITE_GEMINI_MODEL=gemini-2.5-flash
```

Without a valid Gemini API key, local LLM mode will not work.

### Switching Response Modes

In `src/components/ChatInput.jsx`, you can switch modes by comment/uncomment:

- **Use Gemini LLM mode (current local default):**
  - Keep `GoogleGenAI` import and Gemini chat code enabled.
  - Keep `supersimpledev` import and `Chatbot.getResponseAsync(...)` block commented.
- **Use simulated response mode:**
  - Uncomment `Chatbot` import and the simulated response block.
  - Comment Gemini-specific import/code path.

This lets you keep parity with the hosted demo behavior while still supporting LLM locally.

### Lint and Format

```bash
pnpm lint
pnpm format
```

## Build & Deploy

```bash
pnpm build
pnpm run deploy
```

The `deploy` script publishes the built output to GitHub Pages (via `gh-pages -d dist`).

### GitHub Pages

Because the demo is served from a subpath, Vite is configured with `base: '/react-chatbot/'` in `vite.config.js`.

This matches the live demo URL so assets routing work correctly when hosted under `https://f00hy.github.io/react-chatbot/`.

## Project Structure

- `src/App.jsx`: app shell, reads/writes `localStorage`, wires `ChatMessages` and `ChatInput`
- `src/components/ChatInput.jsx`: input handling, send/clear actions, loading spinner, bot call
- `src/components/ChatMessages.jsx`: message list rendering + auto-scroll
- `src/components/ChatMessage.jsx`: message bubble UI

## TODO

- Add context-length checking/truncation so long chats do not exceed model limits.
- Add a UI mode-switching button to toggle between Gemini LLM mode and simulated response mode.

## Acknowledgements

This project was built by following the [React Tutorial](https://www.youtube.com/watch?v=TtPXvEcE11E) by **SuperSimpleDev**.
