import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="mb-14 text-center">
      <h1 className="font-bold text-3xl text-orange-400 uppercase">{title}</h1>
    </div>
  );
};

export default PageTitle;
