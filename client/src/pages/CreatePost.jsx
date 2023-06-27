import React, { useState } from 'react'
import {Formfield} from '../components/index'
import {surpriseMePrompts} from '../constants/index'
import {preview} from '../assets/index'
import {Loader} from '../components/index'
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form,setForm]=useState({name:"",searchedText:"",photo:""})
  const [generating,setGenrating]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  

  const handleSubmit = (e)=>{
      e.preventDefault();
  }
  const handleChange = (e)=>{
      const {name,value} = e.target;
      setForm({...form,[name]:value})
  }
  
  const handleSurprise = ()=>{
      const index = Math.floor(Math.random()*(surpriseMePrompts.length))
      const surprise=surpriseMePrompts[index]
      setForm({...form,searchedText:surprise})
  }

  const generateImg=async ()=>{
    setGenrating(true);
    try{
        const response = await fetch("http://localhost:8080/api/v1/dalle/generate",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({prompt:form.searchedText}),

        })
        const data=await response.json()
        console.log(data)
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
      }catch(err){
      alert(err+"smth in fetching");
      }finally{
        setGenrating(false)
      }

  }
  const share =async()=>{
       if(form.photo && form.searchedText && form.name) {
        try{
        const res= await fetch("http://localhost:8080/api/v1/post",{
          method:"POST",
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({...form}),
        })
        alert('success')
        navigate('/')
      }
       
      catch(err){
          console.log(`error at sharing image ${err.message}`)
        }
      }
      else{
        alert('Pls complete all the fields in the form')
      }
  }

  return (
    <div>
      <h2>Create</h2>
      <h6>Create creative and visuallt stunning images through Dall-E and share 
        them with the community</h6>
      <form onSubmit={handleSubmit}>
          <Formfield type='text'value={form.name} name='name' placeholder="John" handleChange={handleChange} />
          <button type='submit'>Prompt</button>
          <button onClick={handleSurprise}>Surprise Me</button>
  
          <Formfield type='text'value={form.searchedText} name='searchedText' placeholder="armchair in the shape of an avocado" handleChange={handleChange}/>
      
        
          { ! generating &&
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.searchedText}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
          </div>}
        
        {generating &&
            <div>
              <Loader/>
            </div>
        }
        
            <div>
              <button type='submit' className=' border border-1 border-black p-1 text-center bg-green-400 w-1/4 rounded-sm ' onClick={generateImg}>Generate</button>
              <p>share your outstanding Ai images with your friiends and community</p>
              <button className='border border-1 p-1 text-center w-1/4 rounded-sm bg-cyan-700 ' onClick={share}>Share With community</button>
            </div>
            
          
      </form>
    </div>

  )
}

