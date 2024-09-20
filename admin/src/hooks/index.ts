// hooks.ts
import { useDispatch as useReduxDispatch } from "react-redux";
import { AppDispatch } from "../features/store";

export const useDispatch = () => useReduxDispatch<AppDispatch>();
