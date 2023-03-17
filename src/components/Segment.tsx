interface SegmentProps {
  segmentData: {
    TitelSegment: string;
    startTime: string;
    endTime: string;
    target: string;
    procedure: string;
    materials: string;
  };
}

export function Segment( props:SegmentProps){
 
 const { segmentData } = props;

 return(
  <div className='newSegmente'>
   <h3 style={{fontSize: '1.5rem'}}>Segment created</h3>
   <br />
   <ul>
    <li><b>Titel:</b> {segmentData.TitelSegment}</li>
    <li><b>Anfang:</b> {segmentData.startTime}</li>
    <li><b>Ende:</b> {segmentData.endTime}</li>
    <li><b>Ziel:</b><br/>{segmentData.target}</li>
    <li><b>Ablauf:</b><br/>{segmentData.procedure}</li>
    <li><b>Materialen:</b><br/>{segmentData.materials}</li>
   </ul>
  </div>
 )
}