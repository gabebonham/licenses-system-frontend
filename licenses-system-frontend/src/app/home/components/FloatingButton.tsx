'use client'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight } from 'lucide-react'
import React from 'react'

export default function FloatingButton({
  button,
}: {
  button: React.ReactNode
}) {
  return (
    <div className="min-xl:hidden w-full h-screen fixed inset-0 pt-54  ">
      {button}
    </div>
  )
}
