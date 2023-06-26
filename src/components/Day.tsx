import { useForm } from '@mantine/form'
import { Button,Modal,Box, TextInput, Textarea } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { IconClock } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import useCourseStore from '../store/courseStore'
import { Segment } from '../modals/segment'
import { v4 as uuidv4 } from 'uuid'

function Day({ day }: { day: number }) {

const {dayInformation} = useCourseStore(
  (state) => ({
    dayInformation: state.dayInformation
  })
)

const formSegment = useForm({
  initialValues: {
    title: '',
    startTime: '',
    endTime: '',
    target: '',
    procedure: '',
    material: '',
    id: '',      
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

const [opened, { open, close }] = useDisclosure(false)
const addNewSegment = useCourseStore((state) => state.addNewSegment)

const handleAddSegment = () => { 
  formSegment.values.id = uuidv4()
  addNewSegment(day, formSegment.values)
  close()    
  formSegment.reset()
}

  return (
  <>
   <div style={{margin: '0rem'}}>
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
       {dayInformation.filter((arr:any) => arr.length > 0 && arr[0]?.id ===
          day).map((arr: []) => arr.slice(1).map((obj:Segment, index:number) => (
           <tr className='tr' draggable={true} key={index}>  
            <td className='tdDay'>{obj.startTime}-{obj.endTime}</td>
            <td className='tdDay'>{obj.title}</td>
            <td className='tdDay'>{obj.procedure}</td>
            <td className='tdDay'>{obj.target}</td>
            <td className='tdDay'>{obj.material}</td>
           </tr>
          )))}
          <Button style={{marginTop: '1rem'}} color='orange' onClick={() => open()}>
            Segment hinzufügen
          </Button>
     </tbody>
    </table>
  </div>
  <Modal size="s" opened={opened} onClose={close} title="Segment erstellen" centered padding={'xl'} radius={'md'}>
    {
      <div>
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
          onClick={formSegment.onSubmit(handleAddSegment)}
          variant='filled'>
            <p>hinzufügen</p>
          </Button>

        </Box>
      </div>
    }
  </Modal>
</>
)}
export default Day
