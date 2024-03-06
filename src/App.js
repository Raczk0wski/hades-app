import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Home from './components/routes/Home'
import LogIn from './components/routes/LogIn'
import Profile  from './components/routes/User';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]);

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  </QueryClientProvider>
  );
}

export default App;
