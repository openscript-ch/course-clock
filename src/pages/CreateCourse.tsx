import { AppShell, Navbar, Header, ThemeIcon  } from '@mantine/core';
import { IconPlus, IconEdit, IconPdf, IconSettings2, IconClock } from '@tabler/icons-react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import '../App.css'
import { CreateComponents } from '../components/CreateComponents';

interface CreateCourseProps {
  setShowHomepageContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateCourse({ setShowHomepageContent }: CreateCourseProps){
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

            <ThemeIcon className='main-Option' style={{marginTop: '1rem'}} radius={360} size={'lg'} color={"orange"}>
              <IconPlus/>
            </ThemeIcon>
            <br />

            <Link to='/edit-course'>
            <ThemeIcon className='main-Option' variant={"outline"} radius={360} size={'lg'} color={"dark"}>
              <IconEdit/>
            </ThemeIcon>
            </Link>
            <br />

            <ThemeIcon className='main-Option' variant={"outline"} radius={360} size={'lg'} color={"dark"}>
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

    {<CreateComponents></CreateComponents>}

  </AppShell>

  );
}