import { useEffect, useState } from "react";
// components
import NavBar from "./Components/NavBar";
import Heros from "./Components/Heros";
import HerosDetails from "./Components/HerosDetails";
import Home from "./Components/Home";

// Styles
import "./Styles/index.scss";

// Needed librarys
import { Switch, Route } from "react-router-dom";
import { Hero, role } from "./types/types";

export default function App() {
  const [Herosobj, SetHeros] = useState<Hero[]>([]);
  const [Roles, SetRoles] = useState<role[]>([]);

  const get_img = async (target: Hero) => {
    const blob_res = await fetch(target.fullPortrait)
      .then((res) => res.blob())
      .catch((res) => {
        throw new Error(res);
      });

    const imageObjectURL = URL.createObjectURL(blob_res);
    return new Promise<string>((resolve, eject) => {
      if (blob_res.size === 0 || blob_res.type === "text/html") {
        return eject({ img: "not found" });
      }
      return resolve(imageObjectURL);
    });
  };

  const GetHeros = async () => {
    let roles: role[] = [];
    const data = await fetch("https://valorant-api.com/v1/agents")
      .then((res) => res.json())
      .catch((res) => {
        throw new Error(res);
      });
    SetHeros(
      data.data.filter((el:Hero)=> el.fullPortrait!==null).map((el: Hero) => {
        return { ...el, loaded: false };
      })
    );

    data.data.map((el: Hero) => {
      if (el.fullPortrait !== null) {
        roles.filter((tr) => tr.uuid === el.role.uuid).length === 0
          ? roles.push(el.role)
          : console.log("not new");
      }
    });
    SetRoles(roles);
  };

  useEffect(() => {
    GetHeros();
    return console.log("loading");
  }, []);

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route path="/Hero" exact>
            <Heros Heros={Herosobj} SetHeros={SetHeros} get_img={get_img} GeTHeros={GetHeros}/>
          </Route>
          <Route path="/HeroDetail/:id" exact>
            <HerosDetails Heros={Herosobj} get_img={get_img} />
          </Route>
          <Route path="/">
            <Home Heros={Herosobj} SetHeros={SetHeros} get_img={get_img}/>
          </Route>
          <Route path="*">{"404 ERROR"}</Route>
        </Switch>
      </main>
      <footer>
        <>place holder</>
      </footer>
    </div>
  );
}
