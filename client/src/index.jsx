import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '../src/assets/font-awesome/css/font-awesome.min.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);