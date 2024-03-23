import BottomNavbar from "@/components/home/bottom-navbar"

export default function InventoryLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        {/* Include shared UI here e.g. a header or sidebar */}
        <BottomNavbar/>
   
        {children}
      </>
    )
  }