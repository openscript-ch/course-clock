import useCourseStore from '../../store/courseStore'
import { Segment, segmentDayId } from '../../modals/segment'

function DayView({ numberOfDay}: { numberOfDay: number}) {

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)

return (
  <>
   <div>
    <table className='dayViewTable'>
     <thead>
      <tr> 
       <th className='thTHeadTime'>Zeit</th> 
       <th className='thTHead'>Thema</th>
       <th className='thTHead'>Ablauf</th>
       <th className='thTHead'>Ziel</th>
       <th className='thTHead'>Material</th>
      </tr>
     </thead>
     <tbody>
       {selectedCourse.slice(0, -1).filter((arr: Array<segmentDayId>) => arr.length > 0 && arr[0]?.id === numberOfDay ).map((arr: []) => arr.slice(1).sort((obj1: Segment, obj2:Segment) => {const startTime1 = parseFloat(obj1.startTime.replace(':', '.'))
           const startTime2 = parseFloat(obj2.startTime.replace(':', '.'))
           return startTime1 - startTime2
      }).map((obj: Segment, index:number) =>
                  <tr className='tr' key={index}>  
                    <td className='tdDay'>{obj.startTime}-{obj.endTime}</td>
                    <td className='tdDay'>{obj.title}</td>
                    <td className='tdDay'>{obj.procedure}</td>
                    <td className='tdDay'>{obj.target}</td>
                    <td className='tdDay'>{obj.material}</td>
                  </tr>
        ))}
     </tbody>
    </table>
  </div>
</>
)}
export default DayView
