import { Tabs, Button,Group, Box, TextInput,Textarea, ThemeIcon, MantineProvider} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import '../App.css'
import { Segment } from './Segment';
import { TimeInput } from '@mantine/dates';
import { IconPlus} from '@tabler/icons-react';
import useCourseStore from "../store/courseStore"
import { courseValues } from '../store/courseStore';

export const idAllgemein:number = Math.floor(Math.random()*100000)

const CreateComponents = () => {

const [activeTab, setActiveTab] = useState<string | null>('allgemein');
const addAllgemeinInformation = useCourseStore((state) => state.
addAllgemeinInformation);
 const addSegmentCourseInformation= useCourseStore((state) => state.
addSegmentCourseInformation);

const {newListInformation} = useCourseStore(
  (state) => ({
    newListInformation: state.newListInformation
  })
)
const [segments, setSegments] = useState<courseValues[]>(newListInformation);
 
const form = useForm({
  initialValues: { 
    Titel: '',
    Autor: '',
    dateStart: '',
    dateEnd: '',
    id: 0,
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
    id: 0
  },
  validate: {
    TitelSegment: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    startTime: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    endTime: (value)=> (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    procedure: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

const handleAddSegment = () => { 
  if (formSegment.isValid()){
    if(formSegment.values.startTime > formSegment.values.endTime){
      formSegment.setFieldError("endTime", 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.')
    }
    else{
    formSegment.values.id = Math.floor(Math.random()*10000)
    setSegments([...segments, formSegment.values]);
    addSegmentCourseInformation(formSegment.values)
    formSegment.reset();
    }
  }else{
    formSegment.setFieldError('TitelSegment', 'Bitte alle Pflichtfelder ausfühlen');
    formSegment.setFieldError('startTime', 'Bitte alle Pflichtfelder ausfühlen');
    formSegment.setFieldError('entTime', 'Bitte alle Pflichtfelder ausfühlen');
    formSegment.setFieldError('procedure', 'Bitte alle Pflichtfelder ausfühlen');
  }
};

let buttonState = false

const handleFormsSubmit = (event: any) => {
  event.preventDefault();
  if (form.isValid()) {
    if (newListInformation.length > 0 && form.values.dateStart <= form.values.dateEnd) {
      buttonState = true
      form.values.id = idAllgemein;
      addAllgemeinInformation(form.values);
    } else if (form.values.dateStart > form.values.dateEnd) {
      form.setFieldError('dateEnd', 'Ups! Das Enddatum muss nach dem Startdatum liegen.');
    } else if (newListInformation.length <= 0) {
      window.alert('Bitte zumindest 1 Segment erstellen');
    }
  }else{
    form.setFieldError('Titel', 'Bitte alle Pflichtfelder ausfühlen');
    form.setFieldError('Autor', 'Bitte alle Pflichtfelder ausfühlen');
    form.setFieldError('dateStart', 'Bitte alle Pflichtfelder ausfühlen');
    form.setFieldError('dateEnd', 'Bitte alle Pflichtfelder ausfühlen');
  }
};

return(
  <>
    <div className='titel-Section'>
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> erstellen</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information hinzufügen</p>
    </div>
    <hr />
    <form>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >  
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Button onClick={handleFormsSubmit} disabled={buttonState} color={'green'} ml="auto">erstellen</Button>
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
          {segments.map((segmentData, index) => (
            <Segment
              key={index}
              TitelSegment={segmentData.TitelSegment}
              startTime={segmentData.startTime}
              endTime={segmentData.endTime}
              target={segmentData.target}
              procedure={segmentData.procedure}
              materials={segmentData.materials}/>
          ))}
        </div>
      <br />
      </Tabs.Panel>
      </Tabs>
    </form>
  </>
 );
}
export default CreateComponents