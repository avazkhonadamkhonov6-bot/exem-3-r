import Headers from '@/components/Headers'
import { Outlet } from 'react-router'

export default function Loyout() {
  return (
    <>
      <Headers/>
      <Outlet/>
    </>
  )
}
