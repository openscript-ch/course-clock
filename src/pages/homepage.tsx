import '../App.css'
import {
  ThemeIcon,
} from '@mantine/core';

import { IconPlus,IconFile, IconPdf, IconClock } from '@tabler/icons-react';



export function Homepage(){
 return(
<div className='home-Page'>
      <h1 className='project-Name'>course<br /><span className='teko'>
        <ThemeIcon  style={{marginTop: '1rem'}} radius={360} size={'7rem'} color={"orange"}>
          <IconClock size={'7rem'} />
        </ThemeIcon>  CLOCK</span></h1>
      <div className='options'>
      <div className='options-Settings' style={{backgroundColor: 'black', color: 'white'}}>
        <ThemeIcon style={{alignContent: 'center'}} radius={360} size={'lg'} color={"orange"}>
          <IconPlus />
        </ThemeIcon>
        <h3>new <span className='teko'>COURSE</span></h3>
      </div>
      <div className='options-Settings' style={{backgroundColor: '#b1b2b5',}}>
        <ThemeIcon className='find-Icon' style={{alignContent: 'center'}} radius={360} size={'lg'} color={"orange"}>
          <IconFile />
        </ThemeIcon>
        <h3>your <span className='teko'></span>COURSES</h3>
      </div>
      <div  className='options-Settings' style={{backgroundColor: '#e5e5e5'}}>
        <ThemeIcon className='pdf-Icon' style={{alignContent: 'center'}} radius={360} size={'lg'} color={"orange"}>
          <IconPdf />
        </ThemeIcon>
        <h3>PDF</h3>
      </div>
      </div>
      </div>
 )
}