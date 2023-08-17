// import './App.css'
import {MantineProvider} from '@mantine/core';
import { Homepage } from './pages/homepage';
import { Router,Route,Routes,Link } from 'react-router-dom'
import { CreateCourse } from './pages/CreateCourse';
import { EditCourse } from './pages/EditCourse';
import { CourseViewLayout } from './pages/CourseViewLayout'
import MyCourses from './pages/MyCourses';

export default function App() {
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS >
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/create-course' element={<CreateCourse/>} />
        <Route path='/my-courses' element={<MyCourses/>}/>
        <Route path='/edit-course' element={<EditCourse/>}/>
        <Route path='/course-view' element={<CourseViewLayout/>}/>
      </Routes>
    </MantineProvider>
  );
}