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
import { createProducts } from '../actions/products.service'
import { toast } from 'sonner'

export default function CreateProductModalButton({ btn }: { btn: any }) {
  const [targetButton, setTargetButton] = useState<undefined | number>()
  const [targetTimeButton, setTargetTimeButton] = useState<undefined | number>()
  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const handleCreateProduct = async (formData: FormData) => {
    if (
      !formData.has('name') ||
      !formData.has('price') ||
      !formData.has('maxVolume') ||
      !formData.has('lastLinkName') ||
      !formData.has('webHookToken') ||
      !formData.has('checkoutLink') ||
      !formData.has('expertId')
    ) {
      setError('Verifique os valores e tente novamente')
      return
    }
    const res = await createProducts(
      formData.get('name')?.valueOf() as string,
      formData.get('price')?.valueOf() as number,
      formData.get('maxVolume')?.valueOf() as number,
      formData.get('expertId')?.valueOf() as string,
      formData.get('lastLinkName')?.valueOf() as string,
      formData.get('webHookToken')?.valueOf() as string,
      formData.get('checkoutLink')?.valueOf() as string,
    )

    if (res.success) {
      setError(undefined)
      activate(false)
      toast('Atualize a página')
    } else {
      setError(
        `Erro ao criar produto, verifique se o Id do expert esta correto`,
      )
    }
  }
  return (
    <Dialog open={isActive} onOpenChange={activate}>
      <DialogTrigger className="w-full">{btn}</DialogTrigger>
      <DialogContent className=" h-3/4 text-dark border-dark bg-grayLight  min-w-5/12  p-2 lg:p-6 z-90   ">
        <DialogTitle className="lg:text-4xl lg:w-full font-medium text-center">
          Criar Produto
        </DialogTitle>
        <ScrollArea className="lg:flex-row  min-h-8/12 h-full  w-full flex flex-col items-center">
          <div className="text-dark  lg:flex-row h-full   lg:max-w-full w-full flex flex-col items-center lg:items-start gap-y-3">
            <div className=" lg:px-6 flex items-center h-full  flex-col gap-y-2 py-3 lg:gap-y-2 lg:w-full   ">
              <form
                action={handleCreateProduct}
                className="lg:px-0 text-xs lg:text-lg w-full max-w-96 lg:max-w-full  rounded-2xl lg:p-6 p-2 pb-0 lg:pb-0  flex flex-col "
              >
                {error && (
                  <p className="text-center text-red-400 mb-4">{error}</p>
                )}
                <div className="flex  justify-between w-full gap-x-8">
                  <div className="flex flex-col gap-y-4 xl:gap-y-6 w-full  ">
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Nome:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="name"
                          type="text"
                          css="text-dark  border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Preço:</span>
                      <span>
                        <CustomInput
                          name="price"
                          type="text"
                          css="text-dark  border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Volume Máximo:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="maxVolume"
                          type="text"
                          css="text-dark  border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Id do Expert:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="expertId"
                          type="text"
                          css="text-dark  border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Token do WebHook:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="webHookToken"
                          type="text"
                          css="text-dark  border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Nome Last Link:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="lastLinkName"
                          type="text"
                          css="text-dark  border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Link para Checkout:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="checkoutLink"
                          type="text"
                          css="text-dark  border-dark"
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
                      label="Criar"
                      css="lg:text-2xl lg:py-8 rounded-2xl w-fit  px-12"
                      color="Action"
                      submit
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
