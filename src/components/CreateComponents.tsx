import { Tabs, Button,Group, Box, TextInput,Textarea, ThemeIcon} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { DateInput,TimeInput } from '@mantine/dates';
import '../App.css'
import { Segment } from './Segment';
import { IconCalendar, IconClock, IconPlus} from '@tabler/icons-react';
import useCourseStore from "../store/courseStore"
import { courseValues } from '../store/courseStore';

export const idAllgemein:number =  0

export let courseArray:Array<string> = [] 

const CreateComponents = () => {

const [activeTab, setActiveTab] = useState<string | null>('general');

const addCommonMetaData = useCourseStore((state) => state.
addCommonMetaData);

const addSegmentMetaData= useCourseStore((state) => state.
addSegmentMetaData);

const pushsCourseMetaDataToApp = useCourseStore((state) => state.pushsCourseMetaDataToApp);

const resetCourseMetaData = useCourseStore((state) => state.resetCourseMetaData) 

const {courseMetaData} = useCourseStore(
  (state) => ({
    courseMetaData: state.courseMetaData
  })
)

const filteredCourseMetaData =  courseMetaData.filter((obj) => !obj.id?.toString().startsWith('0'))
const [segments, setSegments] = useState<courseValues[]>(filteredCourseMetaData);
 
const form = useForm({
  initialValues: { 
    title: '',
    author: '',
    dateStart: '',
    dateEnd: '',
    id: 0,
  },

  validate: {
    title: (value) => {
      if(value.length < 1) {
        return 'Bitte Pflichtfeld ausfüllen'
      } else if (value.length > 13) {
        return 'Titel zu lang! Wählen sie einen kürzeren Titel'
      } else {
        return null
      }
  },
    author: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateStart: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateEnd: (value, values) => {
      if(value.length < 1 ) {
        return 'Bitte Pflichtfeld ausfüllen'
      } else if(value < values.dateStart) {
        return 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.'
      } else {
        return null
      }
    },
  }
});

const formSegment = useForm({
  initialValues: {
    titleSegment: '',
    startTime: '',
    endTime: '',
    target: '',
    procedure: '',
    materials: '',
    id: 0
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
    procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

const handleAddSegment = () => { 
  formSegment.reset();
  formSegment.values.id = Math.floor(Math.random()*10000)
  setSegments([...segments, formSegment.values]);
  addSegmentMetaData(formSegment.values)
};


const handleFormsSubmit = (event: any) => {
  form.values.id = idAllgemein;
  addCommonMetaData(form.values);
  pushsCourseMetaDataToApp();
  resetCourseMetaData();
};  

return(
  <>
  <div style={{marginBottom: '1rem'}}>
    <div className='title-Section'>
      <h1> <span className='teko'>KURS</span> erstellen</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information hinzufügen</p>
    </div>
    <hr />
    <form>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab}>  
        <Tabs.List>
         <Tabs.Tab value="general">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segment">Segmente</Tabs.Tab>
          <Button onClick={form.onSubmit(handleFormsSubmit)} color={'green'} ml="auto">erstellen</Button>
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

          <Group position="right" mt="md">
              <ThemeIcon color={'orange'} size={'xl'} radius={'xl'} onClick={formSegment.onSubmit(handleAddSegment)}>
                <IconPlus />
              </ThemeIcon>
          </Group>
        </Box>
          {segments.map((segmentData, index) => (
            <Segment
              key={index}
              titleSegment={segmentData.titleSegment}
              startTime={segmentData.startTime}
              endTime={segmentData.endTime}
              target={segmentData.target}
              procedure={segmentData.procedure}
              materials={segmentData.materials}/>
          ))}
        </div>
      </Tabs.Panel>
      </Tabs>
    </form>
    </div>
  </>
 );
}
export default CreateComponents