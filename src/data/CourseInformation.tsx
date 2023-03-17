


export interface CourseInformation {
  Titel: string;
  Autor: string;
  dateStart: string;
  dateEnd: string;
  TitelSegment: string;
  startTime: string;
  endTime: string;
  target: string;
  procedure: string;
  materials: string;

}

export const CourseInformation: CourseInformation = {
  Titel: '',
  Autor: '',
  dateStart: '',
  dateEnd: '',
  TitelSegment: '',
  startTime: '',
  endTime: '',
  target: '',
  procedure: '',
  materials: '',
};

export function updateCourseInformation(values: any) {
  CourseInformation.Titel = values.Titel;
  CourseInformation.Autor = values.Autor;
  CourseInformation.dateStart = values.dateStart;
  CourseInformation.dateEnd = values.dateEnd;
  CourseInformation.TitelSegment = values.TitelSegment;
  CourseInformation.startTime = values.startTime;
  CourseInformation.endTime = values.endTime;
  CourseInformation.target = values.target;
  CourseInformation.procedure = values.procedure;
  CourseInformation.materials = values.materials;
}