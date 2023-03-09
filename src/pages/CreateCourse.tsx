import { AppShell, Navbar, Header, Title,ThemeIcon, Tabs,Input, Textarea, Button, Group  } from '@mantine/core';
import { useState, useRef } from 'react';

interface CreateCourseProps {
  setShowHomepageContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateCourse({ setShowHomepageContent }: CreateCourseProps){
  const [value, setValue] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);
  const openRef = useRef<() => void>(null)

 return(
  <AppShell
      padding="md"
      header={
      <Header height={100} p="xs" className='header'>
      </Header>
      }

      navbar={
      <Navbar width={{ base: 100 }} p="xs" className='navbar'>
      </Navbar>}


      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
  })}>

    {}

  </AppShell>

  );
}