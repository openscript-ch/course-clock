import create from 'zustand';
import {devtools, persist} from 'zustand/middleware'
import { courseClockStore } from '../modals/store';
import { Main } from '../modals/main';
import { Segment } from '../modals/segment';

const courseStore = (set:any) => ({ 

  appMetaData:             [],
  selectedCourse:           <any>[],
  segmentIdMetaData:        <number> 0,
  commonIdMetaData:         <string>'',
  day:                      <number>0,
  deletedSegmentIdMetaData:  <courseClockStore[]>[],
  dayInformation: [],


saveSegmentId: (id:number) =>{
  set(() => ({
    segmentIdMetaData: id
  }))
},

filteredDayInformation: (day:number, values:Main) => {
  set((state:any) => {
    const arrayPosition = state.dayInformation.findIndex(
      (array:Array<Main>) => array.some((obj) => obj.day === day)
    );
    if (arrayPosition >= 0) {
      state.dayInformation[arrayPosition].forEach((obj:Main) => {
        if (obj.day === day) {
          state.dayInformation[arrayPosition].push(values)
        }
      });
    }
    return {
      ...state,
      dayInformation: state.dayInformation,
    };
  })
},

addNewSegment: (id:number, obj:Segment) => {
    set((state:any) => {
      const newArray = state.dayInformation.map((arr:any) => { 
        if (Array.isArray(arr) && arr.some((obj:Segment) => obj.id === id)) {
          return [...arr, obj];
        }
        return arr;
      });
      return { dayInformation: newArray };
    });
  },

updateDayInformation: (value:Main) =>{
  set((state:any) => ({
    dayInformation: [...state.dayInformation, value]
  }))
},

updateSelectedCourse: (updatedSelectedCourse:Segment) => {
  set((state:any) => {
    const updatedArray = state.selectedCourse.map((arr:Array<Segment>) => {
      if(Array.isArray(arr)){
        return arr.map((obj:Segment) => (obj.id === state.segmentIdMetaData ? updatedSelectedCourse : obj));
      }
      return arr === state.segmentIdMetaData ? updatedSelectedCourse : arr
    });
    return {selectedCourse: updatedArray}
  })
},

updatedSelectedCourseMetaData: (updatedCommonMetaData: Main) => {
  set((state: any) => ({
    selectedCourse: state.selectedCourse.map((obj:Main) => {
      if(obj.id === state.commonIdMetaData) {
        return {
          ...obj,
          ...updatedCommonMetaData,
        };
      } 
      return obj
    }),
  }))
},

pushSelectedCourseToApp: () => {
  set((state:any) => {
    const newAppMetaData = [];
    for (let i = 0; i < state.appMetaData.length; i++) {
      const arraysAppMetaDaTA = state.appMetaData[i];
      const foundArray = arraysAppMetaDaTA.findIndex((obj: Main) => obj.id === state.commonIdMetaData);
      if (foundArray !== -1) {
        newAppMetaData.push(state.selectedCourse);
      } else {
        newAppMetaData.push(arraysAppMetaDaTA);
      }
    }
    return {
      appMetaData: newAppMetaData
    };
  });
},
updateCommonMetaData: (id:string) => {
  set({commonIdMetaData:id})
},
pushsDayInformationToApp: () => {
  set((state: any) => ({
    appMetaData: [...state.appMetaData, state.dayInformation],
  }))
},

resetDayInformation: () => {
  set({dayInformation:[]})
},

setSelectedCourse: (selectedCourseArray: courseClockStore) => {
  set(() => ({
    selectedCourse: selectedCourseArray,
  }));
},




// ------------new functions----------------------------

createDays: (daysNum:number) => {
  set((state:any) => {
    const initialCourseArray = []
    for(let i = 1; i <= daysNum; i ++){
      initialCourseArray.push([{ id: i }]);
    }
    return {dayInformation: initialCourseArray}
  })
},

addDayInformation: (daysArray:Array<object>) => {
  set(() => ({
    dayInformation: daysArray 
  }))
},

numberOfDay: (dayNum: number) => {
  set({day:dayNum})
},

deleteCourse: () => {
  set((state:any) => ({ 
    appMetaData: [...state.appMetaData.filter((arr:Array<object>) => arr !== state.selectedCourse)]
  }))
},


});
const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'AppMetaData'
    })
  )
);
export default useCourseStore