/**
 * MyBricks Opensource
 * https://mybricks.world
 * This source code is licensed under the MIT license.
 *
 * CheMingjun @2019
 * mybricks@126.com
 */

import buttonDef from './button/com.json'
import buttonRT from './button/runtime'
import buttonEditors from './button/editors'


// import {T_XGraphComDef} from "@sdk";

const lib = {
  id: 'test.comlibs',
  title: '活动组件库',
  author: 'test',
  icon: '',
  version: '1.0.1',
  comAray: [
    merge({
      comDef: buttonDef,
      rt: buttonRT,
      editors: buttonEditors
    })
  ]
}

export default lib

export function getCom(namespace: string) {
  return lib.comAray.find(com => com.namespace === namespace)
}

function merge({
                 comDef,
                 icon,
                 rt,
                 rtEdit,
                 data,
                 editors,
                 assistence
               }: {
  comDef, icon?, rt?, data?, editors?, assistence?
}) {
  return Object.assign(comDef, {
    runtime: rt,
    icon: icon,
    'runtime.edit': rtEdit,
    data,
    editors,
    assistence
  })
}