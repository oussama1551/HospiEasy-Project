import React from 'react'
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject,
EventSettingsModel , ViewDirective ,ViewsDirective,
TimelineMonth,TimelineViews

} from '@syncfusion/ej2-react-schedule';





import './TableauBord.css'

const TableauBord = () => {
  return (
      <ScheduleComponent currentView='Day' height='950px' timeFormat='HH:mm' startHour='07:00' >
        <ViewsDirective >
          <ViewDirective option='Day' interval={5} ></ViewDirective>
          <ViewDirective option='Month'></ViewDirective>
          <ViewDirective option='TimelineDay'></ViewDirective>
          <ViewDirective option='TimelineMonth'></ViewDirective>

        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda , TimelineMonth ,TimelineViews]}/>
      </ScheduleComponent>
  )
}

export default TableauBord;  