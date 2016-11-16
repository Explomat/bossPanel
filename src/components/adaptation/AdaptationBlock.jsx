import React, { Component, PropTypes } from 'react';
import SearchBar from '../modules/search-bar';
import {AlertDanger} from '../modules/alert';
import { DropDownIcon, DropDownIconItem } from '../modules/dropdown-icon';
import DropDown from '../modules/dropdown';
import {Table, Column, Cell} from 'fixed-data-table';
import {payload as adaptationPayload}  from '../../utils/adaptationBlockStatuses';

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

const ObjectCell = ({rowIndex, data, columnKey, ...props}) => {
	const val = data[rowIndex][columnKey];
	const href = data[rowIndex]['personHref'];
	return (
		<Cell {...props}>
		    <a href={href} title={val} target="_blank">{val}</a>
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

	handleChangeStatus(e, payload){
		const searchValue = this.refs.searchBar.getValue();
		if (this.props.changeAdaptStatus){
			this.props.changeAdaptStatus(payload, searchValue);
		}
	}

	handleSort(e, payload){
		if (this.props.sortAdaptData){
			this.props.sortAdaptData(payload);
		}
	}

	render(){
		const { isFetching, error } = this.props;
		var {adaptResultInfo, count, searchAdaptData, status} = this.props;

		return (
			<div className="adaptation-block">
				{isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          			error ? <AlertDanger text={error} /> : 
						(count === 0) ? 
							<div className="adaptation-block__empty">
								<span className="adaptation-block__empty-descr">Нет данных</span>
							</div>:
							<div className="adaptation-block__content">
								<SearchBar 
									ref="searchBar" 
									onSearch={searchAdaptData} 
									className="adaptation-block__searchbar" 
									classNameInput="adaptation-block__searchbar-input"/>
								<span className="adaptation-block__count">{adaptResultInfo.length}</span>
								
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
								<DropDown 
									onChange={::this.handleChangeStatus} 
									items={adaptationPayload} 
									selectedPayload={status} 
									deviders={[1]} 
									className="adaptation-block__statuses"/>
								<Table
							        rowsCount={adaptResultInfo.length}
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
										cell={<ObjectCell data={adaptResultInfo} />}
										width={400}
							        />
							        <Column
							        	columnKey="planReadinessDate"
							        	header={
								            <SortHeaderCell
								              onSortChange={this._onSortChange}>
								              Планируемая дата завершения
								            </SortHeaderCell>
								        }
										cell={<DateCell data={adaptResultInfo} />}
										width={185}
							        />
							        <Column
							        	columnKey="totalPercentComplete"
							        	header={
								            <SortHeaderCell
								              onSortChange={this._onSortChange}>
								              Процент прохождения
								            </SortHeaderCell>
								        }
										cell={<PercentCell data={adaptResultInfo} />}
										width={195}
							        />
							        <Column
							        	columnKey="successPercentComplete"
							        	header={
								            <SortHeaderCell
								              onSortChange={this._onSortChange}>
								              Успешный процент прохождения
								            </SortHeaderCell>
								        }
										cell={<PercentCell data={adaptResultInfo} />}
										width={185}
							        />
							    </Table>
							</div>
				}
			</div>
		);
	}
}

export default AdaptationBlock;