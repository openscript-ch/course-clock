import create from 'zustand';

import {devtools, persist} from 'zustand/middleware'

export interface courseValues {
  Titel?:string
  Autor?: string    
  dateStart?:string
  dateEnd?: string
  TitelSegment?: string
  startTime?: string 
  endTime?: string
  target?: string
  procedure?: string
  materials?: string
  id?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void;
}

const courseStore = (set:any) => ({

   newListInformation: <courseValues[]>[],

   segmentId: <number>0,

   addAllgemeinInformation: (AllgemeinInformation:any) => {
     set((state:any) => ({
       newListInformation: [...state.newListInformation, AllgemeinInformation ]
     }))
   },
   addSegmentCourseInformation: (SegmentInformation:any) => {
     set((state:any) => ({
      newListInformation: [...state.newListInformation, SegmentInformation ]
     }))
   },
   saveSegmentId: (id:number) =>{
    set((state:number) => ({
      segmentId: id
    }))
   },
   updateSegmentInformation: (id:number, updatedSegmentValues:courseValues) => {
      set((state:any) => ({
        newListInformation: state.newListInformation.map((obj:courseValues) => {
          if (obj.id === id) {
           return {...obj, ...updatedSegmentValues};
          } else {
           return obj;
          }
        })
      }))
    },
  updateAllgemeinInformation: (courseId: number, updatedAllgemeinValues: courseValues) => {
      set((state: any) => ({
        newListInformation: state.newListInformation.map((course: courseValues) => {
          if (course.id === courseId) {
            return {
              ...course,
              ...updatedAllgemeinValues
            };
          } else {
            return course;
          }
        })
      }))
    },
  deleteSegment: (id: number) => {
  set((state: any) => ({
    newListInformation: state.newListInformation.filter((obj: courseValues) => obj.id !== id),
  }));
},
  });

const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'CourseInformation'
    })
  )
);

export default useCourseStore;