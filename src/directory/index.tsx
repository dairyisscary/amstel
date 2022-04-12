import { readDir } from "@tauri-apps/api/fs";
import { For, createResource } from "solid-js";

import type { Path } from "@amstel/path";

export type Directory = {
  path: Path;
  name: string;
  children: unknown[];
};

type DirectoryListingProps = {
  onDirectoryClick: (directory: Directory) => void;
  location: string;
  showHidden?: boolean;
};

function isHidden(item: { name: string }): boolean {
  return item.name.startsWith(".");
}

export async function getDirectoryItems(location: string) {
  return readDir(location);
}

export function isDirectory(node: { children?: unknown[] }): node is Directory {
  return Boolean(node.children);
}

export function DirectoryListing(props: DirectoryListingProps) {
  const [data] = createResource(() => props.location, getDirectoryItems);
  return (
    <div class="relative overflow-auto rounded-lg shadow-md">
      <table class="w-full text-left">
        <caption>{props.location}</caption>
        <thead class="bg-gray-700 text-sm uppercase text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          <For
            each={props.showHidden ? data() : data()?.filter((item) => !isHidden(item))}
            fallback={
              <tr>
                <td>{data.loading ? "Loading..." : "Empty Directory..."}</td>
              </tr>
            }
          >
            {(item) => {
              const isDir = isDirectory(item);
              return (
                <tr
                  class="odd:bg-gray-750 border-b border-gray-700 bg-gray-800 transition-colors hover:bg-gray-600"
                  classList={{ "cursor-pointer": isDir }}
                  onClick={isDir ? () => props.onDirectoryClick(item) : undefined}
                >
                  <th scope="row" class="whitespace-nowrap py-4 px-6 text-white">
                    {item.name}
                  </th>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
}
