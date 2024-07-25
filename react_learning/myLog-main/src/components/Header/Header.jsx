import React from 'react';
import { Link } from 'react-router-dom';

import { HiSearch, HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import { HiPencilSquare } from 'react-icons/hi2';

const Header = ({ isAuth, handleSignOutClick }) => {
  return (
    <header className="text-2xl py-4 mb-6 ">
      <nav className="flex items-center justify-between py-2">
        <h1>
          <Link to="/" className="font-extrabold">
            MyLog.
          </Link>
        </h1>
        {isAuth ? (
          <ul className="flex">
            <li className="mr-5">
              <button>
                <HiSearch />
              </button>
            </li>
            <li className="mr-5">
              <Link to="/write">
                <button>
                  <HiPencilSquare />
                </button>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOutClick}>
                <HiOutlineLogout />
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex">
            <li>
              <Link to="/login">
                <button>
                  <HiOutlineLogin />
                </button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
