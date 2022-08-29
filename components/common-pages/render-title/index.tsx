import React from 'react';

interface ITitle {
  title: string;
  content: string;
}
export default (header: ITitle) => {
  return (
    <div className="table-header-box">
      <span className="table-header-box-title">{header.title}</span>
      {header.content ? (
        <>
          <span> / </span>
          <span className="table-header-box-content">{header.content}</span>
        </>
      ) : null}
    </div>
  );
};
