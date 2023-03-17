import { Tabs, Button,Group, Box, TextInput,Textarea, ThemeIcon} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';;
import { DateInput } from '@mantine/dates';
import '../App.css'
import { AddMaterial } from './AddMaterial';
import { CourseInformation, updateCourseInformation } from '../data/CourseInformation';
import { TimeInput } from '@mantine/dates';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { newListInfo } from './CreateComponents';
import { Segment } from './Segment';



export function EditComponents(){
const [activeTab, setActiveTab] = useState<string | null>('allgemein');

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

return(
  <>
    <div className='titel-Section'>
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> erstellen</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >  
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Tabs.Tab value="unterlagen">Materialen/Unterlagen</Tabs.Tab>
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
            icon={<IconEdit/>}
          />

          <TimeInput
            withAsterisk
            label="Startzeizpunkt"
            placeholder="Zeit"
            {...formSegment.getInputProps('startTime')}
            icon={<IconEdit/>}
          />

          <TimeInput
            withAsterisk
            label="Endzeitpunkt"
            placeholder="Zeit"
            {...formSegment.getInputProps('endTime')}
            icon={<IconEdit/>}
          />

          <Textarea
            name='target'
            label="Ziele"
            placeholder="Segment Ziele"
            {...formSegment.getInputProps('target')}
            icon={<IconEdit/>}
          />

          <Textarea
            withAsterisk
            name='procedure'
            label="Ablauf"
            placeholder="Segment Ablauf"
            {...formSegment.getInputProps('procedure')}
            icon={<IconEdit/>}
          />

          <Textarea
            name='materials'
            label="Materialen/Unterlagen"
            placeholder="Materialen"
            {...formSegment.getInputProps('materials')}
            icon={<IconEdit/>}
          />
        </Box>
        <div style={{display: 'flex', gap: '3rem', flexWrap: 'wrap'}}>
          {newListInfo.slice(0,-1).map((info, index) => (
           <Segment key={index} segmentData={info}/>
          ))}
        </div>
       </div>
      <br />
      </Tabs.Panel>

      <Tabs.Panel value="unterlagen" pt="xs">
        <AddMaterial></AddMaterial>
      </Tabs.Panel>
      </Tabs>
    </form>
  </>
 );
}