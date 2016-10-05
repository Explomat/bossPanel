import React, { Component, PropTypes } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

import './adaptation-block.scss';

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }

  render() {
    var {children, ...props} = this.props;
    return (
      <Cell width={this.props.width} height={this.props.height}>
        <a className="adaptation-block__sort-cell" onClick={this._onSortChange}>
          {children}
        </a>
      </Cell>
    );
  }
}

const TextCell = ({rowIndex, data, columnKey, ...props}) => {
	return (
		<Cell {...props}>
		    {data[rowIndex][columnKey]}
		</Cell>
	);
}

const PercentCell = ({rowIndex, data, columnKey, ...props}) => {
	return (
		<Cell {...props}>
		    {data[rowIndex][columnKey]} %
		</Cell>
	);
}

class AdaptationBlock extends Component {
	

	render(){
		var {data} = this.props;
		return (
			<div className="adaptation-block">
				<Table
			        rowsCount={data.length}
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
						cell={<TextCell data={data} />}
						width={200}
			        />
			        <Column
			        	columnKey="planReadinessDate"
			        	header={
				            <SortHeaderCell
				              onSortChange={this._onSortChange}>
				              Планируемая дата завершения
				            </SortHeaderCell>
				        }
						cell={<TextCell data={data} />}
						width={270}
			        />
			        <Column
			        	columnKey="totalPercentComplete"
			        	header={
				            <SortHeaderCell
				              onSortChange={this._onSortChange}>
				              Процент прохождения
				            </SortHeaderCell>
				        }
						cell={<PercentCell data={data} />}
						width={210}
			        />
			        <Column
			        	columnKey="successPercentComplete"
			        	header={
				            <SortHeaderCell
				              onSortChange={this._onSortChange}>
				              Успешный процент прохождения
				            </SortHeaderCell>
				        }
						cell={<PercentCell data={data} />}
						width={285}
			        />
			    </Table>
			</div>
		);
	}
}

export default AdaptationBlock;