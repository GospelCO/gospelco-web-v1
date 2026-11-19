import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { services } from "./data/services";

export const ROUTES = [
  {
    path: "/",
    title: "Branding, Website Design & Social Media Content | GospelCO",
    description: "GospelCO provides branding and brand identity design, business website design, video editing and social media content production for growing businesses."
  },
  ...services.map((service) => {
    const titles: Record<string, string> = {
      flyer: "Graphic Design and Social Media Content | GospelCO",
      music: "Music Cover Art and Brand Identity Design | GospelCO",
      "ai-video": "AI-Assisted Video Editing and Social Media Content | GospelCO",
      video: "Video Editing and Social Media Content Production | GospelCO",
      web: "Business Website Design and Development | GospelCO",
      strategy: "Marketing Strategy and Brand Consulting | GospelCO"
    };
    return {
      path: service.path,
      title: titles[service.id] ?? service.name + " | GospelCO",
      description: service.intro
    };
  })
];

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
