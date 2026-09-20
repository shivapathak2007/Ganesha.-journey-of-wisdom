import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from './managers/ProgressManager';
import App from './App';
import './style.css';
createRoot(document.getElementById('root')).render(<Provider><App/></Provider>);
