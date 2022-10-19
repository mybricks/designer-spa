import {createRoot} from 'react-dom/client'

import MyDesigner from "./MyDesigner";

const rootDom = document.createElement('div')
document.body.append(rootDom)
createRoot(rootDom).render(
  <MyApp/>
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

