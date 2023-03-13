import {  Button, Group  } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import '../App.css'
import { useRef } from 'react';

export function AddMaterial(){
 const openRef = useRef<() => void>(null)

 return(

 <>
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
  <p><b>Deine Materialen/Unterlagen:</b></p>
  <br />
 </>

 );
}