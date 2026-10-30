'use client';

import { Button } from "@/components/ui/button";

export default function AutoMobilesPage() {
  const handleAlert = ()=> {
    console.log("Logged...")
    alert("Alert MEssage...")
  }
  return <Button onClick={handleAlert}>About</Button>
}