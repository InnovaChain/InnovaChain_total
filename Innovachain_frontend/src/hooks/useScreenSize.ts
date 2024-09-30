import { useWindowSize } from "react-use";
import {
  SCREEN_LG,
  SCREEN_MD,
  SCREEN_SM,
  SCREEN_XL,
} from "../constants/screen";

function useScreenSize(): "sm" | "md" | "lg" | "xl" | "2xl" {
  const { width } = useWindowSize();
  if (width < SCREEN_SM) return "sm";
  if (width < SCREEN_MD) return "md";
  if (width < SCREEN_LG) return "lg";
  if (width < SCREEN_XL) return "xl";
  return "2xl";
}

export default useScreenSize;
