import React from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import{logo} from './assets'
import  {Home,CreatePost} from './pages/index'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
            <Link to='/'>
              <img src={logo} alt="logo" className='w-28 object-contain'/>
            </Link>
        
        <Link to='/create-post'>Create</Link>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create-post' element={<CreatePost/>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
      
    </div>
  )
}

export default App







