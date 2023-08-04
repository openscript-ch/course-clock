import { Button, Box, TextInput, NumberInput, Tabs} from '@mantine/core'
import { useState, useEffect, useRef} from 'react'
import { useForm } from '@mantine/form'
import { IconEdit} from '@tabler/icons-react'
import useCourseStore from "../../store/courseStore"
import { useNavigate } from 'react-router-dom'
import { mainWithoutDate } from '../../modals/main'
import WeekEdit from './WeekEdit'
import DaysListEdit from './DaysListEdit'

export function EditComponents(){

//-------------------------- store function/values -----------------------

const updatedSelectedCourseMetaData = useCourseStore((state:any) => state.updatedSelectedCourseMetaData);
const pushSelectedCourseToApp = useCourseStore((state:any) => state.pushSelectedCourseToApp)
const resetSelectedCourse = useCourseStore((state:any) => state.resetSelectedCourse)

const {selectedCourse} = useCourseStore((state:any) => ({selectedCourse: state.selectedCourse}))


//------------------- set ActiveTab --------------------------------------

const [activeTab, setActiveTab] = useState(0)

const handleTabChange = (index:number) => {
  setActiveTab(index)
};

useEffect(() => {
  const handleKeyDown = (event:any) => {
    if (event.key === 'ArrowLeft') {
      setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : 0))
    } else if (event.key === 'ArrowRight') {
      setActiveTab((prevTab) => (prevTab < 2 ? prevTab + 1 : 2)) 
  };

  document.addEventListener('ArrowLefts', handleKeyDown)

  return () => {
    document.removeEventListener('ArrowLeft', handleKeyDown)
  }
}})

//--------------------- set AvtiveInputField -----------------------------


  const titleRef = useRef<HTMLInputElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const dayRef = useRef<HTMLInputElement>(null)

  const navInputFields = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      e.preventDefault();
      const activeElement = document.activeElement as HTMLInputElement
      const inputFields = [titleRef, authorRef, dayRef]
      const currentIndex = inputFields.findIndex((ref) => ref.current === activeElement)

      let nextIndex = -1;
      if (currentIndex !== -1) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          nextIndex = (currentIndex + 1) % inputFields.length
        } else if (e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + inputFields.length) % inputFields.length
        }
      }
      if (nextIndex !== -1) {
        inputFields[nextIndex].current?.focus();
      }
    }}

//----------------------- general ----------------------------------------

const navigate = useNavigate()

const generalInformation = selectedCourse.find((obj:mainWithoutDate) => typeof obj.id === 'string')

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
  updatedSelectedCourseMetaData(form.values)
  pushSelectedCourseToApp()
  resetSelectedCourse()
  navigate('/my-courses') 
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
    <Tabs variant="outline" defaultValue={'general'} style={{marginTop: '2rem', marginLeft: '2%'}} active={activeTab} onTabChange={() => handleTabChange}>  
      <Tabs.List>
        <Tabs.Tab value="general" color='orange'>Allgemein</Tabs.Tab>
        <Tabs.Tab value="segment" color='orange'>Segmente</Tabs.Tab>
        <Tabs.Tab value="days"    color='orange'>Tage</Tabs.Tab>
        <Button color={'green'} ml="auto"  onClick={form.onSubmit(safeCourse)}> speichern</Button>
      </Tabs.List>
      <br />
      <Tabs.Panel value="general" pt="xs">
        <Box maw={250}>

          <TextInput
            autoFocus
            withAsterisk
            icon={<IconEdit/>}
            name='title'
            label="Titel"
            placeholder="Kurs Name"
            onKeyDown={navInputFields}
            ref={titleRef}
            {...form.getInputProps('title')}
          />

          <TextInput
            withAsterisk
            icon={<IconEdit/>}
            name="author"
            label="Autor"
            placeholder="Autor Name"
            onKeyDown={navInputFields}
            ref={authorRef}
            {...form.getInputProps('author')}
          />

          <NumberInput
            withAsterisk
            name='day'   
            label='Tage'
            placeholder='Dauer in Tage'
            onKeyDown={navInputFields}
            ref={dayRef}
            {...form.getInputProps('day')}
            disabled={true}
          />

        </Box>
      </Tabs.Panel>

      <Tabs.Panel value='segment' pt='xs'>
        <WeekEdit blockInteractions={false} numberOfDays={form.values.day}></WeekEdit>
      </Tabs.Panel>
      <Tabs.Panel value='days'>
        <DaysListEdit numberOfDays={generalInformation.day} ></DaysListEdit>
      </Tabs.Panel>
    </Tabs>
  </form>
  </div>
</>
)}