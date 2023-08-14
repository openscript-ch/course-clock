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
          {daysCount.map((number) => (
            <th
              style={{
                border: '1px solid black',
                padding: '10px'
              }}
            >
              Tag {number + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {daysCount.map((index) => (
            <TableColumn key={index} dayNumber={index}/>
          ))}
        </tr>
      </tbody>
    </table>                                   
    </>
  )
}

export default WeekEdit
