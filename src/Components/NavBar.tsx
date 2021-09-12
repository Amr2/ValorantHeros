import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
const NavBar: FC = () => {
  const path = useLocation();

  return (
    <nav>
      <h1 style={path.pathname === "/" ? { opacity: 0 } : { opacity: 1 }}>
        Valorant Heros
      </h1>
      <ul className="options">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Hero">Heros</Link>
        </li>
        <li>
          <Link to="/HeroDetail/000">Heros Detail</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
