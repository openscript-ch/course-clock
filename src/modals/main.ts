export type Main = {
 title: string
 author: string
 day: number
 id: string
}

export type mainBeforeStored = Omit<Main, 'id'>

export type mainForCourseComponent = {
 title: string
}

export type mainForSearchId = {
 id:string
}
