import { useState } from 'react';
import '../App.css';
import { ThemeIcon } from '@mantine/core';
import { IconPlus, IconFile, IconPdf, IconClock } from '@tabler/icons-react';
import { CreateCourse } from './CreateCourse';
import { EditCourse } from './EditCourse';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import MyCourses from './MyCourses';

export default function Homepage() {
  const [showHomepageContent, setShowHomepageContent] = useState(true);
    return (
      <Router>
        {showHomepageContent && (
        <div className='home-Page'>
          <h1 className='project-Name'>
            course<br />
            <span className='teko'>
              <ThemeIcon style={{ marginTop: '1rem' }} radius={360} size={'7rem'} color={'orange'}>
                <IconClock size={'7rem'} />
              </ThemeIcon>
              CLOCK
            </span>
          </h1>


          <div className='options'>

            <Link to='/my-courses' className='options-Settings' style={{ backgroundColor: 'black' }} onClick={() => setShowHomepageContent(false)}>
              <ThemeIcon className='find-Icon' style={{ alignContent: 'center' }} radius={360} size={'lg'} color={'orange'}>
                <IconFile />
              </ThemeIcon>
              <h3>your<span className='teko'>COURSES</span></h3>
            </Link>
            
            <Link to='/create-course' className='options-Settings' style={{ backgroundColor: '#b1b2b5', color: 'white' }} onClick={() => setShowHomepageContent(false)}>
              <ThemeIcon style={{ alignContent: 'center' }} radius={360} size={'lg'} color={'orange'}>
                <IconPlus />
              </ThemeIcon>  
              <h3>new<span className='teko'>COURSE</span></h3>
            </Link>

            <div className='options-Settings' style={{ backgroundColor: '#e5e5e5' }}>
              <ThemeIcon className='pdf-Icon' style={{ alignContent: 'center' }} radius={360} size={'lg'} color={'orange'}>
                <IconPdf />
              </ThemeIcon>
              <h3>PDF</h3>
            </div>
          </div>
        </div> 
        )}

        <Routes>
          <Route path='/create-course' element={<CreateCourse/>} />
          <Route path='/my-courses' element={<MyCourses/>}/>
          <Route path='/edit-course' element={<EditCourse/>}/>
        </Routes>
    </Router>
    );
}