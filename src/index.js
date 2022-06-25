import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const title = 'React 18 with Webpack and Babel';
const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App title={title} />);
