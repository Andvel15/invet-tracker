'use client'
import Image from "next/image";
import {useState,useEffect} from 'react'
import {firestore} from '@/firebase'
import { box,Typography } from "@mui/material";

export default function Home() {
  return (
    <box>
      <Typography variant="h1"> inventory management </Typography>
    </box>
  )
}
