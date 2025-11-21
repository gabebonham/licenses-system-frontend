'use client'
import PresentationSection from '../components/PresentationSection'
import PartnersCarousel from '../components/PartnersCarousel'
import AboutSection from '../components/AboutSection'
import CopiesDisplay from '../components/CopiesDisplay'
import RatingDisplay from '../components/RatingsDisplay'
import ExpertsDisplay from '../components/ExpertsDisplay'
import { useState } from 'react'
export default function HomePageComponent({
  res,
  userId,
  trades,
  ratings,
  copies,
  items,
  performances,
  performancesCopy,
}: {
  res: { data?: any; success: boolean }
  userId: string
  ratings: any[]
  trades: any[]
  copies: any[]
  items: any[]
  performances: any[]
  performancesCopy: any[]
}) {
  const [currentExpertId, setCurrentExpertId] = useState<string>('')
  const handleScroll = (target: string) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className=" pt-18 w-full  flex flex-col  justify-center  gap-x-0 ">
      <div className="bg-gradient-to-b from-grayLight to-blueLight2">
        {res.success && (
          <PresentationSection
            currentExpertId={currentExpertId}
            setCurrentExpertId={setCurrentExpertId}
            experts={res.data}
            trades={trades}
            handleScroll={handleScroll}
          />
        )}
        <PartnersCarousel items={items} />
        <ExpertsDisplay
          performances={performances}
          experts={res.data}
          currentExpertId={currentExpertId}
          setCurrentExpertId={setCurrentExpertId}
          trades={trades}
        />
      </div>
      <div className="bg-blueDark">
        {' '}
        <CopiesDisplay
          performancesCopy={performancesCopy}
          copies={copies}
          userId={userId}
          trades={trades}
        />{' '}
      </div>
      <div className="text-blueLight">
        {' '}
        <RatingDisplay ratings={ratings} />{' '}
      </div>
      <AboutSection />
    </div>
  )
}
