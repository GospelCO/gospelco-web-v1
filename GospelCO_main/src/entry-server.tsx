import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { services } from "./data/services";

export const ROUTES = [
  {
    path: "/",
    title: "GospelCO | Creative Growth Systems for Businesses",
    description: "GospelCO builds strategic brand identities, websites, video content and digital systems designed to help Nigerian businesses attract customers."
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
