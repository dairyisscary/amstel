import { Show, createSignal, createResource, createContext, useContext } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

import { type Path, getHomePath } from "@amstel/path";

type Context = Readonly<{
  home: Path;
  workingDirectory: () => Path;
  setWorkingDirectory: (newPath: Path) => void;
}>;

const AMSTEL_NAV_CONTEXT = createContext<Context>();
const { Provider } = AMSTEL_NAV_CONTEXT;

export function useNavigationContext(): Context {
  return useContext(AMSTEL_NAV_CONTEXT) as Context;
}

async function getContext(): Promise<Context> {
  const home = await getHomePath();
  const [workingDirectory, setWorkingDirectory] = createSignal<Path>(home);
  return Object.freeze({ home, workingDirectory, setWorkingDirectory });
}

export function NavigationProvider(props: { children: () => JSX.Element }) {
  const [context] = createResource(getContext);
  return (
    <Show when={context()}>
      {(resolvedContext) => <Provider value={resolvedContext}>{props.children()}</Provider>}
    </Show>
  );
}
