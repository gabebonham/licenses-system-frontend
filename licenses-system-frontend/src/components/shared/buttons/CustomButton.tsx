'use client'

import { Button } from '@/components/ui/button'
type ButtonColors = 'Action' | 'Option' | undefined
interface Props {
  label: string
  color?: ButtonColors
  css?: string
  icon?: string
  submit?: boolean
}
export default function CustomButton(props: Props) {
  let styleColor = 'transparent'
  if (props.color == 'Action') styleColor = 'primary'
  if (props.color == 'Option') styleColor = 'secondary'
  if (props.icon)
    return (
      <Button
        type={`${props.submit ? 'submit' : 'button'}`}
        className={`bg-${styleColor} flex items-center justify-around w-full ${props.css}`}
      >
        <div>{props.icon}</div>
        <div>{props.label}</div>
      </Button>
    )
  else
    return (
      <Button
        type={`${props.submit ? 'submit' : 'button'}`}
        className={`bg-${styleColor} flex items-center justify-center w-full ${props.css}`}
      >
        <div>{props.label}</div>
      </Button>
    )
}
