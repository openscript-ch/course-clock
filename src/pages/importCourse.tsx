import './App.css'
import {MantineProvider} from '@mantine/core';

export default function App() {
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS >
     <p>welcome to the import page</p>
    </MantineProvider>
  );
}