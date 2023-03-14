import { Tabs, Button,Group, Box, TextInput,Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';;
import { TimeInput, DateInput } from '@mantine/dates';
import '../App.css'
import { AddMaterial } from './AddMaterial';
import { updateCourseInformation } from '../data/CourseInformation';

export var newListInfo = { }

export function CreateComponents(){

  const form = useForm({
    initialValues: {
      Titel: '',
      Autor: '',
      dateStart: '',
      dateEnd: '', 
      TitelSegment: '',
      startTime: '', 
      endTime: '',
      target: '',
      procedure: '',
      materials: '',
    },

    validate: {
      Titel: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      Autor: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      dateStart: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      dateEnd: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    
      TitelSegment: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      startTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      endTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
      procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    }
  });


  const onSubmit = (values: any) => {
    newListInfo =  values
    updateCourseInformation(values)
    console.log(newListInfo)
  };

  const formReset = () => {
    form.reset();
  };

 return(
  <>
    <div className='titel-Section'>
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> erstellen</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' >
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Tabs.Tab value="unterlagen">Materialen/Unterlagen</Tabs.Tab>
          <Button type='submit' color={'green'} ml="auto">erstellen</Button>
        </Tabs.List>
      <br />
      <Tabs.Panel value="allgemein" pt="xs" >
        <Box maw={300}>
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
          <Group position="right" mt="md">
            <Button color={'red'} onClick={formReset}>zurücksetzen</Button>
          </Group>
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="segmente" pt="xs">
        <Box maw={300}>

          <TextInput
            withAsterisk
            name='TitelSegment'
            label="Titel"
            placeholder="Segment Name"
            {...form.getInputProps('TitelSegment')}
          />

          <TimeInput
            withAsterisk
            label="Startzeizpunkt"
            placeholder="Zeit"
            {...form.getInputProps('startTime')}
          />

          <TimeInput
            withAsterisk
            label="Endzeitpunkt"
            placeholder="Zeit"
            {...form.getInputProps('endTime')}
          />

          <Textarea
            name='target'
            label="Ziele"
            placeholder="Segment Ziele"
            {...form.getInputProps('target')}
          />

          <Textarea
            withAsterisk
            name='procedure'
            label="Ablauf"
            placeholder="Segment Ablauf"
            {...form.getInputProps('procedure')}
          />

          <Textarea
            name='materials'
            label="Materialen/Unterlagen"
            placeholder="Materialen"
            {...form.getInputProps('materials')}
          />
          <br />

          <Group position="right" mt="md">
            <Button color={'red'} onClick={formReset}>zurücksetzen</Button>
          </Group>
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="unterlagen" pt="xs">
        <AddMaterial></AddMaterial>
        <br />

        <Group position="right" mt="md">
            <Button color={'red'} onClick={formReset}>zurücksetzen</Button>
        </Group>
      </Tabs.Panel>
      </Tabs>
    </form>
  </>
 );
}