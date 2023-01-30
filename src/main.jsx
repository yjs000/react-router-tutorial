import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {
    loader as contactLoader,
} from "./routes/contact";
import EditContact, {
    action as editAction,
} from "./routes/edit";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
            },
            //tutorial이라서 loader를 두번 쓴거지
            //사실 일반적으로 하나의 route는 각자의 loader를 갖는다.
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
            },
        ],
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
