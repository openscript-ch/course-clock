import { Tabs,Input, Textarea, Button, Group  } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { useState, useRef } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import '../App.css'


export function CreateComponents(){
  const [value, setValue] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);
  const openRef = useRef<() => void>(null)

 return(
  <>
        <div className='titel-Section'>
          <h1 className='titel-Erstellen'>KURS erstellen</h1>
          <p className='description'>hier <b>ALLGEMEINE</b> Information bearbeiten</p>
        </div>
        <hr />
        <Tabs defaultValue="gallery" className='tabs'>
          <Tabs.List>
            <Tabs.Tab value="allgemein">Allgemein</Tabs.Tab>
            <Tabs.Tab value="segmente">Segmente</Tabs.Tab>
            <Tabs.Tab value="unterlagen">Materialen/Unterlagen</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="allgemein" pt="xs">
            <form action="submit" className='allgemein-Form'>
              <label htmlFor="titel">Titel:</label>
              <Input className='input-allgemein'></Input>
              <br />
              <label htmlFor="titel">Autor:</label>
              <Input className='input-allgemein'></Input>
              <br />
              <div>
                <label htmlFor="titel">Von-</label>
                <DatePicker className='dates' value={value} onChange={setValue} placeholder="Datum auswählen" maw={200} mx="auto"/>
              </div>
              <br />
              <div>
                <label htmlFor="titel">-Bis</label>
                <DatePicker className='dates' value={value2} onChange={setValue2} placeholder="Datum auswählen" maw={200} mx="auto"/>
              </div>
              <br /><br />
              <Button type='submit' color={'orange'}>Erstellen</Button>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="segmente" pt="xs">
            <form action="submit" className='segment-Form'>
            <label htmlFor="titel">Titel:</label>
            <Input className='input-allgemein'></Input>
            <br />
            <div>
              <label htmlFor="titel">Startzeitpunkt:</label>
              <TimeInput icon={<IconClock size="1rem" stroke={1.5} />} maw={200} />
            </div>
            <br />
            <div>
              <label htmlFor="titel">Endzeitpunkt:</label>
              <TimeInput icon={<IconClock size="1rem" stroke={1.5} />} maw={200} />
            </div>
            <br />
            <label htmlFor="titel">Ziele:</label>
            <Textarea className='input-allgemein'></Textarea>
            <br />
            <label htmlFor="titel">Ablauf:</label>
            <Textarea className='input-allgemein'></Textarea>
            <br />
            <label htmlFor="titel">Materialen/Unterlagen:</label>
            <Textarea className='input-allgemein'></Textarea>
            <br />
            <Button type='submit' color={'orange'}>Erstellen</Button>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="unterlagen" pt="xs">

            <Dropzone
              openRef={openRef}
              onDrop={() => {}}
              activateOnClick={false}
              styles={{ inner: { pointerEvents: 'all' } }}
            >
              <div style={{textAlign: 'center', color: 'grey'}}>
                <h3>
                  Drag files here or click to select files
                </h3>
                <p>
                  Attach as many files as you like, each file should not exceed 5mb
                </p>
              </div>

           </Dropzone>
           <br />
           <Group position="center">
                <Button color={'orange'} onClick={() => openRef?.current?.()}>Select files</Button>
            </Group>
            <p>
              Deine Materiale/Unterlagen:
              <br /><br />
              <ul>
                <li></li>
              </ul>
            </p>
          </Tabs.Panel>
        </Tabs>
        </>
 );
}