'use client'
//imports from mui && firebase
import Image from "next/image";
import {useState,useEffect} from 'react'
import {firestore} from '@/firebase'
import {box, Typography } from "@mui/material";
import { collection, deleteDoc, getDocs, query, setDoc , doc } from "firebase/firestore";


export default function Home() {
  const [inventory,setInventory] = useState([])
  const [open,setOpen] = useState([False])
  const [itemName,setItemName] = useState([""])




  //updates inventory function
  const updateInventory =async()=>{
    const snapshot =query(collection(firestore,"inventory"))  
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name:doc.id,
        ...doc.data(),})

    })


    setInventory=inventoryList
    console.log(inventoryList)
  //add function
  const addItem = async (item) => {
    const docRef = doc(collection(firestore,'inventory'),item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data() 
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else{
      await setDoc(docRef,{quanitty: 1})
    }
    await updateInventory()
  }



  //remove function
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore,'inventory'),item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity == 1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quanitty-1})
      }
    }
    await updateInventory()
  }




  }
  useEffect(()=>{
    updateInventory()
  },[])




  return (
    <box>
      <Typography variant="h1"> inventory management </Typography>
      {
        inventory.forEach((item)=>{
          console.log(item)
          return( 
            <box>
              {item.name}
              {item.count}
            </box>
          )
        })
      }
    </box>
  )
}
