import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Homepage } from './pages/homepage'
import { CreateCourse } from './pages/CreateCourse';
import { EditCourse } from './pages/EditCourse';
import { CourseViewLayout } from './pages/CourseViewLayout'
import MyCourses from './pages/MyCourses';

const router = createHashRouter([
  {
    path: '/',
    element:<Homepage/>
  },
  {
    path: '/create-course',
    element:<CreateCourse/>
  },
  {
    path: '/my-courses',
    element:<MyCourses/>
  },
  {
    path: '/edit-course',
    element:<EditCourse/>
  },
  {
    path: '/course-view',
    element:<CourseViewLayout/>
  },
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
