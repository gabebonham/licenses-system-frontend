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
import { Product } from '@/entities/product.entity'
import { toast } from 'sonner'
import { editUser } from '@/app/admin/actions/users.service'

export default function EditProfileModalButton({ userId }: { userId: string }) {
  const [targetButton, setTargetButton] = useState<undefined | number>()
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const handleSubmit = async (formData: FormData) => {
    if (
      formData.has('name') &&
      formData.has('accountNumber') &&
      formData.has('email')
    ) {
      const name = formData.get('name')
      const accoutNumber = formData.get('accountNumber')
      const email = formData.get('email')
      setError(undefined)
      await editUser(
        userId,
        name?.valueOf() as string,
        email?.valueOf() as string,
        accoutNumber?.valueOf() as string,
      )
      activate(false)
      toast('Atualize a página')
    } else {
      setError('Verifique os dados e tente novamente.')
    }
  }
  return (
    <Dialog open={isActive} onOpenChange={activate}>
      <DialogTrigger asChild>
        <CustomButton
          action={() => activate(true)}
          label="Editar Dados"
          color="Option"
          css="w-1/3 lg:py-6 lg:text-xl"
        />
      </DialogTrigger>
      <DialogContent className=" h-fit  min-w-5/12 w-full p-2 lg:p-6 z-90  bg-grayLight border-dark rounded-2xl ">
        <DialogTitle className="lg:text-4xl lg:w-full font-medium text-center">
          Editar Perfil
        </DialogTitle>
        <ScrollArea className="lg:flex-row  min-h-8/12 h-full  w-full flex flex-col items-center">
          <div className="text-dark  lg:flex-row h-full   lg:max-w-full w-full flex flex-col items-center lg:items-start gap-y-3">
            <div className=" lg:px-6 flex items-center h-full  flex-col gap-y-2  lg:gap-y-2 lg:w-full   ">
              <form
                action={handleSubmit}
                className="lg:px-0 text-xs lg:text-2xl w-full max-w-96 lg:max-w-full  rounded-2xl lg:p-6 p-2 pb-0 lg:pb-0  flex flex-col "
              >
                <div className="flex  justify-between w-full gap-x-8">
                  <div className="flex flex-col gap-y-4 xl:gap-y-6 w-full  ">
                    <p>{error && error}</p>
                    <p className="w-full flex justify-between items-center">
                      <span className="font-medium"> Nome:</span>
                      <span>
                        <CustomInput
                          name="name"
                          type="text"
                          css="border-dark text-dark lg:text-xl lg:h-10"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between items-center ">
                      <span className="font-medium"> Email:</span>
                      <span>
                        <CustomInput
                          name="email"
                          type="text"
                          css="border-dark text-dark lg:text-xl lg:h-10"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between items-center">
                      <span className="font-medium"> Número de Conta:</span>
                      <span>
                        <CustomInput
                          name="accountNumber"
                          type="text"
                          css="border-dark text-dark lg:text-xl lg:h-10"
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
                      label="Editar"
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
