import React from "react";

export default function SphereSearch({
  searchValue,
  setSearchValue,
  handleSearch,
  totalItems,
}) {
  return (
    <div className="w-64 max-w-full bg-base-200 bg-opacity-80 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-white/10">
      <form onSubmit={handleSearch} className="flex gap-1">
        <div className="relative flex-1">
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Orb search 1-${totalItems}`}
            min="1"
            max={totalItems}
            className="w-full px-2 py-1 text-xs bg-base-100/80 border border-base-content/20 rounded text-base-content placeholder-base-content/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content/40">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-white font-medium px-3 py-1 rounded transition-all duration-300 hover:scale-105 text-xs flex-shrink-0"
        >
          Go
        </button>
      </form>
    </div>
  );
}
