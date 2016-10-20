import React, { Component, PropTypes } from 'react';
import SearchBar from '../modules/search-bar';
import {AlertDanger} from '../modules/alert';
import { DropDownIcon, DropDownIconItem } from '../modules/dropdown-icon';
import {Table, Column, Cell} from 'fixed-data-table';

import './adaptation-block.scss';

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
        <a className="adaptation-block__sort-cell" onClick={this._onSortChange}>
          {children}
        </a>
      </Cell>
    );
  }
}

const DateCell = ({rowIndex, data, columnKey, ...props}) => {
	const val = data[rowIndex][columnKey].toLocaleDateString();
	return (
		<Cell {...props}>
		    <span title={val}>{val}</span>
		</Cell>
	);
}

const TextCell = ({rowIndex, data, columnKey, ...props}) => {
	const val = data[rowIndex][columnKey];
	return (
		<Cell {...props}>
		    <span title={val}>{val}</span>
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

	handleSort(e, payload){
		if (this.props.sortAdaptData){
			this.props.sortAdaptData(payload);
		}
	}

	render(){
		const { adaptResultFetching, adaptResultError, searchAdaptData } = this.props;
		var {adaptResultInfo, filteredAdaptResultInfo} = this.props;

		return (
			<div className="adaptation-block">
				{adaptResultFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          			adaptResultError ? <AlertDanger text={adaptResultError} /> : 
						(adaptResultInfo && adaptResultInfo.length === 0) ? 
							<div className="adaptation-block__empty">
								<span className="adaptation-block__empty-descr">Нет данных</span>
							</div>:
							<div className="adaptation-block__content">
								<SearchBar onSearch={searchAdaptData} className="adaptation-block__searchbar" classNameInput="adaptation-block__searchbar-input"/>
								<span className="adaptation-block__count">{filteredAdaptResultInfo.length}</span>
								<DropDownIcon
										icon={<i className="icon-arrow-combo"></i>} 
										className="adaptation-block__sort default-button">
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "personFullname", "isAsc": "true"}' text='Сортировать по ФИО(А-я)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "personFullname", "isAsc": "false"}' text='Сортировать по ФИО(я-А)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "planReadinessDate", "isAsc": "true"}' text='Сортировать по дате(во возрастанию)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "planReadinessDate", "isAsc": "false"}' text='Сортировать по дате(по убыванию)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "totalPercentComplete", "isAsc": "true"}' text='Сортировать по проценту прохождения(по возрастанию)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "totalPercentComplete", "isAsc": "false"}' text='Сортировать по проценту прохождения(по убыванию)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "successPercentComplete", "isAsc": "true"}' text='Сортировать по успешному проценту прохождения(по возрастанию)'/>
											<DropDownIconItem onClick={::this.handleSort} payload='{"key": "successPercentComplete", "isAsc": "false"}' text='Сортировать по успешному проценту прохождения(по убыванию)'/>
								</DropDownIcon>
								<Table
							        rowsCount={filteredAdaptResultInfo.length}
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
										cell={<TextCell data={filteredAdaptResultInfo} />}
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
										cell={<DateCell data={filteredAdaptResultInfo} />}
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
										cell={<PercentCell data={filteredAdaptResultInfo} />}
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
										cell={<PercentCell data={filteredAdaptResultInfo} />}
										width={285}
							        />
							    </Table>
							</div>
				}
			</div>
		);
	}
}

export default AdaptationBlock;