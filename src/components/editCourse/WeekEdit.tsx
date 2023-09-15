import { useEffect, useState } from 'react'
import TableColumn from '../createCourse/TableColumn'
import useCourseStore from '../../store/courseStore'

function WeekEdit({ numberOfDays}: { numberOfDays: number}) {

  let dayStart = 0
  let daysCount = []

  const { selectedCourse } = useCourseStore(
  (state:any) => ({ selectedCourse: state.selectedCourse }))

  while (dayStart < numberOfDays) {daysCount.push(dayStart++)}

  useEffect(() => {
  }, [selectedCourse, daysCount])

  return (
    <>
    <table className='weekViewTable'> 
      <thead>
        <tr>
          {selectedCourse.slice(0, -1).map((courseArray:any, index:number) => (
            <th
              key={index}
              style={{
                border: '1px solid black',
                padding: '10px',
              }}
            >
              Tag {index+1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {selectedCourse.slice(0, -1).map((courseArray:any, index:number) => (
            <TableColumn key={index} dayNumber={index}/>
          ))}
        </tr>
      </tbody>
    </table>                                   
    </>
  )
}

export default WeekEdit
