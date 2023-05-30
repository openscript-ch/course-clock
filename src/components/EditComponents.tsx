import '../App.css'
import DaysEdit from './DaysEdit';
import { Tabs, Button, Box, TextInput} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendar, IconEdit} from '@tabler/icons-react';
import useCourseStore from "../store/courseStore"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Days from './Week';



export function EditComponents(){
  
const [activeTab, setActiveTab] = useState<string | null>('general');

const updatedSelectedCourseMetaData = useCourseStore((state) => state.
updatedSelectedCourseMetaData);
const pushSelectedCourseToApp = useCourseStore((state) => state.pushSelectedCourseToApp)
const navigate = useNavigate();

const {selectedCourse} = useCourseStore(
  (state) => ({
    selectedCourse: state.selectedCourse
  })
)


const generalInformation = selectedCourse[0]

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
});

const safeCourse = () => {
  updatedSelectedCourseMetaData(form.values)
  pushSelectedCourseToApp()  
  navigate('/my-courses') 
}

return (
<>
<div style={{marginBottom: '1rem'}}>
  <div className='title-Section'>
    <h1> <span className='teko'>KURS</span>  editieren</h1>
      <p className='description'>hier <span className='teko'>KURS</span> Information hinzufügen</p>
  </div>
  <hr />
  <form>
    <Tabs variant="outline" defaultValue="gallery" className='tabs' value={activeTab} onTabChange={setActiveTab}>  
      <Tabs.List>
        <Tabs.Tab value="general">Allgemein</Tabs.Tab>
        <Tabs.Tab value="segment">Segmente</Tabs.Tab>
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

        </Box>
      </Tabs.Panel>

      <Tabs.Panel value='segment' pt='xs'>
        <Days numberOfDays={1}></Days>
    </Tabs.Panel>
    </Tabs>
  </form>
  </div>
</>
)}