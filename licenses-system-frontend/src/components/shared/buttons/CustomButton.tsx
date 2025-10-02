'use client'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
type ButtonColors = 'Action' | 'Option' | undefined
interface Props {
  label?: string
  color?: ButtonColors
  css?: string
  icon?: string
  submit?: boolean
  currentRef?: any
  inactive?: boolean
  href?: string
  action?: () => void
}
function getLucideIcon(name?: string, size = 20) {
  if (!name) return null
  const Icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<any>
  >
  const Icon = Icons[name]
  return Icon ? <Icon size={size} className="lg:size-8 pt-1" /> : null
}
const colorMap = {
  Action: 'bg-blueLight hover:bg-blueLight',
  Option:
    'bg-primary hover:bg-primary text-blueLight border-1 border-blueLight',
  default: 'bg-transparent',
}

export default function CustomButton(props: Props) {
  const router = useRouter()
  const styleClasses = colorMap[props.color || 'default']
  const handleClick = () => {
    props.action ? props.action() : () => {}
    props.href ? router.push(props.href) : () => {}
  }
  return (
    <Button
      ref={props.currentRef}
      type={props.submit ? 'submit' : 'button'}
      disabled={props.inactive == false}
      onClick={() => handleClick()}
      className={`cursor-pointer rounded-3xl flex items-center  justify-center w-full text-primary ${styleClasses} hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.4)] ${props.css}`}
    >
      {props.label && <div>{props.label}</div>}
      {props.icon && (
        <div className={`${props.label && 'ml-2'}`}>
          {getLucideIcon(props.icon)}
        </div>
      )}
    </Button>
  )
}
