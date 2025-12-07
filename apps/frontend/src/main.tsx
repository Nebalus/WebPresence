import '@/style/globals.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import en from 'javascript-time-ago/locale/en'
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
