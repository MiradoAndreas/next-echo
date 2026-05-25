import { atom } from "jotai"
import { WidgetScreen } from "../types/type"

// Basic widget state atoms
export const screenAtom = atom<WidgetScreen>("auth")
