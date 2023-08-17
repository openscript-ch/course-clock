import { IconPencil } from '@tabler/icons-react'
import { Main } from '../modals/main'
import useCourseStore from '../store/courseStore'
import DayView from './createCourse/DayView'
import WeekEdit from './editCourse/WeekEdit'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'

const CoursView = () => {

const {selectedCourse} = useCourseStore(
  (state:any) => ({
    selectedCourse: state.selectedCourse
  })
)

const generalInfo:Main= selectedCourse.find((obj:Main) =>  typeof obj.id === 'string' )

const days = Array.from({ length: generalInfo.day }, (_, index) => index + 1)

const exportStateToJson = () => {
   const jsonData = JSON.stringify(selectedCourse);
   const blob = new Blob([jsonData], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url; 
   a.download = `ourseClock_course-${selectedCourse.map((obj:Main) => obj.title)}`
   a.click();
   URL.revokeObjectURL(url);
 };

return(
  <>
  <div  className='viewPageHeader'>
  <h1 style={{textAlign: 'center', fontSize: '3rem'}} className='courseTitle'> Kursplanung <br /> <span className='teko tit'>"{generalInfo.title}"</span></h1>
  
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <div style={{float: 'right'}}>
      <Button className='printBtn' style={{}} variant="subtle" color='orange' onClick={() => print()}>Tagesansicht</Button>
      <Button className='printBtn' variant="subtle" color='orange'>Kursübersicht</Button>
      <Button className='printBtn' variant="subtle" color='orange' onClick={() => exportStateToJson()}>JSON</Button>
    </div>
  </div>
  <hr />
  </div>
  <div className='viewPageContent'>
  <div className='courseViewWeekContainer'>
   <WeekEdit numberOfDays={generalInfo.day}></WeekEdit>
  </div>
  <div className='courseViewDaysContainer'>
  {days.map(( index) => (
    <div className='courseViewDays'key={index}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
        <p className='dayNumberDayView'><span className='teko'>Tag:</span> {index}</p>
        <Link to='/edit-course'>
          <IconPencil className='editCourseIcon'></IconPencil>
        </Link>
      </div>
      <DayView numberOfDay={index}></DayView>
    </div>
  ))}
  </div>
  </div>
  </>
 )
}

export default CoursView;