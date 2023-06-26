import { Accordion } from '@mantine/core'
import DayEdit from './DayEdit'
import useCourseStore from '../store/courseStore'



export default function DaysListEdit({ numberOfDays }: { numberOfDays: number }) {

const numeros = Array.from({ length: numberOfDays }, (_, index) => index + 1)
const dayOn = useCourseStore((state) => state.daySelected)

 return (
    <Accordion>
      
      {numeros.map((index) => (
       <Accordion.Item value={JSON.stringify(index)}>
        <Accordion.Control onClick={() => dayOn(index)}> <h3>Tag{index}</h3> </Accordion.Control>
        <Accordion.Panel>
         <DayEdit numberOfDay={index}></DayEdit>
        </Accordion.Panel>
       </Accordion.Item>
      ))} 
    </Accordion>
  ) 
}
