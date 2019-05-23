import React from 'react'
import {Icon} from 'antd'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1201359_cnh7t2zaj5l.js', // 在 iconfont.cn 上生成
});
export default function (props) {
  const type = props.type;
  return (
    <IconFont {...props} type={`icon-${type}`} />
  )
}
