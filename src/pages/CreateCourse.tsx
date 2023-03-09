import '../App.css'
interface CreateCourseProps {
  setShowHomepageContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateCourse({ setShowHomepageContent }: CreateCourseProps){
 return(
  <div>
   <p style={{color: 'black'}}>welcome to Create page </p>
  </div>
 )
}