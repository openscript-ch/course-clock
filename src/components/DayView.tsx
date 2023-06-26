import useCourseStore from '../store/courseStore'
import { Segment, segmentDayId } from '../modals/segment'

function DayView({ numberOfDay }: { numberOfDay: number }) {

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)

return (
  <>
   <div style={{margin: '0rem'}}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
       {selectedCourse.slice(0,-1).filter((arr:Array<segmentDayId>) => arr[0]?.id === numberOfDay).map((arr: []) => arr.slice(1).map((obj:Segment) => (
           <tr className='tr'>  
            <td className='tdDay'>{obj.startTime}-{obj.endTime}</td>
            <td className='tdDay'>{obj.title}</td>
            <td className='tdDay'>{obj.procedure}</td>
            <td className='tdDay'>{obj.target}</td>
            <td className='tdDay'>{obj.material}</td>
           </tr>
          )))}
     </tbody>
    </table>
  </div>
</>
)}
export default DayView
