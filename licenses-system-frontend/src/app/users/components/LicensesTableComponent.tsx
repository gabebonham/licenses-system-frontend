'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Expert } from '@/entities/expert.entity'
import { License } from '@/entities/license.entity'
import { User } from '@/entities/user.entity'
import { handleDownload } from '@/lib/download-util'
import { Star } from 'lucide-react'
import { useState } from 'react'
import VoteProfileModalButton from './VoteModalButton'

export function LicensesTableComponent({
  licenses,
  user,
}: {
  licenses: License[]
  user: User | undefined
}) {
  const handler = async (expert: Expert) => {
    try {
      const finalName = expert.fileContentUrl?.split('/').pop() as string
      // Call the backend endpoint to download the file
      const response = await fetch(`/api/download/${expert.id}`, {
        method: 'POST',
        body: JSON.stringify({ name: finalName }),
      })

      if (!response.ok) {
        throw new Error('Error fetching the file')
      }

      // Create a blob from the response data
      const blob = await response.blob()

      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = finalName // Set the download filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL object
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }
  const countRatings = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return 0
    const total = ratings.reduce((sum, rating) => sum + rating.value, 0)
    return total / ratings.length
  }
  function getStarRating(percentage: number): number {
    const clamped = Math.max(0, Math.min(percentage, 100))
    const stars = Math.round((clamped / 100) * 5)

    return stars === 0 && clamped > 0 ? 1 : stars
  }
  function getColor(rating: number) {
    if (rating == 1) return 'text-yellow-900'
    if (rating == 2) return 'text-yellow-800'
    if (rating == 3) return 'text-yellow-700'
    if (rating == 4) return 'text-yellow-500'
    if (rating == 5) return 'text-yellow-400'
    return 'text-black/50'
  }
  const getStars = (license: License) => {
    const ratingValue = getStarRating(
      countRatings(license.product?.expert?.ratings || []),
    )
    const color = getColor(ratingValue)

    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        fill="currentColor"
        fillRule="inherit"
        key={i}
        className={`size-7 transition-colors ${
          i < ratingValue ? color : 'text-black/50'
        }`}
      />
    ))
  }
  const hasVoted = (ratings: any[]) => {
    return ratings.some((rating) => rating.userId == (user?.id as string))
  }

  return (
    <Table className="text-lg">
      <TableCaption>Uma lista de suas licenças.</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="pb-6 w-1/6 ">Id</TableHead>
          <TableHead className="pb-6 w-1/6 ">Nome</TableHead>
          <TableHead className="pb-6 w-1/6 ">Status</TableHead>
          <TableHead className="pb-6 w-1/6 ">Volume Máximo</TableHead>
          <TableHead className="pb-6 w-1/6 ">Avaliação</TableHead>
          <TableHead className="pb-6 w-1/6 ">Conteúdo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.length > 0 &&
          licenses.map((license) => (
            <TableRow key={license.id}>
              <TableCell className="">{license.id}</TableCell>
              <TableCell>{license.product?.name}</TableCell>
              <TableCell>{license.status}</TableCell>
              <TableCell>{license.product?.maxVolume}</TableCell>
              <TableCell className="flex items-center">
                {hasVoted(license.product?.expert?.ratings || []) ? (
                  getStars(license)
                ) : (
                  <VoteProfileModalButton
                    userId={user?.id as string}
                    expertId={license.product?.expertId}
                  />
                )}
              </TableCell>
              <TableCell>
                {license.product?.expert?.fileContentUrl ? (
                  <CustomButton
                    action={() => handler(license.product?.expert as Expert)}
                    label="Baixar Conteúdo"
                    color="Action"
                  />
                ) : (
                  <p className="">Sem Arquivo</p>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
