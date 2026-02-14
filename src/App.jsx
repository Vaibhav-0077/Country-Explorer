import './App.css'
import { CountryData } from './Components/UI/CountryData';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import { MainLayout } from './Components/Layout/MainLayout';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { CountryDetail } from './Components/UI/CountryDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <CountryData />
      },
      {
        path: "/country/:code",
        element: <CountryDetail />
      }
    ]
  }
])

const queryClient = new QueryClient();

function App() {
  return(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  )
}

export default App
