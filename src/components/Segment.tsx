import { courseValues } from "../store/courseStore"

export function Segment(props:courseValues){
  return(
   <div className='newSegmente'>
   <h3 style={{fontSize: '1.5rem'}}>Segment created</h3>
   <br />
   <ul>
    <li><b>Titel:      </b>      {props.TitelSegment} </li>
    <li><b>Anfang:     </b>      {props.startTime}    </li>
    <li><b>Ende:       </b>      {props.endTime}      </li>
    <li><b>Ziel:       </b><br/> {props.target}       </li>
    <li><b>Ablauf:     </b><br/> {props.procedure}    </li>
    <li><b>Materialen: </b><br/> {props.materials}    </li>
   </ul>
  </div>
 )
}