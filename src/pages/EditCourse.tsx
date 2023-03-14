import '../App.css'
import { useNavigate } from "react-router-dom";

interface EditCourseProps {
  setShowHomepageContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditCourse({ setShowHomepageContent }: EditCourseProps) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Course</h1>
    </div>
  );
}