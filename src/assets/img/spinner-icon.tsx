import { SVGProps } from "react";

export const SpinnerIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    style={{ transition: "all 0.3s ease-in" }}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      clipRule="evenodd"
      opacity={0.2}
    />
    <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z" />
  </svg>
);
export default SpinnerIcon;
