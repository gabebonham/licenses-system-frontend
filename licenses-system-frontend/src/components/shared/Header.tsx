import { Volleyball } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed w-full z-90 backdrop-blur-2xl">
      <div className="w-full items-center flex justify-between h-12 px-4 bg-primary/20 ">
        <div>
          <Volleyball />
        </div>
        <div>
          <p>É O Gremio</p>
        </div>
      </div>
    </header>
  )
}
