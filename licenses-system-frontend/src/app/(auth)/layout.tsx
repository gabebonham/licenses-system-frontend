import Header from '@/components/shared/Header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Header />
      <div className=" min-h-screen">{children}</div>
    </main>
  )
}
