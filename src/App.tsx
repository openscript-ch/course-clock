import './App.css'
import {MantineProvider} from '@mantine/core';
 
import { Homepage } from './pages/Homepage';

export default function App() {
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS >
      <Homepage></Homepage>
    </MantineProvider>
  );
}