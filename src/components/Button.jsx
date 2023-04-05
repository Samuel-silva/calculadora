import React from "react"
import './Button.css'

export default function Button(props) {
  const { label, click = e => e } = props
  let classeCss = 'button'
  classeCss += props.double ? ' double' : ''
  classeCss += props.triple ? ' triple' : ''
  classeCss += props.operation ? ' operation' : ''

  return (
    <button
      onClick={e => click(label)}
      className={classeCss}
    >
      {label}
    </button>
  )
}
