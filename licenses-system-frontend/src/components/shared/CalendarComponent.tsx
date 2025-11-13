'use client'

import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'

export function CalendarComponent({
  selected,
  onSelect,
}: {
  selected: Date | undefined
  onSelect: (value: Date | undefined) => void
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm border-dark bg-grayLight"
      captionLayout="dropdown"
    />
  )
}
