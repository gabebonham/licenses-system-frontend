'use client'

import { Input } from '@/components/ui/input'
import { Eye, EyeClosed, icons } from 'lucide-react'
import { InputHTMLAttributes, useRef, useState } from 'react'
import CustomButton from '../buttons/CustomButton'
import { uploadFile } from '@/app/admin/actions/experts.service'
type inpType = 'text' | 'password' | 'file' | 'automatedFile'
interface Props {
  placeholder?: string
  icon?: string
  css?: string
  name?: string
  action?: () => void
  ref?: any
  inputId?: string
  type: inpType
}
export default function CustomInput(props: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [flag, toggle] = useState<boolean>(false)
  let IconComponent
  const clickHandler = () => {
    fileInputRef.current?.click()
  }
  if (props.icon) {
    IconComponent = (icons as any)[props.icon]
  }
  if (props.type == 'text') {
    return (
      // <div className=" border-dark/50 border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff]">
      <Input
        type="text"
        className={`border-transparent text-blueLight p-0 pl-2 pb-1 shadow-none border-dark/50 border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff] ${props.css}`}
        placeholder={props.placeholder}
        name={props.name}
      />
      //   {props.icon && <IconComponent className="size-5 text-blueLight" />}
      // </div>
    )
  }
  if (props.type == 'password') {
    return (
      <div className=" border-blueLight/50 border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff]">
        <Input
          type={`${flag ? 'text' : 'password'}`}
          className={`border-transparent text-blueLight p-0 pl-2 pb-1  shadow-none ${props.css}`}
          placeholder={props.placeholder}
          name={props.name}
        />
        <div onClick={() => toggle(!flag)} className="cursor-pointer">
          {flag ? (
            <Eye className="size-5 text-blueLight" />
          ) : (
            <EyeClosed className="size-5 text-blueLight" />
          )}
        </div>
      </div>
    )
  }
  if (props.type == 'file') {
    return (
      <div className="  border-blueLight/50 border-1 pl-2 rounded-md flex items-center pr-2 pt-2 lg:pt-4 transition-all  duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff]">
        <Input
          type={`file`}
          className={`cursor-pointer border-transparent  text-blueLight p-0 lg:h-12 lg:pb-1 w-full shadow-none ${props.css}`}
          placeholder={props.placeholder}
          name={props.name}
        />
      </div>
    )
  }
  if (props.type == 'automatedFile') {
    return (
      <form action={uploadFile}>
        <CustomButton
          label={props.placeholder}
          action={() => fileInputRef.current?.click()}
          color="Action"
          submit
          css="w-fit"
          currentRef={btnRef}
        />
        <input hidden value={props.inputId} name="id" />
        <Input
          type={`file`}
          className="hidden"
          name={props.name}
          ref={fileInputRef}
          onChange={() => btnRef?.current?.click()}
        />
      </form>
    )
  }
}
