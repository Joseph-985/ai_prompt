"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const [providers, setProviders] = useState<any>();
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const Providers = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    Providers();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Aiprompt-logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">AIprompt</p>
      </Link>

      {/**Desktop Navigation */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create post
            </Link>

            <button
              type="button"
              className="outline_btn"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={!session?.user.image ? "" : session?.user.image}
                alt="user image"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/**Mobile Nav */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={!session?.user.image ? "" : session?.user.image}
              alt="user image"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
