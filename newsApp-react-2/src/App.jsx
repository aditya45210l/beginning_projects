import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><News key="general" pageSize={6} country="us" category="general"/></>,
  },
  {
    path: "/business",
    element: <><Navbar /><News key='business' pageSize={6} country="us" category="business" /></>,
  },
  {
    path: "/entertainment",
    element: <><Navbar /><News key='entertainment' pageSize={6} country="us" category="entertainment" /></>,
  },
  {
    path: "/general",
    element: <><Navbar /><News key='general' pageSize={6} country="us" category="general" /></>,
  },
  {
    path: "/health",
    element: <><Navbar /><News key='health' pageSize={6} country="us" category="health" /></>,
  },
  {
    path: "/science",
    element: <><Navbar /><News key='science' pageSize={6} country="us" category="science" /></>,
  },
  {
    path: "/sports",
    element: <><Navbar /><News key='sports' pageSize={6} country="us" category="sports" /></>,
  },
  {
    path: "/technology",
    element: <><Navbar /><News key='technology' pageSize={6} country="us" category="technology" /></>,
  },
]);

export default class App extends Component {
  render() {
    return (
        <RouterProvider router={router} />

    );
  }
}
