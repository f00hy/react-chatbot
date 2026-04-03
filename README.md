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
  - [Lint and Format](#lint-and-format)
- [Build & Deploy](#build--deploy)
  - [GitHub Pages (base path)](#github-pages-base-path)
- [Project Structure](#project-structure)
- [Acknowledgements](#acknowledgements)

## Features

- Send messages with `Enter` (button click also works)
- Clear the input with `Escape`
- Loading indicator while waiting for a bot response
- Auto-scroll to the latest message
- Clear all chat history via a `Clear` button
- Persist chat history to `localStorage`

## Tech Stack

- React
- TailwindCSS
- `supersimpledev` for simulated chatbot responses ([npm](https://www.npmjs.com/package/supersimpledev))
- `dayjs` for formatting timestamps

## How It Works

### Chat Flow

1. `src/App.jsx` initializes `chatMessages` from `localStorage` and keeps it synced back to `localStorage`.
2. `src/components/ChatMessages.jsx` renders the message list and auto-scrolls whenever messages change.
3. `src/components/ChatInput.jsx` handles input, sends messages, and triggers the bot response.

### Bot Responses

When you send a message, `ChatInput` calls `Chatbot.getResponseAsync(inputText)` from `supersimpledev`.

While the response is being fetched, a spinner is appended to the chat. When the response arrives, the spinner is replaced with the returned response text.

### Local Storage Persistence

Conversation state is stored in `localStorage` under the key `messages`.

- On initial load, `src/App.jsx` reads `localStorage.getItem('messages')`.
- On every chat update, `src/App.jsx` writes the updated `chatMessages` back via `localStorage.setItem('messages', ...)`.

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

## Acknowledgements

This project was built by following the [React Tutorial](https://www.youtube.com/watch?v=TtPXvEcE11E) by **SuperSimpleDev**.
