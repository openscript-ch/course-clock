import { Tabs, Button,Group, Box, TextInput,Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';;
import { TimeInput, DateInput } from '@mantine/dates';
import '../App.css'
import { useState } from 'react';
import { AddMaterial } from './AddMaterial';
import { updateCourseInformation } from '../data/CourseInformation';
import { listInfo } from './CreateComponents';
import { IconEdit } from '@tabler/icons-react';


export function EditComponents() {

  const form = useForm({

    initialValues: listInfo,

    validate: {
      Titel: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      Autor: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      dateStart: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      dateEnd: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    
      TitelSegment: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      startTime: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      endTime: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      procedure: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    }
  });

const onSubmit = (values: any) => {
  const newListInfo = { ...listInfo };

  Object.keys(values).forEach((key) => {
    if (newListInfo[key] !== values[key]) {
      newListInfo[key] = values[key];
    }
  });

  updateCourseInformation(newListInfo); 
  console.log(newListInfo )
};

const [activeTab, setActiveTab] = useState<string | null>('allgemein');

 return(
<>
    <div className='titel-Section'>
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> editieren</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Tabs.Tab value="unterlagen">Materialen/Unterlagen</Tabs.Tab>
          <Button type='submit' color={'green'} ml="auto">speichern</Button>
        </Tabs.List>
      <br />
      <Tabs.Panel value="allgemein" pt="xs" >
      </Tabs.Panel>

      <Tabs.Panel value="segmente" pt="xs">
      </Tabs.Panel>

      <Tabs.Panel value="unterlagen" pt="xs">
      </Tabs.Panel>

      </Tabs>
    </form>
  </>
 );
}