import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

/* 
  useRouteLoaderData():
  1.) Az App.js-ben elkészítjük a router-t (createBrowserRouter)
  2.) Kell egy root route, ahol a path "/"
  3.) kell megadni id-t, h tudjunk rá hivatkozni ("root")
  4.) kell egy loader, ami letudja kérni a tokent, hogy
      bármikor amikor el szeretnénk kérni tőle, eljutni hozzá általa
      akkor ez sikerüljön (tokenLoader)
  5.) a szükséges helyen lekérdezzük (const token = useRouteLoaderData("root");)
  6.) ezáltal managelhetjük melyik oldalon milyen gomb, adat, felület
      látszódjon attól függően, hogy van-e érvényes tokenünk v sem
      (be vagyunk-e jelentkezve, v sem)
*/

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action={"/logout"} method={"post"}>
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
