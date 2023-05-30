import '../App.css'
import _ from "lodash"
import { Segment } from '../modals/segment';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Box, Textarea } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock} from '@tabler/icons-react';
import useCourseStore from '../store/courseStore';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from '@mantine/form';
import { SheduleSegment } from './SheduleSegment';
import {Rnd} from "react-rnd";
import { useEffect } from 'react';

function Week({ numberOfDays }: { numberOfDays: number }) {

let dayStart = 0;
let daysCount = []
while(dayStart < numberOfDays){
  daysCount.push(dayStart++);
}

const [opened, { open, close }] = useDisclosure(false);
const addNewSegment = useCourseStore((state) => state.addNewSegment)
const numberOfDay = useCourseStore((state) => state.numberOfDay);

const {day} = useCourseStore(
  (state) => ({
    day: state.day
  })
)

const {dayInformation} = useCourseStore(
  (state) => ({
    dayInformation: state.dayInformation
  })
)

const style = {
  with: '100%',
  backgroundColor: 'lightblue',
}

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

const dayNumber = (dayNumber:number) => {
  open(),
  numberOfDay(dayNumber)
}

const handleAddSegment = () => { 
  formSegment.values.id = uuidv4()
  addNewSegment(day, formSegment.values)
  close()    
  formSegment.reset();
}

useEffect(() => {
}, [dayInformation, daysCount])


const calculateHeight = (endTime:string, startTime:string) => {
  const startTimeString = startTime
  const endTimeString = endTime
  // const [hoursStart, minutesStart] = startTimeString.split(':');
  // const [hoursEnd, minutesEnd] = endTimeString.split(':');
  // const startTimeNumber = parseInt(hoursStart, 10) + parseInt(minutesStart, 10) / 60; 
  // const endTimeNumber = parseInt(hoursEnd, 10) + parseInt(minutesEnd, 10) / 60; 

  const modifyEnd =  endTimeString.replace(':', '.')
  const modifyStart =  startTimeString.replace(':', '.')
  const parceEnd = parseFloat(modifyEnd)
  const parceStart = parseFloat(modifyStart)
  const difference =  parceEnd - parceStart
  return(difference)
}


return(
<>
  <div style={{marginTop: '2rem'}}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {daysCount.map((number:number) => (
          <th         
            style={{
              border: '1px solid black',
              padding: '10px',
            }}
          >
            Tag {number + 1}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        {daysCount.map((number:number, index:number) => (
        <td className='td' key={index+1}  onDoubleClick={() => dayNumber(number + 1)}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
              {Array.from({ length: 60 }, (_, subIndex) => {
                const hour = Math.floor(subIndex / 4) + 5;
                const minute = subIndex % 4 * 15;
                if (minute === 0) {
                  const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
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
                  )
                }
              })}
            </div>
            <div>
              <p>{index}</p>
            </div>
            {dayInformation.filter((arr:Array<Segment>) => arr.length > 0 && arr[0]?.id ===
            index + 1).map((arr: []) => arr.slice(1).map((obj: Segment) => (
              <Rnd
              key={obj.id}
              style={style}
              default={{
                x: 0,
                y: 267.96,
                width: '100%',
                // calculateHeight(obj.endTime, obj.startTime)
                height: 100,
              }}
              bounds="parent"
              enableResizing={false}
              >
                <SheduleSegment title={obj.title}/>
                <p>{obj.startTime}-{obj.endTime}</p>
              </Rnd>
            )))}
          </div>
        </td>
        ))}
      </tr>
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
              variant='filled'
              >
                <p>hinzufügen</p>
              </Button>
            </Box>
          </div>
        }
    </Modal>
    
</>
)}

export default Week