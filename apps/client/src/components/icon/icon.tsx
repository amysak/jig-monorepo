import { Link } from "@tanstack/react-location";

import LogoImg from "assets/images/logos/svgs/Icon.svg";

export const Logo = ({ scale = 35 }) => {
  return (
    <Link to="/" className="jiglogo">
      <LogoImg height={scale} width={scale} />
    </Link>
  );
};

export default Logo;
