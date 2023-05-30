import '../App.css'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Box, TextInput,Textarea } from '@mantine/core';
import { IconEdit, IconClock} from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { TimeInput} from '@mantine/dates';
import useCourseStore from "../store/courseStore"
import { Segment, segmentBeforeStored } from '../modals/segment';
import { v4 as uuidv4 } from 'uuid';


export function SegmentEdit(props:segmentBeforeStored){

const [opened, { open, close }] = useDisclosure(false);

const updateSelectedCourse = useCourseStore((state) => state.
updateSelectedCourse);

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)

const {segmentIdMetaData} = useCourseStore(
  (state) => ({
    segmentIdMetaData: state.segmentIdMetaData
  })
)

const formSegment = useForm({
  initialValues: {
    title: '',
    startTime: ''  ,
    endTime: ''   ,
    target: ''   ,
    procedure: '',
    material:  '',
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
    target: (value) =>  (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

 
const editSegment = () => {
  formSegment.values.id = uuidv4()
  updateSelectedCourse(formSegment.values)
  close()
  formSegment.reset()
 }

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(100, 100, 100, 0.6)'
  }
};

const handleClick = () => {
  open()
  const flattenedArray = selectedCourse.reduce((acc:Array<object>, val:Array<object>) => acc.concat(val), []);
  const foundSegment:any = flattenedArray.find((obj:Segment) => obj.id === 'd'); ///create a state for the id from the segment thaT has been selected (important)
  console.log(segmentIdMetaData)
  if (foundSegment) {
    formSegment.setValues({
      title: foundSegment.titleSegment,
      startTime: foundSegment.startTime,
      endTime: foundSegment.endTime,
      target: foundSegment.target,
      procedure: foundSegment.procedure, 
      material: foundSegment.materials,
    });
  }
};


  return(
  <>
    <Modal styles={modalStyles} size="s" opened={opened} onClose={close} title="Segment bearbeiten" centered padding={'xl'} radius={'md'}>
        {
          <div>
            <Box maw={250} className={'box'}>
              <TextInput
                data-autofocus
                icon={<IconEdit/>}
                withAsterisk
                name='title'
                label='Titel'
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
                icon={<IconEdit/>}
                name='target'
                label='Ziele'
                placeholder='Segment Ziele'
                {...formSegment.getInputProps('target')}
              />

              <Textarea
                withAsterisk
                icon={<IconEdit/>}
                name='procedure'
                label='Ablauf'
                placeholder='Segment Ablauf'
                {...formSegment.getInputProps('procedure')}
              />

              <Textarea
                icon={<IconEdit/>}
                name='material'
                label='Material'
                placeholder='Materialen'
                {...formSegment.getInputProps('material')}
              />
            </Box>
            <Button color={'orange'} style={{marginTop: '1rem'}} onClick={() => editSegment()}>Segment speichern</Button>
          </div>
        }
    </Modal>
    <div className='newSegment' onClick={handleClick}>
      <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Segment created</h3>

      <dl>
        <dt><b className="keyword">Titel:</b></dt> 
        <dd>{props.title}</dd>
        <dt><b className="keyword">Anfang:</b></dt>
        <dd>{props.startTime}</dd>
        <dt><b className="keyword">Ende:</b></dt>
        <dd>{props.endTime}</dd>
        <dt><b className="keyword">Ziel:</b></dt>
        <dd>{props.target}</dd>
        <dt><b className="keyword">Ablauf:</b></dt>
        <dd>{props.procedure}</dd>
        <dt><b className="keyword">Materialen:</b></dt>
        <dd>{props.material}</dd>
      </dl>
    </div>
  </>
 )
}