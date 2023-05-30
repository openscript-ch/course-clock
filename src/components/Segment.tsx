import { Segment } from "../modals/segment"

export function Segment(props:Segment){
return(
<div className='newSegment'>

   <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Segment created</h3>

  <dl>
    <dt><b className="keyword">Titel:</b></dt> 
    <dd>{props.title}</dd>
    <dt><b className="keyword">Anfang:</b></dt>
    <dd>{props.startTime}</dd>
    <dt><b className="keyword">Ende:</b></dt>
    <dd>{props.endTime}</dd>
    <dt><b className="keyword">Ziel:</b></dt>
    <dd>{props.target}</dd>
    <dt><b className="keyword">Ablauf:</b></dt>
    <dd>{props.procedure}</dd>
    <dt><b className="keyword">Materialen:</b></dt>
    <dd>{props.material}</dd>
  </dl>

</div>
 )
}