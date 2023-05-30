import '../App.css'
import { Box, TextInput, NumberInput, Tabs} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';;
import useCourseStore from "../store/courseStore"
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Week from './Week';
import { Button } from '@mantine/core';
import Day from './Day';

const CreateComponents = () => {
const [activeTab, setActiveTab] = useState<string | null>('general');
const pushsDayInformationToApp = useCourseStore((state) => state.pushsDayInformationToApp);
const updateDayInformation = useCourseStore((state) => state.updateDayInformation);
const resetDayInformation = useCourseStore((state) => state.resetDayInformation);
const updateCommonMetaData = useCourseStore((state) => state.updateCommonMetaData);

const createDays = useCourseStore((state) => state.createDays)


const navigate = useNavigate();

const form = useForm({
  initialValues: {    
    title: '',
    author: '',
    day: 1,
    id: '',
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


const handleFormsSubmit = () => { 
  form.values.id = uuidv4()
  updateDayInformation(form.values)
  pushsDayInformationToApp();
  resetDayInformation();
  updateCommonMetaData(form.values.id)
  navigate
  navigate('/my-courses') ;
};

const [numberOfDays, setNumberOfDays] = useState<number>(form.values.day);

return(
<>
<div style={{marginBottom: '1rem'} }>
  <div className='title-Section'>
    <h1> <span className='teko'> KURS </span> erstellen</h1>
    <p className='description'> hier <span className='teko'>KURS</span> Information hinzufügen</p>
  </div>
  <hr />  
  <Tabs defaultValue={'general'} style={{marginTop: '2rem', marginLeft: '2%'}}>
    <Tabs.List>
      <Tabs.Tab value='general' color='orange'>Allgemein</Tabs.Tab>
      <Tabs.Tab value='segment' color='orange' onClick={() => createDays(numberOfDays)}
      >Woche</Tabs.Tab>
      <Tabs.Tab value='day' color='orange'>Tag</Tabs.Tab>
      <Button 
      color='green' 
      ml='auto' 
      onClick={form.onSubmit(handleFormsSubmit)}
      >
        erstellen
      </Button>
    </Tabs.List>
    <Tabs.Panel value='general' pt="xs">
      <div className='form'>
        <form>
          <Box maw={250}>
            <TextInput
            withAsterisk
            name='title'
            label='Titel'
            placeholder='Kurs Name'
            {...form.getInputProps('title')}
            />

            <TextInput
            withAsterisk
            name='author'
            label='Autor'
            placeholder='Autor Name'
            {...form.getInputProps('author')}
            />

            <NumberInput
            withAsterisk
            name='day'   
            label='Tage'
            placeholder='Dauer in Tage'
            {...form.getInputProps('day')}
            onChange={(value:number) => setNumberOfDays(value)}
            />
          </Box>
        </form>
      </div>
    </Tabs.Panel>
    <Tabs.Panel value='segment' pt='xs'>
      <Week numberOfDays={numberOfDays} />
    </Tabs.Panel>
    <Tabs.Panel value='day'>
      <Day></Day>
    </Tabs.Panel>
  </Tabs> 
</div>
</>
)}
export default CreateComponents 
