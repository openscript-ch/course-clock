import { useForm } from '@mantine/form'
import { Button,Modal,Box, TextInput, Textarea, ActionIcon } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { IconClock, IconX } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import useCourseStore from '../store/courseStore'
import { Segment} from '../modals/segment'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, useRef } from 'react'
import "../App.css"


function DayEdit({ numberOfDay }: { numberOfDay: number }) {


  const {selectedCourse} = useCourseStore(
    (state) => ({
      selectedCourse: state.selectedCourse
    })
  )
    const {draggedSelectedCourse} = useCourseStore(
    (state) => ({
      draggedSelectedCourse: state.draggedSelectedCourse
    })
  )

  const addNewSegmentEdit = useCourseStore((state) => state.addNewSegmentEdit)
  const deleteSegment = useCourseStore((state) => state.deleteSegment)
  const updateSegment = useCourseStore((state) => state.updateSegment)
  const setDraggedSelectedCourse = useCourseStore((state) => state. setDraggedSelectedCourse)
  const updSelectedCourse = useCourseStore((state) => state.updSelectedCourse)



  const formSegment = useForm({
   initialValues: {
    title: '',
    startTime: '',
    endTime: '',
    target: '',
    procedure: '',
    material: '',
    id: ''},

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


  const newSelectedCourse = [...selectedCourse] 
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEvents(selectedCourse.find((arr: any) => arr.length > 0 && arr[0]?.id === numberOfDay)?.slice(1) || [])
      console.log('it worked')
    }, 0)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [selectedCourse, numberOfDay])



  const  [events, setEvents] = useState(newSelectedCourse.find((arr:any) => arr.length > 0 && arr[0]?.id ===
          numberOfDay).slice(1))

  const dragItem = useRef<any>(null)
  const dragOverItem = useRef<any>(null)


  const handleSort = () => {
    let eventsOrder=[...events]
    const draggedItemContent = eventsOrder.splice(dragItem.current, 1)[0]
    eventsOrder.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setEvents(eventsOrder)
    setDraggedSelectedCourse(eventsOrder, numberOfDay)
  }

const [opened, { open, close }] = useDisclosure(false);
const [segmentId, setSegmentId] = useState('')
const [createSave, setCreateSave] = useState('')


const handleAddSegment = (id:string, obj:Segment) => { 
  if(createSave === 'hizufügen'){
    formSegment.values.id = uuidv4()
    addNewSegmentEdit(numberOfDay, formSegment.values)
    close()    
    formSegment.reset();
    console.log(createSave)
  } else if (createSave === 'speichern'){
    formSegment.values.id = uuidv4()
    updateSegment(id, obj)
    close()
    console.log(createSave)
  } else {
    window.alert('something went wrong :( try again..')
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
  });
  setSegmentId(obj.id)
  setCreateSave('speichern')
  open()
}

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
           <tr className='tr' key={index}
           onDoubleClick={() => trye(obj)}
           draggable
            onDragStart={(e)=> dragItem.current=index}
            onDragEnter={(e)=> dragOverItem.current=index}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault}
           >  
            <td className='tdDay'>{obj.startTime}-{obj.endTime}</td>
            <td className='tdDay'>{obj.title}</td>
            <td className='tdDay'>{obj.procedure}</td>
            <td className='tdDay'>{obj.target}</td>
            <td className='tdDay'>{obj.material}</td>
            <div style={{maxWidth: '3rem'}}>
              <ActionIcon onClick={() => deleteSegment(obj.id)}>
                <IconX></IconX>
              </ActionIcon>
            </div>
           </tr>
          ))}
        <Button style={{marginTop: '1rem'}} color='orange' onClick={() => addSegmentLabel()}>
          Segment hinzufügen
        </Button>
     </tbody>
  </table>
  <Modal size="s" opened={opened} onClose={close} title="Segment erstellen" centered padding={'xl'} radius={'md'}>
    {<div>
      <Box maw={250} className={'box'}>
        <TextInput
          data-autofocus
          withAsterisk
          name='title'
          label='Tema'
          placeholder="Segment Name"
          {...formSegment.getInputProps('title')}
        />

        <TimeInput
          withAsterisk
          name='startTime'
          label='Startzeizpunkt'
          placeholder='Zeit'
          icon={<IconClock />}
          {...formSegment.getInputProps('startTime')}
        />

        <TimeInput
          withAsterisk
          name='endTime'
          label='Endzeitpunkt'
          placeholder='Zeit'
          icon={<IconClock />}
          {...formSegment.getInputProps('endTime')}
        />

        <Textarea
          name='target'
          label='Ziele'
          placeholder='Segment Ziele'
          {...formSegment.getInputProps('target')}
        />

        <Textarea
          withAsterisk
          name='procedure'
          label='Ablauf'
          placeholder='Segment Ablauf'
          {...formSegment.getInputProps('procedure')}
          />

        <Textarea
          name='material'
          label='Material'
          placeholder='Materialen'
          {...formSegment.getInputProps('material')}
        />
        <br/>

        <Button 
          color={'orange'} size={'sm'}
          onClick={formSegment.onSubmit(()=>handleAddSegment(formSegment.values.id, formSegment.values))}
          variant='filled'>
            <p>{createSave}</p>
        </Button> 
      </Box>
    </div>}
  </Modal>
</>)}
export default DayEdit
