import { IconPencil } from '@tabler/icons-react'
import { Main } from '../modals/main'
import useCourseStore from '../store/courseStore'
import DayView from './DayView'
import WeekEdit from './WeekEdit'

const CoursView = ({ disabled = false }) => {

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)

const generalInfo:Main= selectedCourse.find((obj:Main) =>  typeof obj.id === 'string' )

const days = Array.from({ length: generalInfo.day }, (_, index) => index + 1)

return(
  <>
  <h1 style={{textAlign: 'center', fontSize: '3rem'}}> Kursplanung <br /> <span className='teko'>"{generalInfo.title}"</span></h1>
  <hr />
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', padding: '1rem'}}>
    <p><span className='teko'>Autor:</span> {generalInfo.author}</p>
    <p><span className='teko'>Erstellt am: </span>{generalInfo.date}</p>
  </div>
  <div style={{display:'flex', justifyContent: 'space-between', gap: '1rem'}}>
  <div style={{width:'50%'}}>
    {!disabled && (<WeekEdit numberOfDays={generalInfo.day} state={true}></WeekEdit>)}
  </div>
  <div style={{width: '50%'}}>
  {days.map(( index) => (
    <div className='courseViewDays'>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
        <p><span className='teko'>Tag:</span> {index}</p>
        <IconPencil></IconPencil>
      </div>
      <DayView numberOfDay={index} ></DayView>
    </div>
  ))}
  </div>
  </div>
  </>
 );
}

export default CoursView
