import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export const App = () =>{
  // Define the API key and state
  // apiKey = "24030685c7384ad49895e3e45df73beb";
  const [progress, setprogress] = useState(0)

   function setProgress(_value){
    console.log("i am entering progress");
     setprogress(_value);
   }

  const [apiKey, setApiKey] = useState(import.meta.env.VITE_REACT_APP_API_KEY)
  // setApiKey(import.meta.env.VITE_REACT_APP_API_KEY);
    // Move the router definition here to access `apiKey`
    const router = createBrowserRouter([
      {
        path: "/",
        element: <><Navbar /> 
        <LoadingBar
        color='#f11946'
        progress={progress}
      /></>,
        children: [
          {
            path: "/",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={6} country="us" category="general" />,
          },
          {
            path: "/business",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="business" pageSize={6} country="us" category="business" />,
          },
          {
            path: "/entertainment",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="entertainment" pageSize={6} country="us" category="entertainment" />,
          },
          {
            path: "/general",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={6} country="us" category="general" />,
          },
          {
            path: "/health",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="health" pageSize={6} country="us" category="health" />,
          },
          {
            path: "/science",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="science" pageSize={6} country="us" category="science" />,
          },
          {
            path: "/sports",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="sports" pageSize={6} country="us" category="sports" />,
          },
          {
            path: "/technology",
            element: <News setProgress={setProgress}  apiKey={apiKey} key="technology" pageSize={6} country="us" category="technology" />,
          },
        ],
      },
    ]);

    return (
      <>
        {/* Provide the router */}
        <RouterProvider router={router} />
      </>
    );
}

export default App;
