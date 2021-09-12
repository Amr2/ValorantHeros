import React, { FC, useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router";
import { Hero, ability, HerosOBJ } from "../types/types";
const HerosDetails: FC<HerosOBJ> = ({ Heros }) => {
  // State for the Detail component
  const [Hero, SetHero] = useState<Hero>();
  const [Skill, SetCurrSkill] = useState<ability>();
  const Desc = useRef<HTMLDivElement>(null);
  const { params } = useRouteMatch<{ id: string }>();
  // Handlers For the Component
  // Info Fetcher
  const GetHero_Info = async (id: string) => {
    if (id.length > 0) {
      const data = await fetch(`https://valorant-api.com/v1/agents/${id}`).then(
        (res) => res.json()
      );
      SetHero(data.data);
    }
  };
  //Handle skill info
  const DisplaySkillDes = (currSkill: ability) => {
    if (currSkill === Skill) return;
    if (Desc && Desc.current) {
      Desc.current.style.opacity = "0";
      setTimeout(() => {
        SetCurrSkill(currSkill);
        if (Desc && Desc.current) Desc.current.style.opacity = "1";
      }, 350);
    }
  };

  useEffect(() => {
    if (params.id !== "000") {
      GetHero_Info(params.id);
    }
  }, []);

  // useEffect(() => {
  //   DisplaySkillDes();
  // }, [DisplaySkillDes]);

  return params.id !== "000" ? (
    <div className="Hero-Detail">
      <div className="side-img">
        <img src={Hero?.fullPortrait} alt="" />
      </div>

      <div className="info-cont">
        <h1>{Hero?.displayName}</h1>

        <div className="Hero-Info Desc-Font ">{Hero?.description}</div>

        <div className="Role-Info">
        <div className="info">
            <label> Role : </label>
            <span> {Hero?.role.displayName}</span>
          </div>
          <div className="info">
            <div className="skill"><img src={Hero?.role.displayIcon} alt={`${Hero?.role.displayName}'s name`} /></div>
            <p className="Desc-Font"> {Hero?.role.description}</p>
          </div>
        </div>

        <div className="skills-section">
          <h3>{Hero?.displayName}'s Abbilties</h3>
          <div className="skills">
            {Hero?.abilities.map((skill, indx) => {
              return (
                <div className="skill" key={indx}>
                  <img
                    src={
                      skill.displayIcon === null
                        ? "/Static/UnKnow svg.png"
                        : skill.displayIcon
                    }
                    alt={`${skill.displayName}'s img `}
                    className="skill-img"
                    onMouseOver={() => DisplaySkillDes(skill)}
                  />
                </div>
              );
            })}
          </div>
          <div ref={Desc} className="skill-D">
            <h3>
              {Skill?.displayName
                ? Skill?.displayName
                : "Hover Over Skill Please"}
            </h3>
            <p className="Desc-Font">
              {Skill?.description ? Skill?.description : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>on doing</>
  );
};

export default HerosDetails;
