import React, { Component } from 'react';
import ChartBlock from '../chart/ChartBlock';
import {AlertDanger} from '../modules/alert';
import SelectItems from '../modules/select-items';
import {get} from '../../utils/ajax';
import config from '../../config';

import './courses-block.scss';

/*var data = {"pagesCount":257,"items":[{"id":"6350389678412006346","data":{"fullname":"Babeshko Tetyana","subdivision":"Филиал на Кипре","position":"Менеджер по телемаркетингу"}},{"id":"6291016332926001754","data":{"fullname":"Kaiser Victoras","subdivision":"Филиал на Кипре","position":"Директор"}},{"id":"6352987278858527155","data":{"fullname":"Kamenova Desislava Milcheva","subdivision":"Отдел международной отчетности и аудита","position":"Бухгалтер"}},{"id":"6356450083445160273","data":{"fullname":"Matveev Савва Янович","subdivision":"Москва","position":"Кандидат"}},{"id":"6252794208737110688","data":{"fullname":"Абалмасов Михаил Сергеевич","subdivision":"Отдел продаж","position":"Продавец-консультант"}},{"id":"5883468162699000389","data":{"fullname":"Абалымов Андрей Николаевич","subdivision":"Отдел доставки","position":"Водитель"}},{"id":"6346307762451645060","data":{"fullname":"Абаюшкин Григорий Алексеевич","subdivision":"Склад","position":"Кладовщик"}},{"id":"5522771634686415858","data":{"fullname":"Абдугалимов Роман Жанадильевич","subdivision":"Отдел маркетинга","position":"Менеджер по маркетингу"}},{"id":"3752740218310032640","data":{"fullname":"Абдулина Светлана Шамильевна","subdivision":"Отдел диспетчеризации","position":"Диспетчер"}},{"id":"6285449570015779921","data":{"fullname":"Абдуллаев Илья Владимирович","subdivision":"Группа закупок садовая техника и инструменты","position":"Категорийный менеджер"}},{"id":"5721672857526077527","data":{"fullname":"Абдуллин Артур Данилович","subdivision":"Отдел продаж Регионы","position":"AM"}},{"id":"5729662875190709943","data":{"fullname":"Абдулхадеев Равиль Ахиевич","subdivision":"Отдел доставки","position":"Водитель-экспедитор"}},{"id":"5811487204090993256","data":{"fullname":"Абдурахманов Сергей Алиевич","subdivision":"Склад","position":"Кладовщик-универсал"}},{"id":"5322612595250781382","data":{"fullname":"Абдурахманова Аделя Саидовна","subdivision":"Юридический отдел","position":"Юрисконсульт"}},{"id":"6080023055416391242","data":{"fullname":"Абедчанова Алмагуль Сабржановна","subdivision":"Отдел диспетчеризации","position":"Оператор склада"}},{"id":"6210861623492871277","data":{"fullname":"Абрамов Александр Александрович","subdivision":"Отдел продаж","position":"Старший продавец-консультант"}},{"id":"6184888817028523847","data":{"fullname":"Абрамов Андрей Михайлович","subdivision":"Группа развития сервисных услуг","position":"Менеджер проектов"}},{"id":"6052339387382570065","data":{"fullname":"Абрамов Виталий Урилович","subdivision":"Склад","position":"Кладовщик"}},{"id":"6306230301843140631","data":{"fullname":"Абрамов Владимир Викторович","subdivision":"Склад","position":"Логист"}},{"id":"6064397233019505181","data":{"fullname":"Абрамов Максим Сергеевич","subdivision":"Склад","position":"Кладовщик"}}],"headerCols":[{"name":"ФИО пользователя","type":"string"},{"name":"Подразделение","type":"string"},{"name":"Должность","type":"string"}]};

class CoursesBlock extends Component {

  constructor(props){
    super(props);
    this.state = {
      isDisplay: false,
      items: [],
      headerCols: [],
      selectedItems: [],
      pagesCount: 1
    }
  }

  _getData(search, page){
    search = search || '';
    page = page || 1;
    get(config.url.createPath({action_name: 'getCollaborators', server_name: 'Test1', search: search, page: page})).then(data => {
      var _data = JSON.parse(data);
      this.setState({
        items: _data.items,
        headerCols: _data.headerCols,
        pagesCount: _data.pagesCount
      });
    })
  }

  handleSave(items){
    this.setState({selectedItems: items, isDisplay: false})
  }

  handleClose(){
    this.setState({isDisplay: false});
  }

  handleClick(){
    this.setState({isDisplay: !this.state.isDisplay});
    this._getData();
  }

  handleChange(search, page){
    this._getData(search, page);
  }

  render(){
    const {isDisplay, items, selectedItems, headerCols, pagesCount} = this.state;
    const {isFetching, isFetchingByPeriod, error, coursesResultInfo, period, loadCoursesByPeriod} = this.props;
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Click me</button>
        {isDisplay && <SelectItems 
                        items={items}
                        selectedItems={selectedItems} 
                        headerCols={headerCols} 
                        pagesCount={pagesCount} 
                        onChange={this.handleChange.bind(this)}
                        onSave={this.handleSave.bind(this)}
                        onClose={this.handleClose.bind(this)}/> }
        <div className="courses-block">
          {isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
            error ? <AlertDanger text={error}/> : 
              (<ChartBlock 
                title="Курсы" 
                chartData={coursesResultInfo} 
                selectedPeriod={period}
                onSelectPeriod={loadCoursesByPeriod}
                fetching={isFetchingByPeriod}/>)
          }
        </div>
      </div>
    )
  }
}*/

const CoursesBlock = ({isFetching, isFetchingByPeriod, error, coursesResultInfo, period, loadCoursesByPeriod}) => {
  return (
      <div className="courses-block">
        {isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          error ? <AlertDanger text={error}/> : 
            (<ChartBlock 
              title="Курсы" 
              chartData={coursesResultInfo} 
              selectedPeriod={period}
              onSelectPeriod={loadCoursesByPeriod}
              fetching={isFetchingByPeriod}/>)
        }
      </div>
  )
}

export default CoursesBlock;
