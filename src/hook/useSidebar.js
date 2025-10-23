import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

export default function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error(
      "Using SidebarContext Outside SibearProvider!Please use inside it."
    );
  return context;
}
