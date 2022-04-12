import { homeDir } from "@tauri-apps/api/path";

export type Path = string;

export function getHomePath(): Promise<Path> {
  return homeDir();
}
