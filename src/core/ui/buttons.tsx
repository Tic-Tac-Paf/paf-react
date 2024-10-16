export const OutlinedButton: React.FC<{
  label: string;
  onClick?: () => void;
}> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-2 text-primary bg-transparent border-4 border-primary rounded-full hover:bg-primary hover:text-white"
    >
      <span className="text-[40px] text-inherit font-bold">{label}</span>
    </button>
  );
};
