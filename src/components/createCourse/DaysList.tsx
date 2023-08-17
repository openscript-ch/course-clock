import { Accordion } from '@mantine/core'
import Day from './Day'

export default function DaysList({ numberOfDays }: { numberOfDays: number }) {

const days = Array.from({ length: numberOfDays }, (_, index) => index + 1)

 return (
    <Accordion>
      {days.map((index) => (
       <Accordion.Item value={JSON.stringify(index)} key={index}>
        <Accordion.Control> <h3>Tag {index}</h3> </Accordion.Control>
        <Accordion.Panel>
         <Day day={index}></Day>
        </Accordion.Panel>
       </Accordion.Item>
      ))}
    </Accordion>
  )
}
