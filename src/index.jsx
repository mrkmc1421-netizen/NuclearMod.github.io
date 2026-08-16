import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

const App = () => {
    return (
        <div className="app">
            <h1>NuclearMod</h1>
            <p>Scratch mod loading...</p>
        </div>
    );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);