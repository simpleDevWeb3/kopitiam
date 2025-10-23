import { createContext, useState } from "react";

// Create Context
const SidebarContext = createContext();

// Provider
function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isManualOpenResize, setIsManualOpenResize] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // toggle sidebar
    //Manual toggle when normal size
    if (window.innerWidth > 1300) {
      //Track manual toggle for normal size and mobile
      setIsManualOpen(true); // track manual toggle
      setIsManualOpenResize(false);
    } else {
      //Track manual toggle for normal size and mobile

      setIsManualOpenResize((prev) => !prev);
      setIsManualOpen(false);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        isManualOpen,
        setIsManualOpen,
        isManualOpenResize,
        setIsManualOpenResize,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
export { SidebarContext, SidebarProvider };
