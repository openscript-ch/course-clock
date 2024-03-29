import '../App.css'
import CoursesList from '../components/CoursesList'
import { AppShell, Navbar, Header, ThemeIcon  } from '@mantine/core'
import { IconPlus, IconFile, IconSettings2, IconClock } from '@tabler/icons-react'
import { Link } from "react-router-dom"

function MyCourses() {
  return (
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
            <ThemeIcon className='main-Option' style={{marginTop: '1rem'}}radius={360} size={'lg'} color={"orange"}>
              <IconFile/>
            </ThemeIcon>
            </Link>
            <br />
            <Link to='/create-course'>
            <ThemeIcon className='main-Option' variant={'outline'}  radius={360} size={'lg'} color={"dark"}>
              <IconPlus/>
            </ThemeIcon>
            </Link>
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

    {<CoursesList></CoursesList>}

  </AppShell>

  )
}

export default MyCourses
