import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import spotData from "../data/spotData.json";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // Use spot data from JSON
  const [selected, setSelected] = useState(null);
  const [totalImages] = useState(spotData.spots.length); // Number of spots with actual images (14)
  const [totalItems] = useState(100); // Total spots on sphere (stays 100)

  // Debug logging for state changes
  const handleSelectionChange = useCallback(
    (newSelected) => {
      console.log(
        "🔍 [AppContext] Selection changing from",
        selected,
        "to",
        newSelected
      );
      setSelected(newSelected);
    },
    [selected]
  );

  // Search handler - supports 1-100
  const handleSearch = useCallback(
    (searchValue) => {
      const num = parseInt(searchValue, 10);
      if (!isNaN(num) && num >= 1 && num <= totalItems) {
        const newIndex = num - 1;
        console.log("🔍 [AppContext] Search executed for spot:", num);
        handleSelectionChange(newIndex);
        return true; // Success
      } else {
        console.log("🔍 [AppContext] Invalid search value:", searchValue);
        return false; // Failed
      }
    },
    [totalItems, handleSelectionChange]
  );

  // Marquee image click handler
  const handleMarqueeImageClick = useCallback(
    (imgIndex) => {
      console.log("🔍 [AppContext] Marquee image clicked:", imgIndex + 1);
      handleSelectionChange(imgIndex);
    },
    [handleSelectionChange]
  );

  // Clear selection
  const clearSelection = useCallback(() => {
    console.log("🔍 [AppContext] Clearing selection");
    handleSelectionChange(null);
  }, [handleSelectionChange]);

  // Navigate to specific spot
  const navigateToSpot = useCallback(
    (spotNumber) => {
      if (spotNumber >= 1 && spotNumber <= totalItems) {
        const index = spotNumber - 1;
        console.log("🔍 [AppContext] Navigating to spot:", spotNumber);
        handleSelectionChange(index);
        return true;
      }
      return false;
    },
    [totalItems, handleSelectionChange]
  );

  // Get spot data from JSON - only return data for spots 1-14
  const getSpotData = useCallback((spotNumber) => {
    if (!spotNumber) return null;

    // Only return data for spots that exist in JSON (spots 1-14)
    const jsonSpot = spotData.spots.find((spot) => spot.id === spotNumber);
    return jsonSpot || null;
  }, []);

  // Context value
  const value = {
    // Core state
    selected,
    totalImages, // Number of spots with actual images (14)
    totalItems, // Total spots on sphere (100)
    spotData, // Access to full spot data

    // Handlers
    setSelected: handleSelectionChange,
    handleSearch,
    handleMarqueeImageClick,
    clearSelection,
    navigateToSpot,
    getSpotData,

    // Computed values (derived from selected)
    selectedSpotNumber: selected !== null ? selected + 1 : null,
    hasSelection: selected !== null,
    searchValue: selected !== null ? (selected + 1).toString() : "", // Derived from selection
  };

  // Debug: Log context state - simplified
  useEffect(() => {
    console.log("🔍 [AppContext] Context state:", {
      selected,
      totalImages, // 14 (number of spots with images - same as spots with data)
      totalItems, // 100 (total spots on sphere)
      selectedSpotNumber: selected !== null ? selected + 1 : null,
      hasSelection: selected !== null,
      searchValue: selected !== null ? (selected + 1).toString() : "",
    });
  }, [selected, totalImages, totalItems]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
