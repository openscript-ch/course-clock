import create from 'zustand';

import {devtools, persist} from 'zustand/middleware'

export interface courseValues {
  title?:string
  author?: string    
  dateStart?:string
  dateEnd?: string
  titleSegment?: string
  startTime?: string 
  endTime?: string
  target?: string
  procedure?: string
  materials?: string
  id?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void;
}

const courseStore = (set:any) => ({

   courseMetaData: <courseValues[]>[],

   segmentIdMetaData: <number>0,

   addCommonMetaData: (commonMetaData:courseValues) => {
     set((state:any) => ({
       courseMetaData: [...state.courseMetaData, commonMetaData ]
     }))
   },
   addSegmentMetaData: (SegmentMetaData:courseValues) => {
     set((state:any) => ({
      courseMetaData: [...state.courseMetaData, SegmentMetaData ]
     }))
   },
   saveSegmentId: (id:number) =>{
    set(() => ({
      segmentIdMetaData: id
    }))
   },
   updatedSegmentMetaData: (id:number, updatedSegmentMetaData:courseValues) => {
      set((state:any) => ({
        courseMetaData: state.courseMetaData.map((obj:courseValues) => {
          if (obj.id === id) {
           return {...obj, ...updatedSegmentMetaData};
          } else {
           return obj;
          }
        })
      }))
    },
  updatedCommonMetaData: (courseId: number, updatedCommonMetaData: courseValues) => {
      set((state: any) => ({
        courseMetaData: state.courseMetaData.map((course: courseValues) => {
          if (course.id === courseId) {
            return {
              ...course,
              ...updatedCommonMetaData
            };
          } else {
            return course;
          }
        })
      }))
    },
  deleteSegmentMetaData: (id: number) => {
  set((state: any) => ({
    courseMetaData: state.courseMetaData.filter((obj: courseValues) => obj.id !== id),
  }));
},
  });

const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'CourseMetaData'
    })
  )
);

export default useCourseStore;