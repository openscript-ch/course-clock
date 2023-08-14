import DraggableSegment from '../editCourse/DraggableSegment'
import { Segment } from '../../modals/segment'
import useCourseStore from '../../store/courseStore'
import { segmentDayId } from '../../modals/segment'
import { Modal, Button, TextInput, Box, Textarea } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { IconClock } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from '@mantine/form'
import { useRef } from 'react'

const TableColumn = ({dayNumber}: { dayNumber:number } ) => {

//-------------------------- store function/values ----------------------------------------------

 const { selectedCourse } = useCourseStore((state:any) => ({ selectedCourse: state.selectedCourse }))

 const { day } = useCourseStore((state:any) => ({ day: state.day }))

 const addNewSegmentEdit = useCourseStore((state:any) => state.addNewSegmentEdit)
 const numberOfDay = useCourseStore((state:any) => state.numberOfDay)
 const eventDragged = useCourseStore((state:any) => state.eventDragged)
  
 //--------------------- set AvtiveInputField ----------------------------------------------------

  const [opened, { open, close }] = useDisclosure(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const targetRef = useRef< HTMLTextAreaElement>(null)
  const procedureRef = useRef<HTMLTextAreaElement>(null)
  const materialRef = useRef<HTMLTextAreaElement>(null)

  const navInputFields = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const activeElement = document.activeElement as HTMLInputElement
      const inputFields = [titleRef,targetRef,procedureRef,materialRef]
      const currentIndex = inputFields.findIndex((ref) => ref.current === activeElement)

      let nextIndex = -1
      if (currentIndex !== -1) {
        if (e.key === 'ArrowDown' ) {
          nextIndex = (currentIndex + 1) % inputFields.length
        } else if (e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + inputFields.length) % inputFields.length
        }
      }
      if (nextIndex !== -1) {
        inputFields[nextIndex].current?.focus();
      }
    }}

//----------------------- form interaction --------------------------------------------------

  const formSegment = useForm({
    
    initialValues: {
      title: '',
      startTime: '',
      endTime: '',
      target: '',
      procedure: '',
      material: '',
      kommentar: '',
      id: '',
    },

    validate: {
      title: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      startTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      endTime: (value, values) => {
        if (value.length < 1) {
          return 'Bitte Pflichtfeld ausfüllen'
        } else if (value < values.startTime) {
          return 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.'
        } else {
          return null
        }
      },
      procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    }
  })

  const handleAddSegment = () => {
    formSegment.values.id = uuidv4()
    addNewSegmentEdit(day, formSegment.values)
    formSegment.reset()
    close()
  }
  
  const safeDraggesValue = () => {
    eventDragged(dayNumber+1)
    console.log(dayNumber)
  }

  const dayNum = () => { open(), numberOfDay(dayNumber+1), console.log(dayNumber+1) }


  return (
   <> 
    <td className='td' onDoubleClick={dayNum} onDragExit={safeDraggesValue}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            {Array.from({ length: 60 }, (_, subIndex) => {
              const hour = Math.floor(subIndex / 4) + 5
              const minute = subIndex % 4 * 15
               if (minute === 0) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                 return (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: 'calc(100% / 60)', border: '1px solid #E6E6E6', flexGrow: '1' }}>
                    <div style={{ marginLeft: '5px', fontSize: '8px' }}> 
                     {time}
                    </div>
                    </div>
                  )

                } else {
              return (
                <div style={{ height: 'calc(100% / 60)', border: '1px dotted #E6E6E6', flexGrow: '1' }}> 
                </div>
              )}
             })}
            </div>
            {selectedCourse.slice(0, -1).filter((arr: Array<segmentDayId>) => arr.length > 0 && arr[0]?.id === dayNumber + 1).map((arr: []) => arr.slice(1).sort((obj1: Segment, obj2: Segment) => { const startTime1 = parseFloat(obj1.startTime.replace(':', '.'))
                                const startTime2 = parseFloat(obj2.startTime.replace(':', '.'))
                                return startTime1 - startTime2
                               }).map((obj: Segment) => <DraggableSegment segment={obj} />)
            )}
           </div>
      </div>
    </td>
    <Modal size="s" opened={opened} onClose={close} title="Segment erstellen" centered padding={'xl'} radius={'md'}>
     {<div>
       <Box maw={250} className={'box'}>
        <form onSubmit={handleAddSegment}>
         <TextInput
          data-autofocus
          withAsterisk
          name='title'
          label='Thema'
          placeholder="Segment Name"
          onKeyDown={navInputFields}
          ref={titleRef}
          {...formSegment.getInputProps('title')}
        />
      <div style={{display: 'flex', gap: '1rem'}}>
        <TimeInput
          withAsterisk
          style={{width:'50%'}}
          name='startTime'
          label='Startzeitpunkt'
          placeholder='Zeit'
          icon={<IconClock />}
          {...formSegment.getInputProps('startTime')}
        />
     
        <TimeInput
          withAsterisk
          style={{width:'50%'}}
          name='endTime'
          label='Endzeitpunkt'
          placeholder='Zeit'
          icon={<IconClock />}
          {...formSegment.getInputProps('endTime')}
        />
        </div>
        <Textarea
          name='target'
          label='Ziele'
          placeholder='Segment Ziele'
            onKeyDown={navInputFields}
            ref={targetRef}
          {...formSegment.getInputProps('target')}
        />

        <Textarea
          withAsterisk
          name='procedure'
          label='Ablauf'
          placeholder='Segment Ablauf'
          onKeyDown={navInputFields}
          ref={procedureRef}
          {...formSegment.getInputProps('procedure')}
        />

        <Textarea
          name='material'
          label='Material'
          placeholder='Materialen'
            onKeyDown={navInputFields}
            ref={materialRef}
          {...formSegment.getInputProps('material')}
        />
        

        <br />

        <Button
          color={'orange'} size={'sm'}
          onClick={formSegment.onSubmit(handleAddSegment)}
          variant='filled'
        >
          <p>hinzufügen</p>
        </Button>
        </form>
      </Box>
    </div>}
   </Modal>
  </>
)};

export default TableColumn;