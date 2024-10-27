import { PropsWithChildren } from "react";

export const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="fixed w-screen h-screen top-0 right-0 bottom-0 left-0 overflow-hidden overflow-y-auto scroll-smooth bg-bg text-black thin-scrollbar"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};
