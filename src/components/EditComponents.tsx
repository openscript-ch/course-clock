import { Tabs, Button,Group, Box, TextInput,Textarea, ThemeIcon} from '@mantine/core';
import { useState }  from 'react';
import { useForm }   from '@mantine/form';;
import { DateInput } from '@mantine/dates';
import '../App.css'
import { updateCourseInformation } from '../data/CourseInformation';
import { TimeInput } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import { newListInfo } from './CreateComponents';
import { Segment, SegmentProps } from './Segment';


export function EditComponents(props: SegmentProps){

const [activeTab, setActiveTab] = useState<string | null>('allgemein');
const allgemeinInfo = newListInfo[newListInfo.length - 1];

const onSubmit = () => {
  allgemeinInfo.Titel = form.values.Titel
  allgemeinInfo.Autor = form.values.Autor
  allgemeinInfo.dateStart = form.values.dateStart
  allgemeinInfo.dateEnd = form.values.dateEnd
  console.log(newListInfo)
};

const handleFormsSubmit = (event:any) => {
  event.preventDefault()
  form.onSubmit(onSubmit)();
}
const [selectedSegmentId, setSelectedSegmentId] = useState<number | null>(null)

const onSegmentClick = (id: number) => {
  const foundSegment = newListInfo.find(obj => {
    return obj.id === id;
  });
  formSegment.setValues({
    TitelSegment: foundSegment.TitelSegment,
    startTime: foundSegment.startTime,
    endTime: foundSegment.endTime,
    target: foundSegment.target,
    procedure: foundSegment.procedure,
    materials: foundSegment.materials,
  })
  setSelectedSegmentId(id)
};

const onSegmentSave = () => {
  let findSegment = newListInfo.find(obj => {
    return obj.id === selectedSegmentId
  })
  findSegment.TitelSegment = formSegment.values.TitelSegment
  findSegment.startTime = formSegment.values.startTime
  findSegment.endTime = formSegment.values.endTime
  findSegment.target = formSegment.values.target
  findSegment.procedure = formSegment.values.procedure
  findSegment.materials = formSegment.values.materials
  formSegment.reset();
  console.log(findSegment)
  console.log(newListInfo)
}

const form = useForm({
  initialValues: {
    Titel:     allgemeinInfo.Titel,
    Autor:     allgemeinInfo.Autor,
    dateStart: allgemeinInfo.dateStart,
    dateEnd:   allgemeinInfo.dateEnd, 
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
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> editieren </h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form onSubmit={handleFormsSubmit}>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Button type='submit' color={'green'} ml="auto">speichern</Button>
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
              name='startTime'
              placeholder="Zeit"
              {...formSegment.getInputProps('startTime')}
              icon={<IconEdit/>}
            />

            <TimeInput
              withAsterisk
              label="Endzeitpunkt"
              name='endTime'
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
           <Segment key={index} segmentData={info} onClick={() => onSegmentClick(info.id)} />))}
        </div>
       </div>
       <br />
       <Button  onClick={onSegmentSave} color={'orange'}>Segment speichern</Button>
      <br />
      </Tabs.Panel>
      </Tabs>
    </form>
  </>
 );
}