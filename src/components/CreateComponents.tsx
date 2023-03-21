import { Tabs, Button,Group, Box, TextInput,Textarea, ThemeIcon, FileInputProps, Center} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';;
import { DateInput } from '@mantine/dates';
import '../App.css'
import { CourseInformation, updateCourseInformation } from '../data/CourseInformation';
import { Segment } from './Segment';
import { TimeInput } from '@mantine/dates';
import { IconPlus} from '@tabler/icons-react';

export var newListInfo:any[] = []
 

export function CreateComponents(props: CourseInformation){
const [segment, setSegment] = useState(newListInfo);


const handleAddSegment = () => {  
  if (formSegment.isValid()) {
    const newComponent = <Segment segmentData={formSegment.values} />;
    setSegment([...segment, newComponent]);
    newListInfo.push({...formSegment.values, id:newListInfo.length});
    formSegment.reset();
    console.log(newListInfo);
  }
};

const form = useForm({
  initialValues: {
    Titel: '',
    Autor: '',
    dateStart: '',
    dateEnd: '', 
  },

  validate: {
    Titel: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    Autor: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateStart: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateEnd: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

const formSegment = useForm({
  initialValues: {
    TitelSegment: '',
    startTime: '', 
    endTime: '',
    target: '',
    procedure: '',
    materials: '',
  },
  validate: {
    TitelSegment: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    startTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    endTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});


const onSubmit = (values: object) => {
  if(newListInfo.length > 0){
    newListInfo.push({...form.values, id:newListInfo.length})
    updateCourseInformation(values)
    console.log(newListInfo)
  }
};

const handleFormsSubmit = (event:any) => {
  event.preventDefault()
  form.onSubmit(onSubmit)();
  formSegment.onSubmit(onSubmit)()
}

const [activeTab, setActiveTab] = useState<string | null>('allgemein');

return(
  <>
    <div className='titel-Section'>
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> erstellen</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form onSubmit={handleFormsSubmit}>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >  
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Button type='submit' color={'green'} ml="auto">erstellen</Button>
        </Tabs.List>
      <br />
      <Tabs.Panel value="allgemein" pt="xs" >
        <Box maw={250}>
          <TextInput
            withAsterisk
            name='Titel'
            label="Titel"
            placeholder="Kurs Name"
            {...form.getInputProps('Titel')}
          />

          <TextInput
            withAsterisk
            name='Autor'
            label="Autor"
            placeholder="Autor Name"
            {...form.getInputProps('Autor')}
          />

          <DateInput
            withAsterisk
            name='dateStart'   
            label="Von-"
            placeholder="Datum"
            {...form.getInputProps('dateStart')}
          />

          <DateInput
            withAsterisk
            label="-Bis"
            placeholder="Datum"
            {...form.getInputProps('dateEnd')}
          />

          <br />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="segmente" pt="xs">
      <div style={{display: 'flex'}} className={'segment'}>
        <Box maw={250} className={'box'}>
          <TextInput
            withAsterisk
            name='TitelSegment'
            label="Titel"
            placeholder="Segment Name"
            {...formSegment.getInputProps('TitelSegment')}
          />

          <TimeInput
            withAsterisk
            label="Startzeizpunkt"
            placeholder="Zeit"
            {...formSegment.getInputProps('startTime')}
          />

          <TimeInput
            withAsterisk
            label="Endzeitpunkt"
            placeholder="Zeit"
            {...formSegment.getInputProps('endTime')}
          />

          <Textarea
            name='target'
            label="Ziele"
            placeholder="Segment Ziele"
            {...formSegment.getInputProps('target')}
          />

          <Textarea
            withAsterisk
            name='procedure'
            label="Ablauf"
            placeholder="Segment Ablauf"
            {...formSegment.getInputProps('procedure')}
          />

          <Textarea
            name='materials'
            label="Materialen/Unterlagen"
            placeholder="Materialen"
            {...formSegment.getInputProps('materials')}
          />
          <Group position="right" mt="md">
              <ThemeIcon color={'orange'} size={'xl'} radius={'xl'} onClick={handleAddSegment}>
                <IconPlus />
              </ThemeIcon>
          </Group>
        </Box>
            {segment.map((segment, index) => (
            <div key={index}>{segment}</div>
            ))}
        </div>
      <br />
      </Tabs.Panel>
      </Tabs>
    </form>
  </>
 );
}