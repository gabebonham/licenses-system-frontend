'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import grapMock from '@/../public/images/mockGraph.png'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { Switch } from '@/components/ui/switch'
import { createUser } from '../actions/users.service'
import { toast } from 'sonner'

export default function CreateUserModalButton({ btn }: { btn: any }) {
  const [targetButton, setTargetButton] = useState<undefined | number>()
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const role = isAdmin ? 'admin' : 'user'
    if (name && email && password && role) {
      setError(undefined)
      await createUser(
        name.valueOf() as string,
        password.valueOf() as string,
        email.valueOf() as string,
        role.valueOf() as string,
      )
      toast('Atualize a página')
    } else {
      setError('Verifique os dados e tente novamente.')
    }
  }
  return (
    <Dialog open={isActive} onOpenChange={activate}>
      <DialogTrigger className="w-full">{btn}</DialogTrigger>
      <DialogContent className=" h-9/12  min-w-5/12 w-full p-2 lg:p-6 z-90   ">
        <ScrollArea className="lg:flex-row  min-h-8/12 h-full  w-full flex flex-col items-center">
          <div className="text-blueLight  lg:flex-row h-full   lg:max-w-full w-full flex flex-col items-center lg:items-start gap-y-3">
            <div className=" lg:px-6 flex items-center h-full  flex-col gap-y-2 py-3 lg:gap-y-2 lg:w-full   ">
              <form
                action={handleSubmit}
                className="lg:px-0 text-xs lg:text-lg w-full max-w-96 lg:max-w-full  rounded-2xl lg:p-6 p-2 pb-0 lg:pb-0  flex flex-col "
              >
                <div className="flex  justify-between w-full gap-x-8">
                  <div className="flex flex-col gap-y-4 xl:gap-y-6 w-full  ">
                    <p>{error && error}</p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Nome:</span>
                      <span>
                        {' '}
                        <CustomInput name="name" type="text" />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Email:</span>
                      <span>
                        <CustomInput name="email" type="text" />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Senha:</span>
                      <span>
                        {' '}
                        <CustomInput name="password" type="text" />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold">
                        {' '}
                        {isAdmin ? 'admin' : 'user'}
                      </span>
                      <span>
                        {' '}
                        <Switch
                          checked={isAdmin}
                          onCheckedChange={setIsAdmin}
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full flex gap-y-4  lg:flex-row flex-col items-center justify-between py-8 gap-x-24  ">
                  <div className="flex items-cetner gap-x-4">
                    <CustomButton
                      label="Cancelar"
                      action={() => activate(false)}
                      css="lg:text-2xl lg:py-8 rounded-2xl w-fit  px-8"
                      color="Option"
                    />
                    <CustomButton
                      submit
                      label="Criar"
                      css="lg:text-2xl lg:py-8 rounded-2xl w-fit  px-12"
                      color="Action"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
