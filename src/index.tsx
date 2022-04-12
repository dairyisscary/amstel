import { render } from "solid-js/web";

import { DirectoryListing } from "@amstel/directory";
import { NavigationProvider, useNavigationContext } from "@amstel/navigation";

function Root() {
  const context = useNavigationContext();
  return (
    <DirectoryListing
      location={context.workingDirectory()}
      onDirectoryClick={({ path }) => context.setWorkingDirectory(path)}
    />
  );
}

function App() {
  return <NavigationProvider>{() => <Root />}</NavigationProvider>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cleanup = render(App, document.getElementById("root")!);
if (import.meta.hot) {
  import.meta.hot.dispose(cleanup);
}
