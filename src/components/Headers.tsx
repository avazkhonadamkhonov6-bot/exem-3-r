import { NavLink } from 'react-router'

export default function Headers() {
  return (
    <>
     <div className='flex items-center gap-6  w-fit m-auto mt-6 mb-6'>
        <NavLink to={'/'} className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-bold border-b-2 border-blue-600 "
            : "text-gray-500 hover:text-gray-900 "
        }
        >Jotai</NavLink>
        <NavLink to={'/Zustand'} className={({ isActive }) =>
          isActive
        ? "text-blue-600 font-bold border-b-2 border-blue-600 "
        : "text-gray-500 hover:text-gray-900 "
      } >Zustand</NavLink>
      <NavLink to={'/Redux'} className={({ isActive }) =>
        isActive
          ? "text-blue-600 font-bold border-b-2 border-blue-600 "
          : "text-gray-500 hover:text-gray-900 "
      } >Redux</NavLink>
        </div> 
    </>
  )
}
