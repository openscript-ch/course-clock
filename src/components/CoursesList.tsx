import Courses from './course'
import useCourseStore from '../store/courseStore'
import { mainForSearchId } from '../modals/main'
import { useState } from 'react'
import { IconCirclePlus, IconEdit, IconTrash} from '@tabler/icons-react'
import { Link } from "react-router-dom"
import { ActionIcon } from '@mantine/core'
import { useEffect } from 'react'
import { Main } from '../modals/main'

function CoursesList() {
  
const {appMetaData} = useCourseStore(
  (state) => ({
    appMetaData: state.appMetaData
  })
)

const setSelectedCourse = useCourseStore((state) => state.setSelectedCourse)
const deleteCourse = useCourseStore((state) => state.deleteCourse)
const updateCommonMetaData = useCourseStore((state) => state.updateCommonMetaData)

const [course, setCourse] = useState(appMetaData)

useEffect(() => {
  setCourse(appMetaData)
  }, [appMetaData]
) 

function selectCourse(array:any) {
  setSelectedCourse(array)
  const mainInfoArray:Main = array.find((obj:mainForSearchId) => typeof obj.id === 'string')
  updateCommonMetaData(mainInfoArray.id)
}


function delCourse(array:[]){
  selectCourse(array)
  deleteCourse()
}
return (
  <>
    <div className='title-Section'>
      <h1> <span className='teko'>KURSE</span></h1>
      <p className='description'>hier sind deine <span className='teko'>KURSE</span></p>
    </div>
    <hr />
    <div className='courseList'>
      <Link to='/create-Course'>
        <div className='newCourse'>
          <span className='teko'> KURS </span> erstellen
          <IconCirclePlus color='white' size={'4rem'}></IconCirclePlus>
        </div>
      </Link>
      {course.map((innerArray:[]) => (
        <div>
          {innerArray.filter((obj:mainForSearchId) => typeof obj.id === 'string').map((obj:Main) => (
            <Link className='link' to='/course-view' onClick={() => selectCourse(innerArray)}>
            <div>
              <Courses
                title={obj.title} 
              /> 
            </div>
            </Link>
            ))
          }
          <div style={{display: 'flex'}}>
            <Link to='/edit-course' className='links'>
              <ActionIcon>
                <IconEdit  color='black'onClick={() => selectCourse(innerArray)}/>
              </ActionIcon>
            </Link> 
            <ActionIcon>
             <IconTrash onClick={() => delCourse(innerArray)}/>
            </ActionIcon>
          </div>
        </div>
      ))}
    </div>
  </>
)}
export default CoursesList