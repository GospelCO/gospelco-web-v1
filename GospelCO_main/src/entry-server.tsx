import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { services } from "./data/services";

export const ROUTES = [
  {
    path: "/",
    title: "GospelCO | Strategic Brand & Digital Growth Studio",
    description: "GospelCO is a strategy-led studio for brand identity, websites and content—helping Nigerian businesses bring their next stage into focus."
  },
  ...services.map((service) => ({
    path: service.path,
    title: service.name + " | GospelCO",
    description: service.intro
  }))
];

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
