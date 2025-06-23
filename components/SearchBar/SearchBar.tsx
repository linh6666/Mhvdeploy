"use client";

import { useRef, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

const Search = ({
  searchQuery,
  setSearchQuery,
  searchOpen,
  setSearchOpen,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      console.log("Tìm kiếm:", searchQuery);
      // TODO: Bạn có thể thay bằng logic gọi API hoặc điều hướng tùy ý
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Nút toggle input */}
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        aria-label="Toggle search"
      >
        <IconSearch size={22} />
      </button>

      {/* Input với icon bên trong có thể nhấn */}
      {searchOpen && (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-40 pl-8 pr-8 py-1.5 rounded-md text-sm bg-white text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-150"
          />
          <button
            onClick={handleSearchSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            aria-label="Submit search"
          >
            <IconSearch size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
