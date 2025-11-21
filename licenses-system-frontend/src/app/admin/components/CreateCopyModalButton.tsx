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
import { Label } from '@/components/ui/label'
import { CalendarComponent } from '@/components/shared/CalendarComponent'
import { createExpert } from '../actions/experts.service'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { createCopy } from '../actions/copies.service'

export default function CreateCopyModalButton({ btn }: { btn: any }) {
  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const handleCreateExpert = async (formData: FormData) => {
    if (
      !formData.has('magicNumber') ||
      !formData.has('title') ||
      !formData.has('description') ||
      !formData.has('caracteristics') ||
      !formData.has('broker') ||
      !formData.has('openAccountLink') ||
      !formData.has('performance') ||
      !formData.has('minimumCapital') ||
      !formData.has('link') ||
      !formData.has('type') ||
      !formData.has('image')
    ) {
      setError('Verifique os dados e tente novamente')
    } else {
      setError(undefined)
      await createCopy(
        formData.get('magicNumber')?.valueOf() as string,
        formData.get('title')?.valueOf() as string,
        formData.get('description')?.valueOf() as string,
        formData.get('caracteristics')?.valueOf() as string,
        formData.get('broker')?.valueOf() as string,
        formData.get('openAccountLink')?.valueOf() as string,
        formData.get('performance')?.valueOf() as string,
        formData.get('minimumCapital')?.valueOf() as string,
        formData.get('link')?.valueOf() as string,
        formData.get('type')?.valueOf() as string,
        formData.get('image')?.valueOf() as File,
      )
      toast('Atualize a paginá')
    }
  }
  return (
    <Dialog open={isActive} onOpenChange={activate}>
      <DialogTrigger className="w-full">{btn}</DialogTrigger>
      <DialogContent className=" h-3/4 border-dark bg-grayLight min-w-5/12 w-full p-2 lg:p-6 z-90   ">
        <DialogTitle className="lg:text-4xl lg:w-full font-medium text-center">
          Criar Copy
        </DialogTitle>
        <ScrollArea className="lg:flex-row   min-h-8/12 h-full  w-full flex flex-col items-center">
          <div className="text-dark  lg:flex-row h-full   lg:max-w-full w-full flex flex-col items-center lg:items-start gap-y-3">
            <div className=" lg:px-6 flex items-center h-full  flex-col gap-y-2 py-3 lg:gap-y-2 lg:w-full   ">
              <form
                action={handleCreateExpert}
                className="lg:px-0 text-xs lg:text-lg w-full max-w-96 lg:max-w-full  rounded-2xl lg:p-6 p-2 pb-0 lg:pb-0  flex flex-col "
              >
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex  justify-between w-full gap-x-8">
                  <div className="flex flex-col gap-y-4 xl:gap-y-6 w-full  ">
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Titulo:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="title"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Link:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="link"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Número Mágico:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="magicNumber"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Link Abertura Conta:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="openAccountLink"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Performance:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="performance"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Description:</span>
                      <span>
                        <CustomInput
                          name="description"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Tipo de Conta:</span>
                      <span>
                        <CustomInput
                          name="type"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Corretora:</span>
                      <span>
                        <CustomInput
                          name="broker"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Capital Inicial:</span>
                      <span>
                        <CustomInput
                          name="minimumCapital"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Imagem:</span>
                      <span>
                        <CustomInput
                          name="image"
                          type="file"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold">
                        {' '}
                        Características (Separe por Vírgula):
                      </span>
                      <span>
                        {' '}
                        <textarea
                          name="caracteristics"
                          className=" p-2 max-w-45 text-dark rounded-lg min-h-34 border-1 border-dark border-1 rounded-md flex items-center pr-2 transition-all duration-200 focus-within:shadow-[0_0_05px_0_#a7e6ff] "
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
