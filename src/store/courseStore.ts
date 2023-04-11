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

   appMetaData: <courseValues[]>[],

   courseMetaData: <courseValues[]>[  ],

   segmentIdMetaData: <number>0,

   addCommonMetaData: (commonMetaData:courseValues) => {
     set((state:any) => ({
       courseMetaData: [...state.courseMetaData, commonMetaData]
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
  pushNewMetaData: (newArray: any[]) => {
      set((state:any) => ({
        appMetaData: [...state.appMetaData, ...newArray]
      }))
    },
  pushsCourseMetaDataToApp: () => {
      set((state: any) => ({
        appMetaData: [...state.appMetaData, state.courseMetaData],
      }))
    },
  resetCourseMetaData: () => {
    set({courseMetaData:[]})
  }
  });

const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'AppMetaData'
    })
  )
);

export default useCourseStore;