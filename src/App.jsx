import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Form from './register';
// import Login from './login';
import Register from './pages/register/register'
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Groups from './pages/groups/groups';
import CreateGroup from './pages/createGroup/createGroup';
import AddMember from './pages/members/addMember';


export default function App() {
  const route = createBrowserRouter([

    {
      path: "/",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },

    {
      path: "/dashboard",
      element: <Dashboard />
    },

    // {
    //   path: "/contacts",
    //   element: <Contacts/>
    //  },

    {
      path: "/groups",
      element: <Groups />
    },

    {
      path: "/createGroup",

      // element: <CreateGroup />
      element: <CreateGroup />
    },
    {
      path: "/addMember",

      // element: <CreateGroup />
      element: <AddMember />
    },



  ]);
  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  )
}
