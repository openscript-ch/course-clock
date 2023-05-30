import '../App.css'
import { SegmentEdit } from './SegmentEdit';
import React, { useEffect, useState } from 'react'
import {Accordion, ActionIcon, Box, TextInput,Textarea, Button, Group, } from '@mantine/core';
import {IconPlus, IconX} from '@tabler/icons-react';
import useCourseStore from "../store/courseStore"
import { TimeInput } from '@mantine/dates';
import { IconClock} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Main } from '../modals/main';
import { Segment } from '../modals/segment';

function DaysEdit({ day }: Main) {

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)


const [segments, setSegments] = useState([]);
const [opened, { open, close }] = useDisclosure(false);
const addNewSegment = useCourseStore((state) => state.addNewSegment)
const saveSegmentId = useCourseStore((state) => state.saveSegmentId)



const formSegment = useForm({
  initialValues: {
    title: '',
    startTime: '',
    endTime: '',
    target: '',
    procedure: '',
    material: '',
    id: 0
  },
  validate: {
    title: (value) => (value.length < 1 ? 'Bitte Pflichtfeld ausfüllen' : null),
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

useEffect(() => {
  const filteredCourseMetaData = selectedCourse.find((courseArray:[]) =>
    courseArray.some((course: Main) => course.day === day)
  );
  if(filteredCourseMetaData !== undefined){
    setSegments(filteredCourseMetaData.slice(1));
  } 
}, [segments, day]); 


const handleClick = (id:number) => {
  if(id){
  saveSegmentId(id)
  }
};

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(100, 100, 100, 0.6)'
  }
};

const handleAddSegment = () => { 
  formSegment.values.id = Math.floor(Math.random()*10000)
  addNewSegment(day, formSegment.values)
  close()    
  formSegment.reset();
};

return (
  <>
  <Modal styles={modalStyles} size="s" opened={opened} onClose={close} title="Segment erstellen" centered padding={'xl'} radius={'md'}>
        {
          <div>
            <Box maw={250} className={'box'}>
              <TextInput
                data-autofocus
                withAsterisk
                name ='title'
                label ='Titel'
                placeholder="Segment Name"
                {...formSegment.getInputProps('title')}
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
                name='material'
                label='Material'
                placeholder='Materialen'
                {...formSegment.getInputProps('material')}
              />
            
              <Button color={'orange'} size={'sm'} 
              onClick={formSegment.onSubmit(handleAddSegment)} variant='filled'>
                <p>hinzufügen</p>
              </Button>
            </Box>
          </div>
        }
    </Modal>
  <div style={{display: 'flex'}}>
    <Accordion defaultValue="none">
    <Accordion.Item value="customization">
      <Accordion.Control className='days'>
        Tag {day}
      </Accordion.Control>
    <Accordion.Panel>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-end'}} >
        {segments.map((segmentData:Segment) => (
        <div style={{display: 'flex'}}>
        <div onMouseOver={() => handleClick(segmentData.id)}>
          <SegmentEdit
            title={segmentData.title}
            startTime={segmentData.startTime}
            endTime={segmentData.endTime}
            target={segmentData.target}
            procedure={segmentData.procedure}
            material={segmentData.material}
            />
          </div>
          <div>
            <ActionIcon>
              <IconX></IconX>
            </ActionIcon>
          </div>
          </div>
        ))} 
        <div>
          <ActionIcon variant="filled" color='orange' radius={360} onClick={open}>
            <IconPlus color='white'/>
          </ActionIcon>
        </div>
        </div>        
      </Accordion.Panel>
    </Accordion.Item>
    <br />
    </Accordion>
  </div>
  </>
  )
}

export default DaysEdit
