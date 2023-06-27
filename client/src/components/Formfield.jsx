import React from 'react'

export default function Formfield ({type,value,name,placeholder,handleChange}) {
  return (
    <div>
          <label for={name}>name </label>
          <input type={type} value={value} name={name} id={name} placeholder={placeholder} className='outline w-1/5 ' onChange={handleChange} />  
    </div>
  )
}

 