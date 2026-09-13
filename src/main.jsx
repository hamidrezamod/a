import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { registerPersianFont } from './utils/persianFont.js';
import './styles/index.css';

// اگر فونت فارسی در src/assets/fonts/persian باشد، خودکار فعال می‌شود.
// تا آن زمان، فونت‌های جانشین استفاده می‌شوند.
registerPersianFont();

const container = document.getElementById('root');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
