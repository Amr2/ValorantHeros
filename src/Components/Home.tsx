import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Hero, HerosOBJ } from "../types/types";

const Home: FC<HerosOBJ> = ({ Heros, SetHeros ,get_img}) => {
  const [SelectedHero, SelectHero] = useState<Hero>();

  

  useEffect(() => {
    if (Heros && Heros.length > 0) {
      let newTarget = Heros[Math.floor(Math.random() * ((Heros.length-1) - 0 + 1))];
      
      SelectHero(newTarget);
      get_img&&get_img(newTarget)
        .then((res) => {
          SelectHero({ ...newTarget, fullPortrait: res, loaded: true });
          SetHeros(
            Heros.map((el) =>
              el.uuid === newTarget.uuid
                ? { ...el, fullPortrait: res, loaded: true }
                : el
            )
          );
        })
        .catch((res) => {
          SelectHero({ ...newTarget, fullPortrait: res.img, loaded: false });
          SetHeros(
            Heros.map((el) =>
              el.uuid === newTarget.uuid
                ? { ...el, fullPortrait: res.img, loaded: false }
                : el
            )
          );
        });
    }
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-img">
        {SelectedHero && SelectedHero.fullPortrait && SelectedHero.loaded ? (
          <img src={SelectedHero.fullPortrait} alt="test" />
        ) : (
          <img src="./Static/Hero UNKNOWN.png" alt="test" />
        )}
      </div>
      <div className="hero-info-section">
        <div className="Hero-Header">
          <img src="./Static/Valorant Heros logo.png" alt="" />
          <h1>Valorant Heros</h1>
        </div>
        <div className="Hero-Text-Section">
          <p>
            Welcome to <span className="hText">Valorant Heros</span> ,<br />
            With <span className="hText">Valorant Heros</span> you will know all
            what you need about you favoret valorant hero.
          </p>
        </div>
        <div className="mini-Heros-cont">
          <h3>Choose you Hero</h3>
          <div className="cont">
            {Heros.map((Hero, indx) => {
              return (
                <div className="Hero-mini-icon" key={indx}>
                  {Hero.fullPortrait !== null ? (
                    <Link to={`/HeroDetail/${Hero.uuid}`}>
                      <img
                        src={Hero.displayIconSmall}
                        alt={`${Hero.displayName}'s Icon`}
                      />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

// To Be coun.....
