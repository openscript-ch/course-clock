export type Segment = {
 title: string
 startTime: string
 endTime: string
 target: string
 procedure: string
 material: string
 id:  string 
}

export type segmentBeforeStored = Omit<Segment, "id">

export type segmentDayId = {
 id: number
}

export type segmentTitleForEvent = {
 title:string
}