import { SVGProps } from "react";

const CrossIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transition: "all 0.3s ease-in" }}
    {...props}
  >
    <path d="M6.99873 5.0865L11.9485 0.136719L13.3627 1.55093L8.41293 6.5007L13.3627 11.4504L11.9485 12.8646L6.99873 7.9149L2.04899 12.8646L0.634766 11.4504L5.58453 6.5007L0.634766 1.55093L2.04899 0.136719L6.99873 5.0865Z" />
  </svg>
);
export default CrossIcon;
