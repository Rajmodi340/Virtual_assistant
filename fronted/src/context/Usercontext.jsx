import React, { useEffect } from 'react'
import { createContext } from 'react';
import { useState } from 'react';
// import { useEffect } from 'react';
import axios from 'axios';
export const userDataContext=createContext()
function Usercontext({children}) {
  const serverUrl="http://localhost:6012"
  const [userData,setUserData]=useState(null)
  const [frontendImage,setFrontendImage]=useState(null)
       const [backendImage,setBackendImage]=useState(null)
       const [selectedImage,setSelectedImage]=useState(null)
  const handleCurrentUser=async ()=>{
    try{
      const response=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
      setUserData(response.data)
      console.log("current user data",response.data)
    }
    catch(error){
console.log("error in fetching current user",error)
    }
  }
  const getGeminiResponse=async(command)=>{
    try{
const response=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
return response.data
    }
    catch(error){
      console.log("error in getting gemini response",error)
    }
  }
  useEffect(()=>{
    handleCurrentUser()
  },[])
  const value={
serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
  }
  return (
    <div>
      <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default Usercontext
