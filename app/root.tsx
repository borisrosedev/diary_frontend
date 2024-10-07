import {
    Form,
    json,
    Link,
    Links,
    Meta,
    Outlet,
    redirect,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useNavigate,
  } from "@remix-run/react";

import type { LinksFunction, MetaFunction } from "@remix-run/node";
// existing imports

import appStylesHref from "./app.css?url";
import logo from "/diary-logo.webp"
import CustomStorage from "./services/custom-storage.service";
import AuthService from "./services/auth.service";
import { useEffect, useState } from "react";
import WebsocketService from "./services/websocket.service";
import NotificationService from "./services/notification.service";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];


export default function App() {

    const [isConnected, setIsConnected] = useState<boolean>(false)
  
    const navigate = useNavigate()

    const logoutHandler = () => {
      AuthService.logout()
      const wsService = WebsocketService.getInstance()
      wsService.sendEvent("users", {message: "Un utilisateur s'est déconnecté"})
      setTimeout(() => {
        navigate("/connection")
      }, 4000)
      
    }

    
    useEffect(() => {

      const user = CustomStorage.getSpecificItem("user")
      NotificationService.getInstance()
      if(user && user.id && user.token) {
        setIsConnected(true)
        
      } else {
        AuthService.logout()
        setIsConnected(false)
        redirect("/")
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
                  {!isConnected ? <Link to={"/connection"}>Connection</Link>
                    : <button className="logout-button" onClick={logoutHandler} > Déconnexion </button>
                  }
                </li>
              </ul>
            </nav>
          </header>
          
          <Outlet />
          <aside id="notification-aside"></aside>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
  