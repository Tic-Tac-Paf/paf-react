import { twMerge } from "tailwind-merge";

export const OutlinedButton: React.FC<{
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ label, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "px-8 py-2 text-primary bg-transparent text-[24px] md:text-[40px] border-4 border-primary rounded-full hover:bg-primary hover:text-white",
        className
      )}
      disabled={disabled}
    >
      <span className="text-inherit">{label}</span>
    </button>
  );
};
