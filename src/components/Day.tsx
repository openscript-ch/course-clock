import { Table } from '@mantine/core'
import React from 'react'
import { useRef } from 'react';
import { Tabs } from '@mantine/core';
import useCourseStore from '../store/courseStore';
import { Segment } from '../modals/segment';

function Day() {

const {dayInformation} = useCourseStore(
  (state) => ({
    dayInformation: state.dayInformation
  })
)

  return (
   <div style={{margin: '2rem'}}>
    <h3 style={{marginBottom: '1rem'}}>Tag 1</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
     <thead>
      <tr>
       <th className='thTHead'>Zeit</th> 
       <th className='thTHead'>Thema</th>
       <th className='thTHead'>Ablauf</th>
       <th className='thTHead'>Ziel</th>
       <th className='thTHead'>Material</th>
       <th className='thTHead'>Komentar</th>       
      </tr>
     </thead>
     <tbody>
       {dayInformation.filter((arr:Array<Segment>) => arr.length > 0 && arr[0]?.id ===
          1).map((arr: []) => arr.slice(1).map((obj:Segment) => (
           <tr>
            <td className='tdDay' >{obj.startTime}-{obj.endTime}</td>
            <td className='tdDay' >{obj.title}</td>
            <td className='tdDay' >{obj.procedure}</td>
            <td className='tdDay' >{obj.target}</td>
            <td className='tdDay' >{obj.material}</td>
            <td className='tdDay' >Das soll ein Kommentar sein</td>
           </tr>
          )))}
     </tbody>
    </table>
   </div>
  )
}

export default Day
