import '../App.css'
import { Button, Box, TextInput, NumberInput, Tabs} from '@mantine/core'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import {  IconEdit} from '@tabler/icons-react'
import useCourseStore from "../store/courseStore"
import { useNavigate } from 'react-router-dom'
import { Main } from '../modals/main'
import WeekEdit from './WeekEdit'
import DaysListEdit from './DaysListEdit'
import { segmentDayId } from '../modals/segment'

export function EditComponents(){

const [activeTab, setActiveTab] = useState<string | null>('general')

const updatedSelectedCourseMetaData = useCourseStore((state) => state.
updatedSelectedCourseMetaData);
const pushSelectedCourseToApp = useCourseStore((state) => state.pushSelectedCourseToApp)
const resetSelectedCourse = useCourseStore((state) => state.resetSelectedCourse)
const updSelectedCourse = useCourseStore((state) => state.updSelectedCourse)
const resetDraggedSelectedCourse = useCourseStore((state) => state.resetDraggedSelectedCourse)
const resetAddedSegment = useCourseStore((state) => state.resetAddedSegment)

const navigate = useNavigate()

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)

const {commonIdMetaData} = useCourseStore(
  (state) => ({
    commonIdMetaData: state.commonIdMetaData
  })
)

const {draggedSelectedCourse} = useCourseStore(
  (state) => ({
    draggedSelectedCourse: state.draggedSelectedCourse
  })
)

const generalInformation = selectedCourse.find((obj:Main) => typeof obj.id === 'string')

const form = useForm({
  initialValues: {    
    title: generalInformation?.title,
    author: generalInformation?.author,
    day: generalInformation?.day,
    id:generalInformation?.id,
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
    day: (value) => (value < 1 ? 'Ungültiger Kurs dauer ' : null),
  }
})

const safeCourse = () => {
  const actualDay:any = draggedSelectedCourse.find((obj: segmentDayId) => typeof obj.id === 'number')
  if (actualDay && typeof actualDay.id === 'number') {
    updSelectedCourse(actualDay.id , draggedSelectedCourse) 
    updatedSelectedCourseMetaData(form.values)
    pushSelectedCourseToApp()
    resetSelectedCourse()
    resetAddedSegment()
    resetDraggedSelectedCourse()
    navigate('/my-courses') 
  } 
}

  return (
<>
<div style={{marginBottom: '1rem'} }>
  <div className='title-Section'>
    <h1> <span className='teko'>KURS</span>  editieren</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information hinzufügen</p>
  </div>
  <hr />
  <form>
    <Tabs variant="outline" defaultValue="gallery" style={{marginTop: '2rem', marginLeft: '2%'}} value={activeTab} onTabChange={setActiveTab}>  
      <Tabs.List>
        <Tabs.Tab value="general">Allgemein</Tabs.Tab>
        <Tabs.Tab value="segment">Segmente</Tabs.Tab>
        <Tabs.Tab value="days">Tage</Tabs.Tab>
        <Button color={'green'} ml="auto" onClick={form.onSubmit(safeCourse)}>speichern</Button>
      </Tabs.List>
      <br />
      <Tabs.Panel value="general" pt="xs" >
        <Box maw={250}>
          <TextInput
            withAsterisk
            icon={<IconEdit/>}
            name='title'
            label="Titel"
            placeholder="Kurs Name"
            {...form.getInputProps('title')}
          />

          <TextInput
            withAsterisk
            icon={<IconEdit/>}
            name='author'
            label="Autor"
            placeholder="Autor Name"
            {...form.getInputProps('author')}
          />

          <NumberInput
          withAsterisk
          name='day'   
          label='Tage'
          placeholder='Dauer in Tage'
          {...form.getInputProps('day')}
          disabled={true}
          />

        </Box>
      </Tabs.Panel>

      <Tabs.Panel value='segment' pt='xs'>
        <WeekEdit numberOfDays={form.values.day}></WeekEdit>
      </Tabs.Panel>
      <Tabs.Panel value='days'>
        <DaysListEdit numberOfDays={generalInformation.day} ></DaysListEdit>
      </Tabs.Panel>
    </Tabs>
  </form>
  </div>
</>
)}