import { NavLink } from 'react-router'

export default function Headers() {
  return (
    <>
     <div>
        <NavLink to={'/'} >Jotai</NavLink>
        <NavLink to={'/Redux'} >Redux</NavLink>
        <NavLink to={'/Zustand'} >Zustand</NavLink>
        </div> 
    </>
  )
}
