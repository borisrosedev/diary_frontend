import {
    Form,
    Links,
    Meta,
    Scripts,
    ScrollRestoration,
  } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
// existing imports

import appStylesHref from "../app.css?url";
import logo from "/diary-logo.webp"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];
  
  export default function AdminBoard() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <header className="app-header">
            <a href="">
              <figure>
                <img src={logo} alt="logo Diary" />
              </figure>
              <span aria-label="app title">Diary</span>
            </a>
            <nav>
              <ul>
                <li>
                  <a href="">Connexion</a>
                </li>
              </ul>
            </nav>
          </header>
          <main className="app-main adminboard__main">  
            <h1>Page Administrateur</h1>
          </main>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
  