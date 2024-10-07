import {
    Form,
    json,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
  } from "@remix-run/react";

import type { LinksFunction, MetaFunction } from "@remix-run/node";
// existing imports

import appStylesHref from "./app.css?url";
import logo from "/diary-logo.webp"
import invariant from "tiny-invariant";
import CustomStorage from "./services/custom-storage.service";
import AuthService from "./services/auth.service";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];


export default function App() {

    const [isConnected, setIsConnected] = useState<boolean>(false)
    useEffect(() => {

      const socket = io("http://localhost:3002")
      socket.emit("users", "new user", (val: any) => {
        console.log("val", val);
      });
      
      const user = CustomStorage.getSpecificItem("user")
      if(user && user.id && user.token) {
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
     
    }, [])

    return (
      <html lang="fr-FR" dir="ltr">
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
                  {!isConnected ? <Link to={"/connexion"}>Connection</Link>
                    : <button onClick={() => {
                      AuthService.logout()
                    }} > Déconnexion </button>
                  }
                </li>
              </ul>
            </nav>
          </header>
          
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
  