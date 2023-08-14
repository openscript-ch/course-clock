import { courseValues } from "../store/courseStore"

function Courses(props:courseValues) {
  return (
   <>
   <div className='course'>
    <h1 className='teko'>{props.title}</h1>
   </div>
   </>
  )
}

export default Courses
