import '../App.css'
import { Link } from "react-router-dom"
import { ThemeIcon } from '@mantine/core'
import { IconPlus, IconFile, IconClock } from '@tabler/icons-react'

export function Homepage() {
    return (
        <div className='home-Page'>
          <h1 className='project-Name'>
            course<br />
            <span className='teko'>
              <ThemeIcon style={{ marginTop: '1rem' }} radius={360} size={'6vw'} color={'orange'}>
                <IconClock size={'6rem'} />
              </ThemeIcon> CLOCK
            </span>
          </h1>

          <div className='options'>
            <Link to='/create-course' className='options-Settings' style={{ backgroundColor:'#fd7e14', width: '30vw', marginBottom: '2rem',  height: '5.5rem' }}>
              <ThemeIcon className='find-Icon' style={{ alignContent: 'center' }} radius={360} size={'lg'} color={'none'}>
                <IconPlus />
              </ThemeIcon>
              <h3><span className='teko'>ERSTELLEN</span></h3>
            </Link>
            
            <Link to='/my-courses' className='options-Settings' style={{ backgroundColor: '#b1b2b5' }}>
              <ThemeIcon style={{ alignContent: 'center' }} radius={360} size={'lg'} color={'none'}>
                <IconFile />
              </ThemeIcon>  
              <h3><span className='teko'>KURSE</span></h3>
            </Link>
          </div>
        </div> 
      )}

