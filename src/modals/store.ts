import { Course } from "../modals/course"

export type courseClockStore = {
 appMetaData: Array<Course>[]
 selectedCourse: Course
 commonIdMetaData: string
 segmentIdMetaData: string
 dayInformation: Object[]
}