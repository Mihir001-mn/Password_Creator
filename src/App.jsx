import React from 'react'
import { useState, useCallback,useEffect,useRef  } from 'react'
const App = () => {
  const [lenght, setLenght] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const inputref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += '0123456789'
    if (character) str += "`~!@#$%^&*(){}[]"

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [lenght, number, character, setPassword])
  
  useEffect(()=>{
    passwordGenerator()
  },[lenght,number,character,passwordGenerator])

  const selectInput = useCallback(()=>{
    console.log("button Clicked")
    inputref.current?.select();
    window.navigator.clipboard.writeText(password)
    inputref.current?.select();
  },[password])

  return (
    <div className='h-screen bg-black flex justify-center items-center'>
      <div className='w-[80%] p-6 flex flex-col gap-3  bg-blue-400 rounded-2xl'>
        <div className='flex bg-white rounded-xl'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            className='outline-none py-1 px-2 w-[90%]'
            ref={inputref}
            readOnly />
          <button
            className='bg-amber-300 w-[10%] rounded-r-xl px-3 text-xl' onClick={selectInput}>Copy</button>
        </div>
        <div className='flex justify-between'>

          <div className='flex gap-2'>
            <input
              type="range"
              min={6}
              max={100}
              value={lenght}
              className='cursor-pointer'
              onChange={(e) => {
                setLenght(e.target.value)
              }} />
            <label className='text-white' >length : {lenght}</label>
          </div>

          <div className='flex gap-2'>
            <input
              type="checkbox"
              className='outline-none cursor-pointer' 
              value={number} 
              onChange={()=>{ setNumber((prev)=> !prev)}} />
            <label className='text-white'>Number</label>
          </div>

          <div className='flex gap-2'>
            <input type="checkbox"
              className='outline-none cursor-pointer'
              value={character} 
              onChange={()=>{ setCharacter((prev)=> !prev)}} />
            <label className='text-white' >Character</label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
