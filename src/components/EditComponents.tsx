import { Tabs, Button, Box, TextInput,Textarea} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { DateInput,TimeInput } from '@mantine/dates';
import '../App.css'
import { Segment } from './Segment';
import { IconCalendar, IconClock, IconCircleX} from '@tabler/icons-react';
import useCourseStore from "../store/courseStore"
import { courseValues } from '../store/courseStore';
import { useNavigate } from 'react-router-dom';

export function EditComponents(){
  
const [activeTab, setActiveTab] = useState<string | null>('general');

const saveDeletedSegmentId = useCourseStore((state) => state.saveDeletedSegmentId)
const saveSegmentId = useCourseStore((state) => state.saveSegmentId)
const updatedSegmentMetaData = useCourseStore((state) => state.
updatedSegmentMetaData);
const updatedCommonMetaData = useCourseStore((state) => state.
updatedCommonMetaData);

const deleteSegmentMetaData = useCourseStore((state) => state.deleteSegmentMetaData)

const updateAppMetaData = useCourseStore((state) => state.updateAppMetaData)

const navigate = useNavigate();

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)

const {deletedSegmentIdMetaData} = useCourseStore(
  (state) => ({
    deletedSegmentIdMetaData: state.deletedSegmentIdMetaData
  })
)

const sd= selectedCourse.find(obj => obj.id === 0)
  
  const form = useForm({
  initialValues: {
    title: sd?.title,
    author: sd?.author,
    dateStart: sd?.dateStart? new Date(sd?.dateStart): '',
    dateEnd: sd?.dateEnd? new Date(sd?.dateEnd): ''
  },

  validate: {
    title: (value='') => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    author: (value='') => (value.length   < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateStart: (value, values) => {
      if(typeof value === 'undefined') {
        return 'Bitte Pflichtfeld ausfüllen'
      }else if(value < values.dateEnd) {
        return 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.'}
       else {
        return null
      }
    },
    dateEnd: (value) => (typeof value === 'undefined' ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

const formSegment = useForm({
  initialValues: {
    titleSegment: '',
    startTime: ''  ,
    endTime: ''   ,
    target: ''   ,
    procedure: '',
    materials:  '',
    id: 1
  },
  validate: {
    titleSegment: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
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

const handleClick = (id?: number) => {
  const foundSegment = selectedCourse.find(obj => {
    return obj.id === id;
  });
  if(id){
  saveSegmentId(id)
  }
  if (foundSegment) {
    formSegment.setValues({
      titleSegment: foundSegment.titleSegment,
      startTime: foundSegment.startTime,
      endTime: foundSegment.endTime,
      target: foundSegment.target,
      procedure: foundSegment.procedure, 
      materials: foundSegment.materials,
    });
  }
};
 
const editSegment = () => {
  const { id, ...values } = formSegment.values;
  updatedSegmentMetaData(values)
  formSegment.reset()
 }
 
const deleteSeg = (id: number) => {
  deleteSegmentMetaData(id)
  saveDeletedSegmentId(id)
  formSegment.reset()
}

const safeCourse = () => {
  updatedCommonMetaData(form.values)
  updateAppMetaData()  
  navigate('/my-courses') 
}

return (
<>
<div style={{marginBottom: '1rem'}}>
  <div className='title-Section'>
    <h1> <span className='teko'>KURS</span>  editieren</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information hinzufügen</p>
  </div>
  <hr />
  <form>
    <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab}>  
      <Tabs.List>
        <Tabs.Tab value="general">Allgemein</Tabs.Tab>
        <Tabs.Tab value="segment">Segmente</Tabs.Tab>
        <Button color={'green'} ml="auto" onClick={() => safeCourse()}>speichern</Button>
      </Tabs.List> 
      <br />
      <Tabs.Panel value="general" pt="xs" >
        <Box maw={250}>
          <TextInput
            withAsterisk
            name='title'
            label="Titel"
            placeholder="Kurs Name"
            {...form.getInputProps('title')}
          />

          <TextInput
            withAsterisk
            name='author'
            label="Autor"
            placeholder="Autor Name"
            {...form.getInputProps('author')}
          />

          <DateInput
            withAsterisk
            name='dateStart'   
            label="Von-"
            placeholder="Datum"
            icon={<IconCalendar />}
            {...form.getInputProps('dateStart')}
          />

          <DateInput
            withAsterisk
            name='dateEnd'
            label="-Bis"
            placeholder="Datum"
            icon={<IconCalendar />}
            {...form.getInputProps('dateEnd')}
          />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value='segment' pt='xs'>
        <div style={{display: 'flex'}} className={'segment'}>
          <div>
            <Box maw={250} className={'box'}>
              <TextInput
                withAsterisk
                name='titleSegment'
                label='Titel'
                placeholder="Segment Name"
                {...formSegment.getInputProps('titleSegment')}
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
                name='materials'
                label='Materials'
                placeholder='Materialen'
                {...formSegment.getInputProps('materials')}
              />
            </Box>
            <Button color={'orange'} style={{marginTop: '1rem'}} onClick={() => editSegment()}>Segment speichern</Button>
          </div>
          {selectedCourse.filter(obj => obj.id !== 0).map((segmentData:courseValues, index) => (
            <div style={{display: 'flex'}}> 
              <div onClick={()=>handleClick(segmentData.id)}>
                <Segment
                  key={index}
                  titleSegment={segmentData.titleSegment}
                  startTime={segmentData.startTime}
                  endTime={segmentData.endTime}
                  target={segmentData.target}
                  procedure={segmentData.procedure}
                  materials={segmentData.materials}
                />
              </div>
              <div>
                <IconCircleX size={'20px'} onClick={() => deleteSeg(segmentData.id)}/>
              </div>
            </div> 
           ))}
      </div>
    </Tabs.Panel>
    </Tabs>
  </form>
  </div>
</>
)}