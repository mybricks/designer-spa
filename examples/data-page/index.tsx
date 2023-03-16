import {createRoot} from 'react-dom/client'

import MyDesigner from "./MyDesigner";

createRoot(document.querySelector('#root'))
  .render(<MyApp/>)

function MyApp() {
  return (
    <MyDesigner/>
  )
}