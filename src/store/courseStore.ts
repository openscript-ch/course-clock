import create from 'zustand';

import {devtools, persist} from 'zustand/middleware'

export interface courseValues {
  title?:string
  author?: string    
  dateStart?:string |Date
  dateEnd?: string | Date
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

  courseMetaData:           <courseValues[]>[],
  appMetaData:              <courseValues[]>[],
  selectedCourse:           <courseValues[]>[],
  segmentIdMetaData:        <number> 0,
  deletedSegmentIdMetaData: [],

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
saveDeletedSegmentId: (id: number) => {
  set((state: any) => ({
    deletedSegmentIdMetaData: [
      ...state.deletedSegmentIdMetaData, id,
    ],
  }));
},
  updatedSegmentMetaData: (updatedSegmentMetaData:courseValues) => {
    set((state:any) => ({
      selectedCourse: state.selectedCourse.map((obj:courseValues) => {
        if(obj.id === state.segmentIdMetaData) {
          return {
            ...obj,
            ...updatedSegmentMetaData,
          };
        }
        return obj
      }),
      appMetaData: state.appMetaData.map((arr:Array<object>) => arr.map((obj:courseValues) => {
        if (obj.id === state.segmentIdMetaData) {
          return {
            ...obj,
            ...updatedSegmentMetaData,      
          };
        }
        return obj
      }))
    }))
  },
  updatedCommonMetaData: (updatedCommonMetaData: courseValues) => {
    set((state: any) => ({
      appMetaData: state.appMetaData.map((arr:Array<object>) => arr.map((obj:courseValues) => {
        if (obj.id === 0) {
          return {
            ...obj,
            ...updatedCommonMetaData,      
          };
        }
        return obj
      }))
    }))
  },
  deleteSegmentMetaData: (id:number) => {
    set((state: any) => ({
      selectedCourse: state.selectedCourse.filter((obj: courseValues) => obj.id !== id),
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
  },
  resetSelectedCourse: () => {
    set({selectedCourse:[]})
  },
  setSelectedCourse: (selectedCourseArray: courseValues[]) => {
    set(() => ({
      selectedCourse: selectedCourseArray
    }));
  }, 
updateAppMetaData: () => {
  set((state: any) => {
    const deletedIds = state.deletedSegmentIdMetaData;
    const newAppMetaData = state.appMetaData.map((arr: Array<any>) =>
      arr.filter((obj: any) => !deletedIds.includes(obj.id))
    );
    return {
      appMetaData: newAppMetaData,
      deletedSegmentIdMetaData: [],
    };
  });
},
  deleteCourse: () => {
    set((state:any) => ({
      appMetaData: [...state.appMetaData.filter((arr:Array<object>) => arr !== state.selectedCourse)]
    }))
  }
});

const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'AppMetaData'
    })
  )
);
 
export default useCourseStore