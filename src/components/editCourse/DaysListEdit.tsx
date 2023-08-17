import { Accordion, Button, ThemeIcon} from '@mantine/core'
import DayEdit from './DayEdit'
import useCourseStore from '../../store/courseStore'
import { Indicator } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

export default function DaysListEdit({ numberOfDays }:{ numberOfDays: number }) {

const numeros = Array.from({ length: numberOfDays }, (_, index) => index + 1)
const daySelected = useCourseStore((state:any) => state.daySelected)
const displayDayContent = (index:number) => { daySelected(index) }
const {selectedCourse} = useCourseStore((state:any) => ({selectedCourse: state.selectedCourse }))
const {addNewDay} = useCourseStore((state:any) => ({addNewDay: state.selectedCourse }))
return (
<>
  <Accordion defaultValue={JSON.stringify(1)}>
      {numeros.map((index) => {
        const numberOfEvent = selectedCourse.find((day: any) => {
          return day[0] && day[0].id === index
        })
        return (
          <Accordion.Item value={JSON.stringify(index)} key={index}>
            <Accordion.Control onClick={() => displayDayContent(index)}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <h3>Tag{index}</h3>
                {numberOfEvent.length > 1 ? (
                  <Indicator label={numberOfEvent?.length - 1} size={16} color='orange' >
                  </Indicator>
                ) : null}
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <DayEdit numberOfDay={index}></DayEdit>
            </Accordion.Panel>
          </Accordion.Item>
        )
      })}
    </Accordion>
    <div>
      <Button color='orange' style={{float: 'right', marginTop: '2rem'}} onClick={() => addNewDay()}>
        <IconPlus/>
      </Button>
    </div>
</>
  )}
