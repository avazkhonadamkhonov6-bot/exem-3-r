import  { lazy } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Loyout from './Loyuout/Loyout'

    const Jotai= lazy(()=>import('./pages/Jotai')) 
    const Redux=lazy(()=>import('./pages/Redux'))
    const Zustand=lazy(()=>import('./pages/Zustand'))

export default function App() {

   const router = createBrowserRouter([
    {
      path:'/',
      element:<Loyout/>,
      children:[
        {index:true,element:<Jotai/>},
        {path:'/Redux',element:<Redux/>},
        {path:'/Zustand',element:<Zustand/>},
      ]
    }
  ])
  return <RouterProvider router={router} />;
}
