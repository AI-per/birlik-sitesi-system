"use client"

import { useState } from "react"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Blok adı boş olamaz.",
  }),
})

export function CreateBlockDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLo\
