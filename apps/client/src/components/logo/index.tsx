import { Link } from "@tanstack/react-router";

import LogoImg from "assets/images/logos/svgs/Icon.svg";

import "./icon.scss";

export const Logo = ({ scale = 35 }) => {
  return (
    <Link to="/" className="jiglogo">
      <LogoImg height={scale} width={scale} />
    </Link>
  );
};

export default Logo;
