import Courses from './course'
import useCourseStore, { courseValues } from '../store/courseStore'
import { useState } from 'react'
import { IconCirclePlus, IconEdit, IconTrash} from '@tabler/icons-react'
import { BrowserRouter as Router, Link } from "react-router-dom";


function CoursesList() {

const {appMetaData} = useCourseStore(
  (state) => ({
    appMetaData: state.appMetaData
  })
)

const [course, setCourse] = useState(appMetaData)

  return (
  <>
    <div className='title-Section'>
     <h1> <span className='teko'>KURSE</span></h1>
     <p className='description'>hier sind deine <span className='teko'>KURSE</span></p>
    </div>
    <hr />
    <div className='courseList'>
    {course.map((innerArray, index) => (
      <div key={index}>
        { innerArray.filter(obj => obj.id === 0).map((obj:courseValues, index1:number) => (
          <div key={index1}>
            <Courses
              key={index}
              title={obj?.title} 
            /> 
          </div>))}
        <Link to='/edit-course' className='links'>
          <IconEdit/>
        </Link>
        <IconTrash/>
      </div>
    ))}

    <Link to='/create-Course'>
     <div className='newCourse'>
      <span className='teko'>KURS</span> erstellen
      <IconCirclePlus color='white' size={'4rem'}></IconCirclePlus>
     </div>
    </Link>
    </div>
    </>
   )
  }
 export default CoursesList