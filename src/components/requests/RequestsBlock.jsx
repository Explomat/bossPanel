import React, { Component, PropTypes } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

import './requests-block.scss';

class SortHeaderCell extends React.Component {

  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  _onSortChange(e) {
    e.preventDefault();
  }

  render() {
    var {children, ...props} = this.props;
    return (
      <Cell width={this.props.width} height={this.props.height}>
        <a className="requests-block__sort-cell" onClick={this._onSortChange}>
          {children}
        </a>
      </Cell>
    );
  }
}

const TextCell = ({rowIndex, data, columnKey, ...props}) => {
	const val = data[rowIndex][columnKey];
	return (
		<Cell {...props}>
		    <span title={val}>{val}</span>
		</Cell>
	);
}

class RequestBlock extends Component {

	constructor(props) {
	    super(props);

	    this._onSortChange = this._onSortChange.bind(this);
	}
	
	_onSortChange(){

	}

	render(){
		var {requestsInfo} = this.props;

		return (
			<div className="requests-block">
				{(!requestsInfo || requestsInfo.length === 0) ? 
					<div className="requests-block__empty">
						<span className="requests-block__empty-descr">Нет данных</span>
					</div>:
					<Table
				        rowsCount={requestsInfo.length}
				        rowHeight={50}
				        headerHeight={50}
				        width={965}
				        height={300}>
				        <Column
				        	columnKey="personFullname"
				        	header={
					            <SortHeaderCell
					              onSortChange={this._onSortChange}>
					              ФИО
					            </SortHeaderCell>
					        }
							cell={<TextCell data={requestsInfo} />}
							width={270}
				        />
				        <Column
				        	columnKey="code"
							header={
					            <SortHeaderCell
					              onSortChange={this._onSortChange}>
					              КОД
					            </SortHeaderCell>
					        }
							cell={<TextCell data={requestsInfo} />}
							width={200}
				        />
				        <Column
				        	columnKey="objectName"
				        	header={
					            <SortHeaderCell
					              onSortChange={this._onSortChange}>
					              ХЗ
					            </SortHeaderCell>
					        }
							cell={<TextCell data={requestsInfo} />}
							width={210}
				        />
				        <Column
				        	columnKey="href"
				        	header={
					            <SortHeaderCell
					              onSortChange={this._onSortChange}>
					              Ссылка
					            </SortHeaderCell>
					        }
							cell={<TextCell data={requestsInfo} />}
							width={285}
				        />
				    </Table>
				}
			</div>
		);
	}
}

export default RequestBlock;