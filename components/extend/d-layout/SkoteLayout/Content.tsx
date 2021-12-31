import React from "react";

interface IProps {
  children: JSX.Element;
}

const Content = (props: IProps) => {
  return (
    <>
      <div className="main-content">
        <div className="content">{props.children}</div>
      </div>
    </>
  );
};

export default Content;
