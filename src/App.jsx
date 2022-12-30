import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import {motion} from 'framer-motion'

function App() {
  const [count, setCount] = useState([])
  const [change, setChange] = useState(6)
useEffect(()=>{
const InitialData=async ()=>{
  const data = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=${change}&currency=EUR`).then(res=>res.json())
  const data2 = await fetch(`https://api.coinstats.app/public/v1/charts?period=1m&coinId=ethereum  `).then(res=>res.json())
  setCount(data.coins);
}
InitialData();
},[change])
console.log(count)
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-2">
      
      <motion.h2  animate={{opacity:1,scale:1.7}} transition={{duration:0.5}}
      
      
      className='text-3xl text-center pt-10 italic font-semibold  text-blue-600'>Crypto APP</motion.h2>
    <section className='flex flex-col gap-2 w-4/5'>
     
    <div className='  flex  w-60 mt-10  p-4 border-2 border-slate-500  rounded-full self-center lg:self-end text-center justify-center items-center text-sm shadow-sm'>
      <button onClick={()=>setChange('30')} className="hover:font-semibold    h-full  w-full text-slate-800  border-r border-slate-600 px-4 ">1 D</button>

      <button onClick={()=>setChange('10')} className="hover:font-semibold   w-full text-slate-800   border-r border-slate-600 px-4 ">3 M</button>
        <button onClick={()=>setChange('15')} className="hover:font-semibold  w-full text-slate-800 px-4 ">6 M</button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full  gap-20 mt-4 '>
       
        {count.map((e)=>{
          return(
            <motion.div  
            
            initial={{opacity:0, scale:0.3}} animate={{opacity:1,scale:1}} transition={{duration:0.5,delay:0}}
           
            
            key={e.id} className="bg-gray-100 m-2 p-4 w-full h-full flex flex-col rounded-2xl">
             <div className='flex  justify-between items-center'>
              <h2 className='text-lg font-semibold'>{e.name}</h2>
              <img src={e.icon} className="w-10"/>
            </div>
            <div className='flex gap-2'>
              <p className='text-gray-500 text-xl py-2 font-semibold '>{e.price >10? e.price.toFixed(2) : e.price.toFixed(6)} $</p>
              <span className={`${e.priceChange1d>0? 'text-green-500' :'text-red-500'} text-sm`}>{e.priceChange1d} %</span>
              </div>
              <button className='bg-white hover:text-slate-700 p-1  mt-auto self-end border-2 border-gray-400 text-slate-600 rounded-3xl px-4 hover:animate-bounce'>Read More </button>
              </motion.div>
          )
        })}
      </div>
      </section>
      {count.length> 3 && <div className='flex   text-sm justify-between p-10  w-full gap-4'>
       {change>6? <button onClick={()=>setChange(prev=>prev-=10)} className="bg-slate-100 p-4 rounded-xl px-8 text-slate-800  "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg> </button> : <div></div>}
      { change>16?  <button  onClick={()=>setChange(6)} className="bg-slate-100 p-4 rounded-xl px-8 text-slate-800  ">Resete</button> : <div></div>}
      <button onClick={()=>setChange(prev=>prev+=10)} className="bg-slate-100 p-4 rounded-xl px-8 text-slate-800  rotate-180"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg> </button>
      

      </div>}
    </div>
  )
}


export default App
