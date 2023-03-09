import '../App.css'
interface EditCourseProps {
  setShowHomepageContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditCourse({ setShowHomepageContent }: EditCourseProps){
 return(
  <div>
   <p style={{color: 'black'}}>welcome to Edit </p>
  </div>
 )
}