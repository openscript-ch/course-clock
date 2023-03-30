import { Tabs, Button, Box, TextInput, Textarea} from '@mantine/core';
import { useState }  from 'react';
import { useForm }   from '@mantine/form';
import { DateInput } from '@mantine/dates';
import '../App.css'
import { TimeInput } from '@mantine/dates';
import { IconCircleX, IconEdit } from '@tabler/icons-react';
import { Segment} from './Segment';
import useCourseStore, { courseValues } from '../store/courseStore';
import { idAllgemein } from './CreateComponents';

export function EditComponents(){

const [activeTab, setActiveTab] = useState<string | null>('allgemein');

const updateAllgemeinInformation = useCourseStore((state) => state.updateAllgemeinInformation)

const updateSegmentInformation = useCourseStore((state) => state.
updateSegmentInformation);

const saveSegmentId = useCourseStore((state) => state.saveSegmentId)

const deleteSegment = useCourseStore((state) => state.deleteSegment)

const {newListInformation} = useCourseStore(
  (state) => ({
    newListInformation: state.newListInformation
  })
)

let {segmentId} = useCourseStore(
  (state) => ({
    segmentId: state.segmentId
  })
)

const lastItem = newListInformation[newListInformation.length -1];

const form  = useForm({
  initialValues: {
    Titel:     lastItem.Titel,
    Autor:     lastItem.Autor,
    dateStart: lastItem.dateStart,
    dateEnd:   lastItem.dateEnd,
  },
  validate: {
    Titel: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    Autor: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateStart: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    dateEnd: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
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
    TitelSegment: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    startTime: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    endTime: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    procedure: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

const handleClick = (id?: number) => {
  const foundSegment = newListInformation.find(obj => {
    return obj.id === id;
  });
  if(id){
  saveSegmentId(id)
  }
  if (foundSegment) {
    formSegment.setValues({
      TitelSegment: foundSegment.TitelSegment,
      startTime: foundSegment.startTime,
      endTime: foundSegment.endTime,
      target: foundSegment.target,
      procedure: foundSegment.procedure,
      materials: foundSegment.materials,
    });
  }};

const editSegment = () => {
  if(formSegment.isValid()){
  updateSegmentInformation(segmentId, formSegment.values)
  formSegment.reset()
 }}

const saveCourse = () => {
  if(form.isValid()){
    updateAllgemeinInformation(idAllgemein, form.values)
  }
}

const deleteSeg = (id:number) => {
  deleteSegment(id)
}

return(
  <>
    <div className='titel-Section'>
      <h1 className='titel-Erstellen'> <span className='teko'>KURS</span> editieren </h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >
        <Tabs.List>
         <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
          <Button  color={'green'} ml="auto" onClick={saveCourse}>speichern</Button>
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
        <div>
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
        <br />
        <Button color={'orange'} onClick={editSegment}>Segment speichern</Button>
        </div>
        {newListInformation.slice(0,-1).map((segmentInformation:courseValues) => (
          <div style={{display: 'flex'}}>
          <div onClick={() => handleClick(segmentInformation.id)}>
          <Segment
            TitelSegment={segmentInformation.TitelSegment}
            startTime={segmentInformation.startTime}
            endTime={segmentInformation.endTime}
            target={segmentInformation.target}
            procedure={segmentInformation.procedure}
            materials={segmentInformation.materials}
            />
            </div>
            <div>
            <IconCircleX size={'1rem'} onClick={()=>deleteSeg(segmentInformation.id)}/>
            </div>
            </div>
          ))}
       </div>
       <br />
      </Tabs.Panel>
      </Tabs>
    </form>
  </>
 );
}