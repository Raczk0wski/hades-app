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
import ArticleList from "./components/routes/Articles";
import CreateArticleForm from "./components/Common/Forms/createArticle";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/articles",
    element: <ArticleList />,
  },
  {
    path: "/create",
    element: <CreateArticleForm />,
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
