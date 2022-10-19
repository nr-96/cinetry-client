import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'antd/dist/antd.min.css';

import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import Router from './Router';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
