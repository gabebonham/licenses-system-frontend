'use client'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/logout'
import { usePathname } from 'next/navigation'
type ButtonColors = 'Action' | 'Option' | undefined
interface Props {
  label?: string
  color?: ButtonColors
  css?: string
  icon?: string
  submit?: boolean
  currentRef?: any
  inactive?: boolean
  logout?: boolean
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
  Option:
    'bg-blueLight text-blueDark hover:bg-blueDark hover:text-blueLight  border-blueDark border-1',
  Action:
    'bg-blueDark hover:bg-blueLight hover:text-blueDark text-blueLight border-1 border-blueDark border-1',
  default: 'bg-transparent',
}

export default function CustomButton(props: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const styleClasses = colorMap[props.color || 'default']
  const handleClick = () => {
    if (props.logout) {
      logout()
      if (pathname == '/home') {
        router.refresh()
      } else {
        router.push('/home')
      }
    }
    props.action ? props.action() : () => {}
    if (props.href) {
      if (props.href.startsWith('/')) {
        router.push(props.href)
      } else {
        router.push(props.href)
      }
    }
  }
  return (
    <Button
      ref={props.currentRef}
      type={props.submit ? 'submit' : 'button'}
      disabled={props.inactive == false}
      onClick={() => handleClick()}
      className={`cursor-pointer lg:rounded-xl flex items-center  justify-center w-full text-blueDark ${styleClasses}  ${props.css}`}
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
