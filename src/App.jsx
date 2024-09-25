import { useState } from 'react'
import TableComponent from './TableComponent'
import data from '../data.json'
function App() {

  return (
    <>
      <TableComponent data={data} />
    </>
  )
}

export default App
