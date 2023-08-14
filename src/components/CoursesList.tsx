import Courses from './createCourse/course'
import useCourseStore from '../store/courseStore'
import { mainForSearchId } from '../modals/main'
import { useState } from 'react'
import { IconCirclePlus, IconEdit, IconJson, IconTrash} from '@tabler/icons-react'
import { Link } from "react-router-dom"
import { ActionIcon, Button} from '@mantine/core'
import { useEffect } from 'react'
import { Main } from '../modals/main'
import { Dropzone } from '@mantine/dropzone';
import { Group } from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'


function CoursesList() {
  
const {appMetaData} = useCourseStore(
  (state:any) => ({
    appMetaData: state.appMetaData
  })
)
const importCourse= useCourseStore((state) => state.importCourse)

const setSelectedCourse = useCourseStore((state:any) => state.setSelectedCourse)
const deleteCourse = useCourseStore((state:any) => state.deleteCourse)
const updateCommonMetaData = useCourseStore((state:any) => state.updateCommonMetaData)

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

let i  = 1

if(i ===1){

}


function delCourse(array:[]){
  selectCourse(array)
  deleteCourse()
}

  const handleFileChange = async (acceptedFiles:any) => {
    let file = acceptedFiles[0];

    if (!file) return;

    try {
      const fileContent = await file.text();
      const importedData = JSON.parse(fileContent);

      const updatedMetaData = appMetaData.concat(importedData);
      importCourse(updatedMetaData);

    } catch (error) {
      console.error('Error while importing:', error);
    }
  };

  const submit = (innerArray:[]) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='confirm-Alert'>
            <h1 className='teko'>Kurs löschen?</h1>
            <p style={{color: 'white', fontSize: '.8rem'}}> <i>Alle Daten im Zusammenhang mit diesem Kurs werden gelöscht.</i></p>
            <div className='confirm-Alert-Options'>
              <Button
              compact
              variant='filled'
              color='orange'
              onClick={() => {
                delCourse(innerArray);
                onClose();
              }}
              >
                Ja
              </Button>
              <Button 
              variant='filled'
              color='orange' 
              compact onClick={onClose}>
                Nein
              </Button>
            </div>
          </div>
        )}
  })}
return (
  <>
    <div className='title-Section'>
      <h1> <span className='teko'>KURSE</span></h1>
    </div>
    <hr />
    <div className='courseList'>
      <div>
        <Link to='/create-Course' >
          <div className='createOption' style={{marginBottom: '1rem', textAlign: 'center', paddingTop: '1rem'}}>
            <IconCirclePlus color='white' size={'2.5rem'}></IconCirclePlus>
          </div>
        </Link>
        <Dropzone
        onDrop={handleFileChange}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        className='createOption'
        >
          <Group position="center" spacing="xl" style={{ pointerEvents: 'none', marginTop: '-0.5rem' }}>
            <Dropzone.Accept>
              <IconUpload
              size="3.2rem"
              stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
              size="3.2rem"
              stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconJson size="3.2rem" stroke={1.5} />.file
            </Dropzone.Idle>
          </Group>
        </Dropzone>
      </div>
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
             <IconTrash onClick={() => submit(innerArray)}/>             
            </ActionIcon>
          </div>
        </div>
      ))}
    </div>
  </>
)}

export default CoursesList
