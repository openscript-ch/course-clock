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

const [activeTab, setActiveTab] = useState<string | null>('general');

const updatedCommonMetaData = useCourseStore((state) => state.updatedCommonMetaData)

const updatedSegmentMetaData = useCourseStore((state) => state.
updatedSegmentMetaData);

const saveSegmentId = useCourseStore((state) => state.saveSegmentId)

const deleteSegmentMetaData = useCourseStore((state) => state.deleteSegmentMetaData)

const {courseMetaData} = useCourseStore(
  (state) => ({
    courseMetaData: state.courseMetaData
  })
)

let {segmentIdMetaData} = useCourseStore(
  (state) => ({
    segmentIdMetaData: state.segmentIdMetaData
  })
)

const lastItem = courseMetaData[courseMetaData.length -1];

const form  = useForm({
  initialValues: {
    title:     lastItem.title,
    author:     lastItem.author,
    dateStart: lastItem.dateStart,
    dateEnd:   lastItem.dateEnd,
  },
  validate: {
    title: (value?:string) => {
      if(value !== undefined){
        if(value.length < 1){
          return 'Bitte Pflichtfeld ausfüllen'
        } else null
      }
    },
    author: (value?:string) => {
      if(value !== undefined){
        if(value.length < 1){
          return 'Bitte Pflichtfeld ausfüllen'
        } else null
      }
    },
    dateStart: (value?:string) => {
      if(value !== undefined){
        if(value.length < 1){
          return 'Bitte Pflichtfeld ausfüllen'
        } else null
      }
    },
    dateEnd: (value, values) => {
      if(value !== undefined){
        if(value.length < 1 ) {
          return 'Bitte Pflichtfeld ausfüllen'
        } else if(values.dateStart !== undefined) {
            if(value < values.dateStart){
              return 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.'
            } else null
       } else {
          return null
        }
    }},
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
  },
  validate: {
    titleSegment: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    startTime: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
    endTime: (value, values) => {
      if(value.length < 0) {
        return 'Bitte Pflichtfeld ausfüllen'
      } else if(value < values.startTime) {
        return 'Ups! Der Endzeitpunkt muss nach dem Startzeitpunkt liegen.'
      } else {
        return null
      }
    },
    procedure: (value:string) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
  }
});

const handleClick = (id?: number) => {
  const foundSegment = courseMetaData.find(obj => {
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
  }};

const editSegment = () => {
  updatedSegmentMetaData(segmentIdMetaData, formSegment.values)
  formSegment.reset()
 }
const saveCourse = () => {
  updatedCommonMetaData(idAllgemein, form.values)
}

const deleteSeg = (id: number) => {
  deleteSegmentMetaData(id)
  formSegment.reset()
}

return(
  <>
  <div style={{marginBottom: '1rem'}}>
    <div className='title-Section'>
      <h1> <span className='teko'>KURS</span> editieren </h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information bearbeiten</p>
    </div>
    <hr />
    <form>
      <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab} >
        <Tabs.List>
         <Tabs.Tab value="general">Allgemein</Tabs.Tab>
          <Tabs.Tab value="segment">Segmente</Tabs.Tab>
          <Button  color={'green'} ml="auto" onClick={form.onSubmit(saveCourse)}>speichern</Button>
        </Tabs.List>
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
           {...form.getInputProps('dateStart')}
          />

          <DateInput
           withAsterisk
           label="-Bis"
           placeholder="Datum"
           {...form.getInputProps('dateEnd')}
          />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="segment" pt="xs">
      <div style={{display: 'flex'}} className={'segment'}>
        <div>
        <Box maw={250} className={'box'}>
          <TextInput
            withAsterisk
            name='titleSegment'
            label="Titel"
            placeholder="Segment Name"
            {...formSegment.getInputProps('titleSegment')}
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
        <Button color={'orange'} onClick={formSegment.onSubmit(editSegment)} style={{marginTop: '1rem'}}>Segment speichern</Button>
        </div>
        {courseMetaData.slice(0,-1).map((segmentInformation:courseValues) => (
          <div style={{display: 'flex'}}>
          <div onClick={()=>handleClick(segmentInformation.id)}>
          <Segment
            titleSegment={segmentInformation.titleSegment}
            startTime={segmentInformation.startTime}
            endTime={segmentInformation.endTime}
            target={segmentInformation.target}
            procedure={segmentInformation.procedure}
            materials={segmentInformation.materials}
            />
            </div>
            <div>
            <IconCircleX size={'1rem'} onClick={() =>deleteSeg(segmentInformation.id)}/>
            </div>
            </div>
          ))}
       </div>
      </Tabs.Panel>
      </Tabs>
    </form>
    </div>
  </>
 );
}