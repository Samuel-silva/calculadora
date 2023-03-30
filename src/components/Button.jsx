import React from "react"
import './Button.css'

export default function Button(props) {
    const { label } = props
    let classeCss = 'button'
    classeCss += props.double ? ' double' : ''
    classeCss += props.triple ? ' triple' : ''
    classeCss += props.operation ? ' operation' : ''

    return (
        <button className={classeCss}>{ label }</button>
    )
}