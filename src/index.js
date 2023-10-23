// Euan Chree
// 1912490

// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import PrivateRoute from "./routes/privateroute.js"
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Signup from "./signup";
import Login from "./login";
import Logoff from "./logoff";
import "./index.css";
import "./bulma.css";
import reportWebVitals from './reportWebVitals';
import store from './reduxstore'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logoff",
        element: 
          <PrivateRoute>,
            <Logoff />,
          </PrivateRoute>
        
      },
    ],
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
