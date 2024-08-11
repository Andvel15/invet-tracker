'use client'
//imports from mui && firebase
import Image from "next/image";
import {useState,useEffect} from 'react'
import {firestore} from "@/firebase"
import {Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, getDocs, query, setDoc , doc } from "firebase/firestore";


export default function Home() {


  //constants
  const [inventory,setInventory] = useState([])
  const [open,setOpen] = useState(true)
  const [itemName,setItemName] = useState([""])




  //updates inventory function and or fetch
  const updateInventory =async()=>{
    const snapshot =query(collection(firestore,"inventory"))  
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name:doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  


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




  useEffect(()=>{
    updateInventory()
  },[])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  return (
    <Box width="100vw" 
        height = "100vh"
        display = "flex" 
        justifyContent="center " 
        alignItems="center" 
        gap={3}>
      <Modal open={open} onClose={handleClose}>
        <Box 
          position={"absolute"} 
          top="50%" 
          left="50%" 
          width={400} 
          bgcolor={"white"} 
          border={"2px solid #000"}
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          sx={{transform: 'translate(-50%,-50%)',}}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width={"100%"} direction={"row"} spacing={1} >
            <TextField
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e)=>{setItemName(e.target.value)}}

            ></TextField>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1"> inventory management </Typography>
      {
        inventory.forEach((item)=>{
          console.log(item)
          return( 
            <Box>
              {item.name}
              {item.count}
            </Box>
          )
        })
      }
    </Box>
  )
}
