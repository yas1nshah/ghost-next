import Header from "@/components/header/header"
import Navbar from "@/components/home/navbar"

export default function InventoryLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Navbar/>
   
        {children}
      </section>
    )
  }