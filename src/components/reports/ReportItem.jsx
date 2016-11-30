import React, { Component } from 'react';

const ReportItem = ({title, titleHref}) => {
  return (
      <div className="reports-block__item">
        <i className="icon-file reports-block__icon"></i>
        <a href={titleHref} target="__blank">
          {title}
        </a>
      </div>
  )
}

export default ReportItem;
