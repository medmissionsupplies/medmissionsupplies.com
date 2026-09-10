import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App, pageFromPath } from './App.jsx';
import './styles.scss';

const root = document.getElementById('root');
const app = <App page={document.documentElement.dataset.page || pageFromPath(window.location.pathname)} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
