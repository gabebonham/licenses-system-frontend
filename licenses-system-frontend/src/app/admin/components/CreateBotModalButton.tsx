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

export default function CreateBotModalButton({ btn }: { btn: any }) {
  const [targetButton, setTargetButton] = useState<undefined | number>()
  const [targetTimeButton, setTargetTimeButton] = useState<undefined | number>()
  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const handleCreateExpert = async (formData: FormData) => {
    if (!formData.has('name') || !formData.has('description')) {
      setError('Verifique os dados e tente novamente')
    } else {
      setError(undefined)
      if (formData.has('image')) {
        await createExpert(
          formData.get('name')?.valueOf() as string,
          formData.get('description')?.valueOf() as string,
          formData.get('magic')?.valueOf() as string,
          formData.get('initAmount')?.valueOf() as string,
          formData.get('caracteristics')?.valueOf() as string,
          date,
          formData.get('image')?.valueOf() as File,
        )
      } else {
        await createExpert(
          formData.get('name')?.valueOf() as string,
          formData.get('description')?.valueOf() as string,
          formData.get('magic')?.valueOf() as string,
          formData.get('initAmount')?.valueOf() as string,
          formData.get('caracteristics')?.valueOf() as string,
          date,
        )
      }
      toast('Atualize a paginá')
    }
  }
  return (
    <Dialog open={isActive} onOpenChange={activate}>
      <DialogTrigger className="w-full">{btn}</DialogTrigger>
      <DialogContent className=" h-9/12 text-dark border-dark bg-grayLight min-w-5/12 w-full p-2 lg:p-6 z-90   ">
        <DialogTitle className="lg:text-4xl lg:w-full font-medium text-center">
          Criar Expert
        </DialogTitle>
        <ScrollArea className="lg:flex-row  min-h-8/12 h-full  w-full flex flex-col items-center">
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
                      <span className="font-bold"> Nome:</span>
                      <span>
                        {' '}
                        <CustomInput
                          name="name"
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
                      <span className="font-bold"> Magic:</span>
                      <span>
                        <CustomInput
                          name="magic"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Capital Inicial:</span>
                      <span>
                        <CustomInput
                          name="initAmount"
                          type="text"
                          css="text-dark border-dark"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Data de Início:</span>
                      <span>
                        {' '}
                        <CalendarComponent selected={date} onSelect={setDate} />
                      </span>
                    </p>

                    <p className="w-full flex justify-between">
                      <span className="font-bold">
                        {' '}
                        Caracteristicas (separar por virgula):
                      </span>
                      <span>
                        <CustomInput name="caracteristics" type="text" />
                      </span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Imagem:</span>
                      <span>
                        <Input
                          name="image"
                          type="file"
                          accept=".jpg,.jpeg,.png"
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
