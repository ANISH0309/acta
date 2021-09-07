/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";

import Hamburger from "../../Assets/Hamburger.svg";
import useOutsideClick from "../useOutsideClick/useOutsideClick";

import Logout from "../../Assets/Logout.svg";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menu = useRef(null);

  useOutsideClick(menu, () => {
    setIsOpen(false);
  });

  const logout = () => {
    axios.get(process.env.REACT_APP_GOOGLE_LOGOUT).then(() => {
      sessionStorage.removeItem("AM");
      window.location.href = "/";
    });
  };

  return (
    <div>
      <div className="flex md:hidden">
        <button
          onClick={() => {
            setTimeout(() => {
              setIsOpen(!isOpen);
            }, 100);
          }}
          type="button"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          {!isOpen ? <img src={Hamburger} alt="cross" /> : null}
        </button>
      </div>

      <Transition show={isOpen}>
        {(ref) => (
          <div
            ref={menu}
            className="md:hidden border absolute right-2 top-3 text-white bg-dropdown rounded-md z-50"
            id="mobile-menu"
          >
            <div ref={ref} className="space-y-1 w-full mr-2 flex flex-col">
              <div className="mt-2 pb-1 flex">
                <a href="/dashboard" className="font-500 w-full px-2">
                  Dashboard
                </a>
              </div>

              <div className="flex pb-1">
                <a href="/moms" className="font-500 w-full px-2">
                  MOMs
                </a>
              </div>

              <div
                className="flex items-center"
                style={{ marginBottom: "8px" }}
              >
                <div>
                  <button
                    type="button"
                    onClick={logout}
                    className="font-500 w-full px-2"
                  >
                    Logout
                  </button>
                </div>
                <div onClick={logout}>
                  <img src={Logout} alt="logout" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Nav;