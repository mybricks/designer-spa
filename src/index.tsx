import {render} from 'react-dom'

import MyDesigner from "./MyDesigner";

const rootDom = document.createElement('div')
document.body.append(rootDom)
render(
  <MyApp/>, rootDom
)


export default function MyApp() {
  return (
    <>
      <div style={{
        padding: 50,
        fontSize: 30,
        fontWeight: 800,
        textAlign: 'center'
      }}>

        Mybricks-SPA-Designer
      </div>
      <MyDesigner/>
    </>
  )
}

