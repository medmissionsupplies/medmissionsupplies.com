import React, { useEffect, useState } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { App, pageFromPath } from "./App.jsx";
import { installPageNavigation } from "./page-navigation.mjs";
import "./styles.scss";
import "./editorial.css";

import { metadata } from "./routes.mjs";
function ClientApp() {
  const [route, setRoute] = useState(() => ({
    page:
      document.documentElement.dataset.page ||
      pageFromPath(window.location.pathname),
    search: undefined,
    entry: "initial",
  }));
  useEffect(
    () =>
      installPageNavigation({
        metadata,
        render: (next) => flushSync(() => setRoute(next)),
      }),
    [],
  );
  return (
    <App
      page={route.page}
      search={route.search}
      entry={route.entry}
      contactDraft={route.draft}
    />
  );
}
const root = document.getElementById("root");
const app = <ClientApp />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
