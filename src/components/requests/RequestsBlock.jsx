import React, { Component, PropTypes } from 'react';
import SearchBar from '../modules/search-bar';
import {AlertDanger} from '../modules/alert';
import { DropDownIcon, DropDownIconItem } from '../modules/dropdown-icon';
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

const ObjectCell = ({rowIndex, data, columnKey, ...props}) => {
	const val = data[rowIndex][columnKey];
	const href = data[rowIndex]['personHref'];
	return (
		<Cell {...props}>
		    <a href={href} title={val} target="_blank">{val}</a>
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

class RequestBlock extends Component {
	
	handleSort(e, payload){
		if (this.props.sortRequestsData){
			this.props.sortRequestsData(payload);
		}
	}

	render(){
		const { isFetching, error } = this.props;
		var {requestsInfo, searchRequestsData, filteredRequestsInfo} = this.props;

		return (
			<div className="requests-block">
				{isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          		error ? <AlertDanger text={error} /> :
				(requestsInfo && requestsInfo.length === 0) ? 
					<div className="requests-block__empty">
						<span className="requests-block__empty-descr">Нет данных</span>
					</div>:
					<div className="requests-block__content">
						<SearchBar onSearch={searchRequestsData} className="requests-block__searchbar" classNameInput="requests-block__searchbar-input"/>
						<span className="requests-block__count">{filteredRequestsInfo.length}</span>
						<DropDownIcon
								icon={<i className="icon-arrow-combo"></i>} 
								className="requests-block__sort default-button">
									<DropDownIconItem onClick={::this.handleSort} payload='{"key": "personFullname", "isAsc": "true"}' text='Сортировать по ФИО(А-я)'/>
									<DropDownIconItem onClick={::this.handleSort} payload='{"key": "personFullname", "isAsc": "false"}' text='Сортировать по ФИО(я-А)'/>
									<DropDownIconItem onClick={::this.handleSort} payload='{"key": "code", "isAsc": "true"}' text='Сортировать по коду(во возрастанию)'/>
									<DropDownIconItem onClick={::this.handleSort} payload='{"key": "code", "isAsc": "false"}' text='Сортировать по коду(по убыванию)'/>
									<DropDownIconItem onClick={::this.handleSort} payload='{"key": "objectName", "isAsc": "true"}' text='Сортировать по объекту(по возрастанию)'/>
									<DropDownIconItem onClick={::this.handleSort} payload='{"key": "objectName", "isAsc": "false"}' text='Сортировать по объекту(по убыванию)'/>
						</DropDownIcon>
						<Table
					        rowsCount={filteredRequestsInfo.length}
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
								cell={<ObjectCell data={filteredRequestsInfo} />}
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
								cell={<TextCell data={filteredRequestsInfo} />}
								width={200}
					        />
					        <Column
					        	columnKey="objectName"
					        	header={
						            <SortHeaderCell
						              onSortChange={this._onSortChange}>
						              Объект
						            </SortHeaderCell>
						        }
								cell={<TextCell data={filteredRequestsInfo} />}
								width={210}
					        />
					    </Table>
					</div>
				}
			</div>
		);
	}
}

export default RequestBlock;