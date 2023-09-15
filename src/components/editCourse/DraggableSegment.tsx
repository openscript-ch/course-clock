import { Rnd } from 'react-rnd'
import { Segment } from '../../modals/segment'
import useCourseStore from '../../store/courseStore'
import { useState } from 'react'
import { RndResizeCallback, ResizableDelta } from 'react-rnd'

const DraggableSegment = ({segment}: { segment: Segment }) => {

//-------------------------- store function/values ----------------------------------------------
  const droppedEvent = useCourseStore((state:any) => state.droppedEvent)

  const {dayDragged} = useCourseStore((state:any) => ({dayDragged: state.dayDragged}))
//-------------------------- calculate events position/length -----------------------------------

  const calculateHeight = (endTime:string, startTime:string) => {
    const [hoursStart, minutesStart] = startTime.split(':')
    const [hoursEnd, minutesEnd] = endTime.split(':')
    const startTimeNumber = parseInt(hoursStart, 10) * 60 + parseInt(minutesStart, 10)
    const endTimeNumber = parseInt(hoursEnd, 10) * 60 + parseInt(minutesEnd, 10)

    let difference = endTimeNumber - startTimeNumber 

    if (difference < 0) {
      difference += 24 * 60
    }

    return difference * 2
  }

  const calculatY = (startTime: string) => {
    const [hoursStart, minutesStart] = startTime.split(':')
    const startTimeNumber = parseInt(hoursStart, 10) + parseInt(minutesStart, 10) / 60;
    return startTimeNumber * 60 * 2 - 600
  }

//-------------------------- Drag and Drop events -----------------------------------------------

  const [dragEnabled, setDragEnabled] = useState(true)

  const toggleDrag = () => {
    setDragEnabled(!dragEnabled)
  }
  
  const changeEventPlace = () => {
    droppedEvent(segment, dayDragged)
  } 

//-------------------------- Resize event lenght ------------------------------------------------

  const [endTime, setEndTime] = useState(parseFloat(segment.endTime))

  const handleResize: RndResizeCallback = (
    e: MouseEvent | TouchEvent,
    dir: string,
    ref: HTMLElement,
    delta: ResizableDelta,
  ) => {
    const resizeStep = 30
    const heightChangeSteps = Math.round(delta.height / resizeStep)
    const heightChangeMinutes = heightChangeSteps * 15
    const newEndTime = endTime + heightChangeMinutes / 60

    const finalEndTime = Math.max(newEndTime, 0)

    const hours = Math.floor(finalEndTime)
    const minutes = Math.round((finalEndTime - hours) * 60)
    const finalTime = `${hours}:${minutes.toString().padStart(2, '0')}`

    setEndTime(finalEndTime)
    setDragEnabled(true)

    segment.endTime = finalTime
  }

  return (
    <Rnd
      draggable = {dragEnabled}
      resizable = 'true'
      onResizeStart = {() => {
        toggleDrag()
        setDragEnabled(false)
      }}
      onResizeStop = {
        handleResize 
      }
      onDragEnd  = {changeEventPlace}
      onDragStop = {changeEventPlace}
      onDragOver = {(e:any) => {
        e.preventDefault()
      }}
      className="rnd"
      default = {{
        x: 0,
        y: calculatY(segment.startTime),
        width: '100%',
        height: calculateHeight(segment.endTime, segment.startTime),
      }} 
      bounds="parent"
      enableResizing = {{
        bottom: true

      }}
      resizeGrid = {[0, 30]} 
    >
      <h3>{segment.title}</h3>
      <p>{segment.startTime}-{segment.endTime}</p>

    </Rnd>
   )}

  export default DraggableSegment