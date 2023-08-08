import '../App.css'
import { AppShell, Navbar, Header, ThemeIcon, Modal, NumberInput, NativeSelect, Radio, Group, Button, Box } from '@mantine/core'
import { IconPlus, IconFile, IconPdf, IconSettings2, IconClock, IconArrowBigRightLine} from '@tabler/icons-react'
import { Link } from "react-router-dom"
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import useCourseStore from '../store/courseStore';
import {useState } from 'react';
import { Main} from '../modals/main';

export function ExportPDF(){
 const [opened, { open, close }] = useDisclosure(true);

 const {appMetaData} = useCourseStore(
  (state) => ({
    appMetaData: state.appMetaData
  })
)

const filter3 = appMetaData.map((innerArray: any) => innerArray.filter((obj: Main) => obj.title) .map((obj: Main) => obj.title)[0]);

const exportChoiceForm = useForm({
  initialValues: {    
    course: filter3[0],
    übersicht: '',
    fileTyp: 'json',
  },
})

const [selectedFileType, setSelectedFileType] = useState(''); 
const [isSelectDisabledUebersicht, setIsSelectDisabledUebersicht] = useState(true);
const [isSelectDisabledCourse, setIsSelectDisabledCourse] = useState(false);

const handleFileTypeChange = (e:any) => {
  const selectedValue = e.target.value;
  setSelectedFileType(selectedValue);
  setIsSelectDisabledUebersicht(selectedValue === 'json');
};

const selctedCoices = () => {
  console.log(exportChoiceForm.values)
  exportStateToJson(appMetaData[1])
  close()
}

const exportStateToJson = (state:object) => {
  const jsonData = JSON.stringify(state);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; 
  a.download = 'CourseClock_course-'+exportChoiceForm.values.course
  a.click();
  URL.revokeObjectURL(url);
};


return(
  <AppShell
      padding="md"
      header={
      <Header height={100} p="xs" className='header'>
      {<h2>course<span className='teko'>CL 
          <ThemeIcon radius={360} size={'lg'} color={"orange"}>
            <IconClock></IconClock>
          </ThemeIcon>CK</span>
        </h2>}
      </Header>
      }

      navbar={
      <Navbar width={{ base: 100 }} p="xs" className='navbar'>
        {
          <div className='nav-Bar'> 
            <Link to='/my-courses'>
            <ThemeIcon className='main-Option' style={{marginTop: '1rem'}}    variant={"outline"} radius={360} size={'lg'} color={"dark"}>
              <IconFile/>
            </ThemeIcon>
            </Link>
            <br />

            <Link to='/create-course'>
            <ThemeIcon className='main-Option' radius={360} size={'lg'} color={"dark"} variant={"outline"}>
                <IconPlus/>
            </ThemeIcon>
            </Link>
            <br />
            <ThemeIcon className='main-Option' onClick={open} color={"orange"} radius={360} size={'lg'} >
              <IconPdf/>
            </ThemeIcon>
            <br />

            <ThemeIcon className='setting-Icon' variant={"outline"} radius={360} size={'lg'} color={"dark"}>
              <IconSettings2/>
            </ThemeIcon>
            
          </div> 
        }
      </Navbar>}


      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
  })}>

    <Modal opened={opened} onClose={close} title="Export" centered>
        {
      <div>         
        <Box className={'box'}>        
        <NativeSelect
            withAsterisk
            name='course'
            label="Kurs"
            disabled={isSelectDisabledCourse}
            data={filter3.map((title:string) => ({value: title, label:title}) )}
            {...exportChoiceForm.getInputProps('course')}
          />
        <NativeSelect
            withAsterisk
            name='übersicht'
            label="Übersicht"
            placeholder="Pick one"
            disabled={isSelectDisabledUebersicht}
            data={[
              { value: 'Wochenansicht', label: 'Wochenansicht' },
              { value: 'Tagesansicht', label: 'Tagesansicht' },
              { value: 'Wochenüberblick/Tagesansicht', label: 'Wochenüberblick/Tagesansicht' },
            ]}
            {...exportChoiceForm.getInputProps('übersicht')}
          />
          <br />
          <Radio.Group
            name="fileTyp"
            label="Select file type"
            withAsterisk
            {...exportChoiceForm.getInputProps('fileTyp')}
          >
            <Group mt="xs" onChange={handleFileTypeChange}>
              <Radio value="json" label=".json" />
              <Radio value="pdf" label=".pdf" />
            </Group>
          </Radio.Group>
          <br />

          <Button type='submit' onClick={exportChoiceForm.onSubmit(selctedCoices)} color='orange'>
            <IconArrowBigRightLine/>
          </Button>

        </Box>
      </div>          
        }
    </Modal>
    
  </AppShell>
    
  );
}