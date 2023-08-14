"use client";
import userService from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DropdownHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const options = ["Sign out"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    userService.logout();
    router.push('/')
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex justify-between items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary outline-none "
          onClick={toggleDropdown}
        >
          Huy Hoàng Trần
          <svg
            className={`ml-2 w-5 h-5 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left`}
              role="menuitem"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownHeader;
