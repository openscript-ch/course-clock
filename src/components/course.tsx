import { mainForCourseComponent } from "../modals/main" 

function Courses(props:mainForCourseComponent) {
  return (
   <>
   <div className='course'>
    <h1 className='teko'>{props.title}</h1>
   </div>
   </>
  )
}

export default Courses
