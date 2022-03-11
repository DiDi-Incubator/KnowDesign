import React from 'react';

interface IProps {
  children: JSX.Element;
}

const Content = (props: IProps) => {
  return (
    <>
      <div className="main-content">{props.children} </div>
    </>
  );
};

export default Content;
