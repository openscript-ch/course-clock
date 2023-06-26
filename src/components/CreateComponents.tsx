import '../App.css'
import { Box, TextInput, NumberInput, Tabs} from '@mantine/core'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import useCourseStore from "../store/courseStore"
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Week from './Week'
import { Button } from '@mantine/core'
import DaysList from './DaysList'

const CreateComponents = () => {
const [activeTab, setActiveTab] = useState<string | null>('general')
const pushsDayInformationToApp = useCourseStore((state) => state.pushsDayInformationToApp)
const updateDayInformation = useCourseStore((state) => state.updateDayInformation)
const resetDayInformation = useCourseStore((state) => state.resetDayInformation)
const updateCommonMetaData = useCourseStore((state) => state.updateCommonMetaData)
const setDaysNum = useCourseStore((state) => state.setDaysNum)
const resetDaysNum = useCourseStore((state) => state.resetDaysNum)
const createDays = useCourseStore((state) => state.createDays)

const {daysNum} = useCourseStore(
  (state) => ({
    daysNum: state.daysNum
  })
)

const navigate = useNavigate()

const form = useForm({
  initialValues: {    
    title: '',
    author: '',
    day: daysNum,
    date: new Date().toLocaleDateString(),
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
})


const handleFormsSubmit = () => { 
  form.values.id = uuidv4()
  form.values.day = daysNum
  updateDayInformation(form.values)
  pushsDayInformationToApp();
  resetDayInformation();
  updateCommonMetaData(form.values.id)
  resetDaysNum()
  navigate
  navigate('/my-courses');
};

const [numberOfDays, setNumberOfDays] = useState<number>(form.values.day);
const [created, setCreated] = useState(0) 

const repeatFunction = () => {
  if(created < 1){
    createDays(numberOfDays)
  } else null
}

const triggerFunction = () => {
  setDaysNum(numberOfDays)
  repeatFunction()
  setCreated(1)
}

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
      <Tabs.Tab value='segment' color='orange' onClick={triggerFunction}>Woche</Tabs.Tab>
      <Tabs.Tab value='day' color='orange' onClick={triggerFunction}>Tag</Tabs.Tab>
      <Button color='green' ml='auto' onClick={form.onSubmit(handleFormsSubmit)}> erstellen </Button>
    </Tabs.List>
    <Tabs.Panel value='general' pt="xs">
      <div className='form'>
        <form>
          <Box maw={250}>
            <TextInput
            withAsterisk
            name='titel'
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
    <Tabs.Panel value='day' style={{marginTop: '2rem'}}>
      <DaysList numberOfDays={numberOfDays}></DaysList>
    </Tabs.Panel>
  </Tabs> 
</div>
</>
)}



export default CreateComponents 
