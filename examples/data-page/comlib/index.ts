/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */

import dsDef from './datasource/com.json'
import dsRt from './datasource/runtime'

import pieDef from './pie/com.json'
import pieRt from './pie/runtime'
import pieData from './pie/data.json'

import tabsDef from './tabs/com.json'
import tabsRt from './tabs/runtime'


const lib = {
  id: 'mybricks-basic-comlib',
  title: '基础组件库',
  author: 'CheMingjun',
  version: '1.0.1',
  comAray: [
    merge({
      comDef: dsDef,
      rt: dsRt
    }),
    merge({
      comDef: pieDef,
      data: pieData,
      rt: pieRt
    }),
    merge({
      comDef: tabsDef,
      rt: tabsRt
    }),
  ]
}

export default lib

//-----------------------------------------------------------------

function merge({
                 comDef,
                 icon,
                 rt,
                 data
               }: { comDef, icon?, rt?, data? }) {
  return Object.assign(comDef, {
    runtime: rt,
    icon: icon,
    data
  })
}