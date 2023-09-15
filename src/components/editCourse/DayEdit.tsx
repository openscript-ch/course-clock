import { useForm } from '@mantine/form'
import { Button,Modal,Box, TextInput, Textarea, ActionIcon } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { IconBrandGoogle, IconClock, IconX } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import useCourseStore from '../../store/courseStore'
import { Segment} from '../../modals/segment'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, useRef } from 'react'


function DayEdit({ numberOfDay }: { numberOfDay: number }) {

//--------------------- store function/values ----------------------------

  const {selectedCourse} = useCourseStore((state:any) => ({selectedCourse: state.selectedCourse }))

  const {segmentIdMetaData} = useCourseStore((state:any) => ({segmentIdMetaData: state.segmentIdMetaData}))

  const addNewSegmentEdit = useCourseStore((state:any) => state.addNewSegmentEdit)
  const deleteSegment = useCourseStore((state:any) => state.deleteSegment)
  const saveSegmentId = useCourseStore((state:any) => state.saveSegmentId)
  const updateSegment = useCourseStore((state:any) => state.updateSegment)
  const setSelectedCourse = useCourseStore((state:any) => state.setSelectedCourse)
  const pushSelectedCourseToApp = useCourseStore((state:any) => state.pushSelectedCourseToApp) 


  //--------------------- set AvtiveInputField -----------------------------


  const titleRef = useRef<HTMLInputElement>(null)
  const targetRef = useRef< HTMLTextAreaElement>(null)
  const procedureRef = useRef<HTMLTextAreaElement>(null)
  const material = useRef<HTMLTextAreaElement>(null)

  const navInputFields = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const activeElement = document.activeElement as HTMLInputElement
      const inputFields = [titleRef,targetRef,procedureRef,material]
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

//----------------------- general -----------------------------------------------    

 
  const formSegment = useForm({
   initialValues: {
    title: '',
    startTime: '',
    endTime: '',
    target: '',
    procedure: '',
    material: '',
    id: ''
  },

    validate: {
      title: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      startTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      endTime: (value, values) => {
        if(value.length < 1) {
          return 'Bitte Pflichtfeld ausfüllen'
        } else if(value < values.startTime) {
          return 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.'
        } else {
          return null
        }
      },
      procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    } 
  })

const [events, setEvents] = useState<any[]>([])

useEffect(() => {
  const timeoutId = setTimeout(() => {
    const foundCourse = selectedCourse.find((arr: any) => arr.length > 0 && arr[0]?.id === numberOfDay)
    const eventsSlice = foundCourse ? foundCourse.slice(1) : []
    setEvents(eventsSlice)
  }, 0)

  return () => {
    clearTimeout(timeoutId)
  };
}, [selectedCourse, numberOfDay])

const [opened, { open, close }] = useDisclosure(false)
const [segmentId, setSegmentId] = useState('')
const [createSave, setCreateSave] = useState('')


const handleAddSegment = (id:string, obj:Segment) => { 
  if(createSave === 'hizufügen'){
    formSegment.values.id = uuidv4()
    addNewSegmentEdit(numberOfDay, formSegment.values)
    close()    
    formSegment.reset()
    console.log(createSave)
    pushSelectedCourseToApp()
  } else {
    formSegment.values.id = uuidv4()
    updateSegment(segmentIdMetaData, obj)
    close()
    console.log(id)
  }
}

const addSegmentLabel = () => {
  formSegment.reset()
  setCreateSave('hizufügen')
  open() 
}

const trye = (obj:Segment) => {
  formSegment.setValues({
    title:     obj.title,
    startTime: obj.startTime,
    endTime:   obj.endTime,
    target:    obj.target,
    procedure: obj.procedure,
    material:  obj.material,
  })
  saveSegmentId(obj.id)
  setSegmentId(obj.id)
  setCreateSave('speichern')
  open()
}

//----------------------- events reorder -----------------------------------------------    
return (
<>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
     <thead>
      <tr> 
       <th className='thTHeadTime'>Zeit</th>
       <th className='thTHead'>Thema</th>
       <th className='thTHead'>Ablauf</th>
       <th className='thTHead'>Ziel</th>
       <th className='thTHead'>Material</th>
      </tr>
     </thead>
     <tbody>
       {events.map((obj:Segment, index:number) => (
           <tr 
           className='tr' 
           key={index+1}          
           onDoubleClick={() => trye(obj)}
           onDragOver={(e) => e.preventDefault}
           >
            <td className='tdDay'> {obj.startTime}-{obj.endTime} </td>
            <td className='tdDay'> {obj.title}</td> 
            <td className='tdDay'> {obj.procedure}</td>
            <td className='tdDay'> {obj.target}</td>
            <td className='tdDay'> {obj.material} </td>
            <td style={{maxWidth: '3rem'}} key={obj.id}>
              <ActionIcon onClick={() => deleteSegment(obj.id)}> 
                <IconX></IconX>
              </ActionIcon>
            </td>
           </tr>
          ))}
     </tbody>
  </table> 
  <Button style={{marginTop: '1rem'}} color='orange' onClick={() => addSegmentLabel()}>
    Segment hinzufügen
  </Button>

  <Modal size="s" opened={opened} onClose={close} title="Segment erstellen" centered padding={'xl'} radius={'md'}>
    {<div>
      <form onSubmit={formSegment.onSubmit(()=>handleAddSegment(formSegment.values.id, formSegment.values))}>
      <Box maw={250} className={'box'}>
        <TextInput
          data-autofocus
          withAsterisk
          name='title' 
          label='Thema' 
          placeholder='event Name'
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
          ref={material}
          {...formSegment.getInputProps('material')}
        />

        <br/> 
        
        <Button 
        type='submit'
        color={'orange'} size={'sm'}
        variant='filled'
        >
            <p>{createSave}</p>
        </Button>
      </Box>
      </form>
    </div>}
  </Modal>
</>)}

export default DayEdit