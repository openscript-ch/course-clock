import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import { courseClockStore } from './store'
import { Main, mainWithoutDate } from '../modals/main'
import { Segment, segmentDayId } from '../modals/segment'
import _ from 'lodash';

const courseStore = (set:any) => ({ 

  appMetaData:             [],
  selectedCourse:           <any>[], 
  segmentIdMetaData:        <string> '',
  commonIdMetaData:         <string>'',
  daysNum:                  <number>1,
  day:                      <number>0,
  dayOn:                    <number>1,
  dayDragged: <number>0,
  dayInformation: [],
  
saveSegmentId: (id:string) =>{
  set(() => ({
    segmentIdMetaData: id
  }))
},

filteredDayInformation: (day:number, values:Main) => {
  set((state:any) => {
    const arrayPosition = state.dayInformation.findIndex(
      (array:Array<Main>) => array.some((obj) => obj.day === day)
    )
    if (arrayPosition >= 0) { 
      state.dayInformation[arrayPosition].forEach((obj:Main) => {
        if (obj.day === day) {
          state.dayInformation[arrayPosition].push(values)
        }
      })
    }
    return {
      ...state, dayInformation: state.dayInformation,
    };
  })
},

addNewSegment: (id:number, obj:Segment) => { 
    set((state:any) => {
      const newArray = state.dayInformation.map((arr:any) => { 
        if (Array.isArray(arr) && arr.some((obj:segmentDayId) => obj.id === id)) {
          return [...arr, obj]
        }
        return arr
      })
      return { dayInformation: newArray }
    })
},

addNewSegmentEdit: (id:number, obj:Segment) => {
    set((state:any) => {
      const newArray = state.selectedCourse.map((arr:any) => { 
        if (Array.isArray(arr) && arr.some((obj:segmentDayId) => obj.id === id)) {
          return [...arr, obj]
        }
        return arr
      })
      return { 
        selectedCourse: newArray,
      };
    })
},

updateDayInformation: (value:mainWithoutDate) =>{
  set((state:any) => ({
    dayInformation: [...state.dayInformation, value]
  }))
},

updateSelectedCourse: (updatedSelectedCourse:Segment) => {
  set((state:any) => {
    const updatedArray = state.selectedCourse.map((arr:Array<Segment>) => {
      if(Array.isArray(arr)){
        return arr.map((obj:Segment) => (obj.id === state.segmentIdMetaData ? updatedSelectedCourse : obj))
      }
      return arr === state.segmentIdMetaData ? updatedSelectedCourse : arr
    })
    return {selectedCourse: updatedArray}
  })
},

updatedSelectedCourseMetaData: (updatedCommonMetaData: mainWithoutDate) => {
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
    const newAppMetaData = []
    for (let i = 0; i < state.appMetaData.length; i++) {
      const arraysAppMetaDaTA = state.appMetaData[i];
      const foundArray = arraysAppMetaDaTA.findIndex((obj: Main) => obj.id === state.commonIdMetaData)
      if (foundArray !== -1) {
        newAppMetaData.push(state.selectedCourse)
      } else {
        newAppMetaData.push(arraysAppMetaDaTA)
      }
    }
    return {
      appMetaData: newAppMetaData
    }
  })
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
  }))
},

// ------------new functions----------------------------

createDays: (daysNum:number) => {
  set(() => {
    const initialCourseArray = []
    for(let i = 1; i <= daysNum; i ++){
      initialCourseArray.push([{ id: i }]);
    }
    return {dayInformation: initialCourseArray}
  })
},

setDaysNum: (numberOfDays: number) => {
  set({daysNum:numberOfDays})
},

daySelected: (day:number) => {
  set({dayOn:day})
},

resetDaysNum: () => {
  set({daysNum:1})
},

addDayInformation: (daysArray:Array<object>) => {
  set((state:any) => ({ 
    dayInformation: [...state.dayInformation, daysArray] 
  }))
},

numberOfDay: (dayNum: number) => {
  set({day:dayNum})
},

resetSelectedCourse: () => {
  set({selectedCourse:[]})
},

deleteCourse: () => {
  set((state:any) => ({ 
    appMetaData: [...state.appMetaData.filter((arr:Array<object>) => arr !== state.selectedCourse)]
  }))
},

deleteSegment: (id:number|string) => {
  set((state:any) => {
    const searchForArray = state.selectedCourse.slice(0, -1).map((arr:[]) => {
      const searchForArray = arr.filter((obj:Segment) => obj.id !== id)
      return searchForArray.length > 0 ? searchForArray : null
    })
    return { ...state, selectedCourse: [...searchForArray, state.selectedCourse[state.selectedCourse.length - 1]] };
  })
},

updateSegment: (id: number | string, f: Segment) => {
  set((state: any) => {
    const updatedCourse = state.selectedCourse.map((arr: any) => {
      if (Array.isArray(arr)) {
        const updatedArray = arr.map((obj: Segment) => {
          if (obj.id === id) {
            return { ...obj, ...f }
          }
          return obj
        });
        return updatedArray.length > 0 ? updatedArray : null;
      }
      return arr
    });
    return { selectedCourse: updatedCourse };
  });
},

droppedEvent: (draggedItem:Segment, dayNum:number) => {
  set((state:any) => {
    const selectedCourse = state.selectedCourse.map((course:Segment) => {
      if (Array.isArray(course)) {
        const filteredCourse = course.filter((item) => JSON.stringify(item) !== JSON.stringify(draggedItem))
        if (course.some((item) => JSON.stringify(item) !== JSON.stringify(draggedItem))) {
          if (course[0]?.id === dayNum) {
            return [...filteredCourse, draggedItem] 
          } 
          return filteredCourse

        } else if(course.some((item) => JSON.stringify(item) === JSON.stringify(draggedItem))) {
            return course
          }
      }
      return course
    });

    return {selectedCourse:selectedCourse}
  });
},

updateSegmentEndTime: (segmentId: string, newEndTime: string) => {
    set((state:any) => {
      const updatedSegments = state.selectedCourse.segments.map((segment:Segment) => {
        if (segment.id === segmentId) {
          return { ...segment, endTime: newEndTime }
        }
        return segment
      })

      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          segments: updatedSegments,
        },
      }
    })
  },

  eventDragged: (dayDrag:number) => {
    set({dayDragged:dayDrag})
  }

})

const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'AppMetaData'
    })
  )
)

export default useCourseStore