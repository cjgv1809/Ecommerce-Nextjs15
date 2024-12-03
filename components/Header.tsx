"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { useEffect, useRef } from "react";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const headerRef = useRef<HTMLElement>(null);
  const totalNumberOfItems = useBasketStore((state) =>
    state.getTotalNumberOfItems()
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error creating passkey", JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    // change the background color of the header when the user scrolls down
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add("bg-white");
          headerRef.current.classList.remove("bg-transparent");
        } else {
          headerRef.current.classList.add("bg-transparent");
          headerRef.current.classList.remove("bg-white");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="flex flex-wrap justify-between items-center p-4 sticky top-0 z-50 transition-colors duration-300 ease-in-out bg-transparent"
      ref={headerRef}
    >
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Shopr
        </Link>

        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full border max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            <TrolleyIcon className="w-6 h-6" />
            {/* Basket count */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white font-bold text-xs rounded-full py-1 px-2 flex items-center justify-center">
              {totalNumberOfItems}
            </span>
            <span>View Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">
                    Hi,{" "}
                    {user.fullName ? (
                      <span className="font-bold">{user.fullName}</span>
                    ) : (
                      <span>there</span>
                    )}
                    !
                  </p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white text-blue-500 font-bold py-2 px-4 rounded cursor-pointer border-blue-300 border"
                type="button"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
