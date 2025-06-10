import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// router for record components (record.js) in server, so that only components will refresh
/*const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children: [
      {
        path:'/',  
        element:'<RecordList />',
      },
    ],
  },
  {
    path:'/edit/:id',
    element:<App />,
    children: [
      {
        path:'/edit/:id',  
        element:'<Record />',
      },
    ],
  },
  {
    path:'/create',
    element:<App />,
    children: [
      {
        path:'/create',  
        element:'<Record />',
      },
    ],
  },
  ]);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();