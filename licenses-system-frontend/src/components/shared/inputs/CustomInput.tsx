'use client'

import { Input } from '@/components/ui/input'
import { Eye, EyeClosed, icons } from 'lucide-react'
import { useState } from 'react'
type inpType = 'text' | 'password'
interface Props {
  placeholder?: string
  icon?: string
  css?: string
  name?: string
  type: inpType
}
export default function CustomInput(props: Props) {
  const [flag, toggle] = useState<boolean>(true)
  let IconComponent
  if (props.icon) {
    IconComponent = (icons as any)[props.icon]
  }
  if (props.type == 'text') {
    return (
      <div className="border-black border-1 rounded-md flex items-center px-2 transition-all duration-200 focus-within:border-gray-400">
        <Input
          type="text"
          className={`border-transparent shadow-none ${props.css}`}
          placeholder={props.placeholder}
          name={props.name}
        />
        {props.icon && <IconComponent className="size-5" />}
      </div>
    )
  }
  if (props.type == 'password') {
    return (
      <div className="border-black border-1 rounded-md flex items-center px-2 transition-all duration-200 focus-within:border-gray-400">
        <Input
          type={`${flag ? 'text' : 'password'}`}
          className={`border-transparent shadow-none ${props.css}`}
          placeholder={props.placeholder}
          name={props.name}
        />
        <div onClick={() => toggle(!flag)} className="cursor-pointer">
          {flag ? <Eye className="size-5" /> : <EyeClosed className="size-5" />}
        </div>
      </div>
    )
  }
}
