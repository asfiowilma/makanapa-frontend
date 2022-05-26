import useAuth from '@hooks/useAuth'
import React from 'react'
import Avatar from "boring-avatars";
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

type Props = {}

export const Navbar = (props: Props) => {
  const { isAuthenticated, userProfile, logout } = useAuth()

  return (
    <div className="navbar p-0 bg-base-100 shadow sticky top-0 z-50">
      <div className="flex-1">
        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden"><FiMenu className="w-5 h-5" /></label>

      </div>
      <div className="p-2">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center gap-2">
              <div className="font-medium text-gray-700">{userProfile?.namaLengkap}</div>
              <div className="btn btn-ghost btn-circle avatar">
                <Avatar
                  size={40}
                  name={userProfile?.namaLengkap}
                  variant="beam"
                  colors={["#CC333F", "#00A0B0", "#E29A1E", "#EAB835", "#EDC951"]}
                />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
              <li><a onClick={logout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <div>
            <Link href="/auth/login"><a className="btn btn-ghost">login</a></Link>
            <Link href="/auth/register"><a className="btn btn-primary">register</a></Link>
          </div>
        )}
      </div>
    </div>
  )
}