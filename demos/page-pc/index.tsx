import {render} from 'react-dom'

import App from "./App";

render(
  <MyApp/>, document.querySelector('#root')
)

function MyApp() {
  return (
    <App/>
  )
}