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
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { toast } from 'sonner'
import { editUser } from '@/app/admin/actions/users.service'
import { createRating } from '../actions/ratings.service'
import { Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
function VoteComponent({
  vote,
  setVote,
}: {
  vote: number
  setVote: (value: number) => void
}) {
  return (
    <div className="flex items-center flex gap-x-2">
      <div className="flex items-center">
        <Checkbox
          className="size-7 border-dark p-0 m-0 data-[state=checked]:bg-transparent flex items-center justify-center"
          checked={
            vote == 20 || vote == 40 || vote == 60 || vote == 80 || vote == 100
          }
          onCheckedChange={() => setVote(20)}
        >
          <Star
            fill="currentColor"
            fillRule="inherit"
            className={`size-6 transition-colors ${
              vote == 20 ||
              vote == 40 ||
              vote == 60 ||
              vote == 80 ||
              vote == 100
                ? 'text-yellow-500'
                : 'text-dark'
            }`}
          />
        </Checkbox>
        <Checkbox
          className="size-7 border-dark p-0 m-0 data-[state=checked]:bg-transparent flex items-center justify-center"
          checked={vote == 40 || vote == 60 || vote == 80 || vote == 100}
          onCheckedChange={() => setVote(40)}
        >
          <Star
            fill="currentColor"
            fillRule="inherit"
            className={`size-6 transition-colors ${
              vote == 40 || vote == 60 || vote == 80 || vote == 100
                ? 'text-yellow-500'
                : 'text-dark'
            }`}
          />
        </Checkbox>
        <Checkbox
          className="size-7 border-dark p-0 m-0  data-[state=checked]:bg-transparent flex items-center justify-center"
          checked={vote == 60 || vote == 80 || vote == 100}
          onCheckedChange={() => setVote(60)}
        >
          <Star
            fill="currentColor"
            fillRule="inherit"
            className={`size-6 transition-colors ${
              vote == 60 || vote == 80 || vote == 100
                ? 'text-yellow-500'
                : 'text-dark'
            }`}
          />
        </Checkbox>
        <Checkbox
          className="size-7 border-dark data-[state=checked]:bg-transparent p-0 m-0 flex items-center justify-center"
          checked={vote == 80 || vote == 100}
          onCheckedChange={() => setVote(80)}
        >
          <Star
            fill="currentColor"
            fillRule="inherit"
            className={`size-6 transition-colors ${
              vote == 80 || vote == 100 ? 'text-yellow-500' : 'text-dark'
            }`}
          />
        </Checkbox>
        <Checkbox
          className="size-7 border-dark p-0 m-0 flex data-[state=checked]:bg-transparent items-center justify-center"
          checked={vote == 100}
          onCheckedChange={() => setVote(100)}
        >
          <Star
            fill="currentColor"
            fillRule="inherit"
            className={`size-6 transition-colors ${
              vote == 100 ? 'text-yellow-500' : 'text-dark'
            }`}
          />
        </Checkbox>{' '}
      </div>
    </div>
  )
}
export default function VoteProfileModalButton({
  userId,
  expertId,
  copyId,
}: {
  userId: string
  expertId?: string
  copyId?: string
}) {
  const [value, setValue] = useState<number>(0)
  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const handleSubmit = async (formData: FormData) => {
    if (formData.has('description')) {
      const description = formData.get('description')
      setError(undefined)
      await createRating(
        userId,
        description?.valueOf() as string,
        value,
        expertId,
        copyId,
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
          label="Avaliar"
          color="Option"
          css="w-full py-5 lg:rounded-lg lg:px-6 lg:text-xl"
        />
      </DialogTrigger>
      <DialogContent className=" h-fit  min-w-5/12 w-full p-2 lg:p-6 z-90  bg-grayLight border-dark rounded-2xl ">
        <DialogTitle className="lg:text-4xl lg:w-full font-medium text-center">
          Avaliar
        </DialogTitle>{' '}
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
                      <span className="font-medium"> Descrição:</span>
                      <span>
                        <textarea
                          name="description"
                          className="border-dark text-dark lg:text-xl lg:h-10"
                        />
                      </span>
                    </p>
                    <p className="w-full flex justify-between items-center">
                      <span className="font-medium"> Estrelas:</span>
                      <span>
                        <VoteComponent vote={value} setVote={setValue} />
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
