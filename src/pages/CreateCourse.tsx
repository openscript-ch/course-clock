import '../App.css'
import { AppShell, Navbar, Header, ThemeIcon  } from '@mantine/core'
import { IconPlus, IconFile, IconPdf, IconSettings2, IconClock} from '@tabler/icons-react'
import { Link } from "react-router-dom"

import  CreateComponents  from '../components/createCourse/CreateComponents'

export function CreateCourse(){
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
            <ThemeIcon className='main-Option' style={{marginTop: '1rem'}}   variant={"outline"} radius={360} size={'lg'} color={"dark"}>
              <IconFile/>
            </ThemeIcon>
            </Link>
            <br />

            <ThemeIcon className='main-Option' radius={360} size={'lg'} color={"orange"}>
              <IconPlus/>
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