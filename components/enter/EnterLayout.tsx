import React from "react";

interface EnterLayoutProps {
  children: React.ReactNode;
}

const EnterLayout: React.FC<EnterLayoutProps> = ({ children }) => {
  return (
    <main className="my-40 w-[100%] lg:w-[40%] flex flex-col justify-center items-center">
      {children}
    </main>
  );
};

export default EnterLayout;
