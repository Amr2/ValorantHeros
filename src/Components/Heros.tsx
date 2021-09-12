import { FC, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {  HerosOBJ } from "../types/types";
const Heros: FC<HerosOBJ> = ({ Heros, SetHeros, get_img, GeTHeros }) => {
  const Chacker = useCallback(async () => {
    if(Heros.map(el=> el.loaded).every(v=> v===true)){
      return
    }
    if (get_img) {
      let newarray = await Heros.map(async (Hero) => {
        if (!Hero.loaded) {
          try {
            let temp = await get_img(Hero);
            return { ...Hero, fullPortrait: temp, loaded: true };
          } catch (error) {
            console.log(error);
          }
        } else return Hero;
      });
      SetHeros([]);
      newarray.map((el) =>
        el.then((res) => {
          SetHeros((v: any[]) => [...v, res]);
        })
      );
    }
  }, [Heros]);

  useEffect(() => {
    Chacker();
  }, [Chacker]);

  return (
    <div className="Heros-cont">
      {Heros.map((hero, indx) => {
        if (hero.fullPortrait !== null) {
          return (
            <div key={hero.uuid} className="hero">
              <Link to={`/HeroDetail/${hero.uuid}`}>
                <img
                  src={
                    hero.loaded
                      ? hero.fullPortrait
                      : "./Static/Hero UNKNOWN.png"
                  }
                  alt={`${hero.displayName} img`}
                />
                <p>{hero.displayName}</p>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Heros;
