import { mainForCourseComponent } from "../../modals/main"

function Courses(props:mainForCourseComponent) {
  return (
   <>
   <div className='course'>
    <h1 style={{marginTop: '1rem'}} className='teko'>{props.title}</h1>
   </div>
   </>
  )
}

export default Courses
