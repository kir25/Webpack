import React, { useEffect } from 'react'

export default function Picker(props) {
    const { value, onChange, onClick, onBlur, options } = props
    return (
        <select
            id="sel"
            onClick={onClick}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            value={value}
        >
            {options.map(option => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
