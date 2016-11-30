import React, { Component } from 'react';
import ReportItem from './ReportItem';
import {AlertDanger} from '../modules/alert';

import './reports-block.scss';

const ReportsBlock = ({isFetching, error, reportsInfo}) => {
  const {data} = reportsInfo;
  return (
      <div className="reports-block">
        {isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          error ? <AlertDanger text={error}/> : 
          data.map(r => <ReportItem key={r.id} {...r} />)
        }
      </div>
  )
}

export default ReportsBlock;
