import { Box, TextInput, NumberInput, Tabs} from '@mantine/core'
import { useState, useRef } from 'react'
import { useForm } from '@mantine/form'
import useCourseStore from '../../store/courseStore'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Week from './Week'
import { Button } from '@mantine/core'
import { useEffect } from 'react'
import DaysList from './DaysList'

const CreateComponents = () => {

//------------------- set ActiveTab --------------------------------------

  const [activeTab, setActiveTab] = useState(1)

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

  const navInputFields = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      e.preventDefault();
      const activeElement = document.activeElement as HTMLInputElement;
      const inputFields = [titleRef, authorRef];
      const currentIndex = inputFields.findIndex((ref) => ref.current === activeElement);

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

//----------------------- general -----------------------------------------------    
 
const pushsDayInformationToApp = useCourseStore((state:any) => state.pushsDayInformationToApp)
const updateDayInformation = useCourseStore((state:any) => state.updateDayInformation)
const resetDayInformation = useCourseStore((state:any) => state.resetDayInformation)
const updateCommonMetaData = useCourseStore((state:any) => state.updateCommonMetaData)
const setDaysNum = useCourseStore((state:any) => state.setDaysNum)
const resetDaysNum = useCourseStore((state:any) => state.resetDaysNum)
const createDays = useCourseStore((state:any) => state.createDays)

const {daysNum} = useCourseStore(
  (state:any) => ({
    daysNum: state.daysNum
  })
)

const navigate = useNavigate()

const form = useForm({
  initialValues: {    
    title: '',
    author: '',
    day: daysNum,
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
  navigate('/my-courses')
};

const [numberOfDays, setNumberOfDays] = useState<number>(form.values.day)
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
  <Tabs defaultValue={'general'} style={{marginTop: '2rem', marginLeft: '2%'}} active={activeTab}                  onTabChange={() => handleTabChange}>
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
            autoFocus
            withAsterisk
            name='titel'
            label='Titel'
            placeholder='Kurs Name'
            onKeyDown={navInputFields}
            ref={titleRef}
            {...form.getInputProps('title')}
            />

            <TextInput
            withAsterisk 
            name='author'
            label='Autor'
            placeholder='Autor Name'
            onKeyDown={navInputFields}
            ref={authorRef}
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
      <Week numberOfDays={numberOfDays}/>
    </Tabs.Panel>
    <Tabs.Panel value='day' style={{marginTop: '2rem'}}>
      <DaysList numberOfDays={numberOfDays}/>
    </Tabs.Panel>
  </Tabs>
</div>
</> 
)}
export default CreateComponents 