import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function SphereSearch() {
  const { totalItems, selected, selectedSpotNumber, handleSearch } =
    useAppContext();

  // Local search state - not stored in global context
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Sync search value with selection when selection changes
  useEffect(() => {
    if (selected !== null) {
      setSearchValue(selectedSpotNumber.toString());
    }
  }, [selected, selectedSpotNumber]);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("moonr-search-history");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Generate suggestions based on input and filters
  useEffect(() => {
    if (!searchValue.trim() && !activeFilter) {
      setSuggestions(searchHistory.slice(0, 5));
      return;
    }

    const num = parseInt(searchValue, 10);
    const newSuggestions = [];

    // Filter-based suggestions
    if (activeFilter) {
      let filteredOrbs = [];

      switch (activeFilter) {
        case "rare":
          // Show orbs with higher numbers (simulate rarity)
          filteredOrbs = Array.from(
            { length: 8 },
            (_, i) => Math.floor(Math.random() * 20) + 80
          );
          break;
        case "popular":
          // Show random popular orbs
          filteredOrbs = [7, 12, 21, 33, 42, 69, 77, 88];
          break;
        case "recent":
          // Show recently viewed orbs (last 10)
          filteredOrbs = Array.from({ length: 8 }, (_, i) => totalItems - i);
          break;
        case "lucky":
          // Lucky numbers
          filteredOrbs = [7, 13, 21, 42, 69, 77, 88, 99];
          break;
      }

      filteredOrbs.forEach((orbNum) => {
        if (orbNum <= totalItems) {
          newSuggestions.push({
            type: activeFilter,
            value: orbNum,
            label: `Orb #${orbNum}`,
            description: getFilterDescription(activeFilter),
          });
        }
      });
    }

    // Number-based suggestions
    if (searchValue.trim()) {
      // Validate the number
      if (isNaN(num) || num < 1 || num > totalItems) {
        setIsValidNumber(false);
      } else {
        setIsValidNumber(true);

        // Add exact match if not filtered
        if (!activeFilter) {
          newSuggestions.unshift({
            type: "exact",
            value: num,
            label: `Orb #${num}`,
            description: "Go to this orb",
          });

          // Add nearby orbs
          for (
            let i = Math.max(1, num - 2);
            i <= Math.min(totalItems, num + 2);
            i++
          ) {
            if (i !== num) {
              newSuggestions.push({
                type: "nearby",
                value: i,
                label: `Orb #${i}`,
                description: "Nearby orb",
              });
            }
          }
        }
      }
    }

    setSuggestions(newSuggestions.slice(0, 8));
  }, [searchValue, totalItems, searchHistory, activeFilter]);

  const getFilterDescription = (filter) => {
    switch (filter) {
      case "rare":
        return "Rare high-value orb";
      case "popular":
        return "Community favorite";
      case "recent":
        return "Recently discovered";
      case "lucky":
        return "Lucky number orb";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true);
    // Clear filter when typing
    if (activeFilter && e.target.value) {
      setActiveFilter(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidNumber && searchValue.trim()) {
      // Shake animation for invalid input
      inputRef.current?.classList.add("animate-pulse");
      setTimeout(() => {
        inputRef.current?.classList.remove("animate-pulse");
      }, 500);
      return;
    }

    const success = handleSearch(searchValue); // Use context handler

    if (success) {
      const num = parseInt(searchValue, 10);
      console.log(`🎯 [SphereSearch] Focusing sphere on spot ${num}`);

      // Add to search history
      const newHistory = [
        num,
        ...searchHistory.filter((item) => item !== num),
      ].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("moonr-search-history", JSON.stringify(newHistory));

      setShowSuggestions(false);
      inputRef.current?.blur();
      setActiveFilter(null);

      // Provide user feedback
      inputRef.current?.classList.add("ring-2", "ring-green-400/50");
      setTimeout(() => {
        inputRef.current?.classList.remove("ring-2", "ring-green-400/50");
      }, 1000);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchValue(suggestion.value.toString());
    setShowSuggestions(false);
    setActiveFilter(null);

    // Trigger search immediately using context handler
    const success = handleSearch(suggestion.value.toString());

    if (success) {
      console.log(
        `🎯 [SphereSearch] Focusing sphere on spot ${suggestion.value}`
      );

      // Add to history
      const newHistory = [
        suggestion.value,
        ...searchHistory.filter((item) => item !== suggestion.value),
      ].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("moonr-search-history", JSON.stringify(newHistory));

      // Provide user feedback
      inputRef.current?.classList.add("ring-2", "ring-green-400/50");
      setTimeout(() => {
        inputRef.current?.classList.remove("ring-2", "ring-green-400/50");
      }, 1000);
    }
  };

  const handleFilterClick = (filter) => {
    const newFilter = activeFilter === filter ? null : filter;
    setActiveFilter(newFilter);
    setShowSuggestions(true);
    setSearchValue("");
  };

  const handleRandomSearch = () => {
    const random = Math.floor(Math.random() * totalItems) + 1;
    setSearchValue(random.toString());
    setActiveFilter(null);

    console.log(`🎯 [SphereSearch] Random focus on spot ${random}`);
    handleSearch(random.toString()); // Use context handler

    // Provide feedback for random selection
    const randomButton = document.querySelector("[data-random-button]");
    if (randomButton) {
      randomButton.classList.add("scale-110", "ring-2", "ring-purple-400/50");
      setTimeout(() => {
        randomButton.classList.remove(
          "scale-110",
          "ring-2",
          "ring-purple-400/50"
        );
      }, 500);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("moonr-search-history");
    setSuggestions([]);
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case "exact":
        return "🎯";
      case "nearby":
        return "📍";
      case "random":
        return "🎲";
      case "rare":
        return "💎";
      case "popular":
        return "🔥";
      case "recent":
        return "🕒";
      case "lucky":
        return "🍀";
      default:
        return "🔮";
    }
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case "exact":
        return "text-green-400";
      case "nearby":
        return "text-blue-400";
      case "random":
        return "text-purple-400";
      case "rare":
        return "text-yellow-400";
      case "popular":
        return "text-red-400";
      case "recent":
        return "text-cyan-400";
      case "lucky":
        return "text-emerald-400";
      default:
        return "text-gray-400";
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-purple-500/30 relative">
      {/* Search Form */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder={
                activeFilter
                  ? `Search ${activeFilter} orbs...`
                  : "Enter orb number..."
              }
              className={`w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200/60 ${
                searchValue && !isValidNumber
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : activeFilter
                  ? "border-purple-500/50 focus:border-purple-500 focus:ring-purple-500/20"
                  : "border-purple-500/30 focus:border-purple-400/50 focus:ring-purple-400/20"
              }`}
            />

            {/* Clear button */}
            {(searchValue || activeFilter) && (
              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                  setActiveFilter(null);
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>

          {/* Error message */}
          {searchValue && !isValidNumber && (
            <div className="text-xs text-red-400 flex items-center gap-1">
              <span>⚠️</span>
              <span>Please enter a number between 1 and {totalItems}</span>
            </div>
          )}

          {/* Search button */}
          <button
            type="submit"
            disabled={(!searchValue.trim() || !isValidNumber) && !activeFilter}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            {activeFilter
              ? `🔍 Search ${
                  activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)
                }`
              : isValidNumber
              ? "🔍 Search Orb"
              : "❌ Invalid Number"}
          </button>
        </form>

        {/* Filters */}
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFilterClick("rare")}
              className={`py-2 px-3 font-bold text-xs rounded transition-all duration-200 ${
                activeFilter === "rare"
                  ? "bg-yellow-500/30 border border-yellow-500/50 text-yellow-200"
                  : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 hover:bg-yellow-500/20"
              }`}
            >
              💎 Rare
            </button>

            <button
              onClick={() => handleFilterClick("popular")}
              className={`py-2 px-3 font-bold text-xs rounded transition-all duration-200 ${
                activeFilter === "popular"
                  ? "bg-red-500/30 border border-red-500/50 text-red-200"
                  : "bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20"
              }`}
            >
              🔥 Popular
            </button>

            <button
              onClick={() => handleFilterClick("recent")}
              className={`py-2 px-3 font-bold text-xs rounded transition-all duration-200 ${
                activeFilter === "recent"
                  ? "bg-cyan-500/30 border border-cyan-500/50 text-cyan-200"
                  : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20"
              }`}
            >
              🕒 Recent
            </button>

            <button
              data-random-button
              onClick={handleRandomSearch}
              className="py-2 px-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 font-bold text-xs rounded hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
            >
              🎲 Random
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-black/95 backdrop-blur-lg border border-purple-500/30 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto"
        >
          {/* Suggestions header */}
          <div className="p-3 border-b border-purple-500/20 flex items-center justify-between">
            <span className="text-sm font-bold text-purple-300">
              {activeFilter
                ? `${
                    activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)
                  } Orbs`
                : searchValue
                ? "Suggestions"
                : "Recent Searches"}
            </span>
            {searchHistory.length > 0 && !activeFilter && (
              <button
                onClick={clearHistory}
                className="text-xs text-purple-400/60 hover:text-purple-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Suggestions list */}
          <div className="p-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="w-full p-3 text-left hover:bg-white/10 rounded transition-colors group flex items-center gap-3"
              >
                <span
                  className={`text-base ${getSuggestionColor(suggestion.type)}`}
                >
                  {getSuggestionIcon(suggestion.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-purple-200">
                    {suggestion.label}
                  </div>
                  {suggestion.description && (
                    <div className="text-xs text-purple-300/60">
                      {suggestion.description}
                    </div>
                  )}
                </div>
                <span className="text-xs text-purple-400/40 group-hover:text-purple-300/60">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
