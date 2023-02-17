import {render} from 'react-dom'

import MyDesigner from "./MyDesigner";

render(
  <MyApp/>, document.querySelector('#root')
)

function MyApp() {
  return (
    <MyDesigner/>
  )
}