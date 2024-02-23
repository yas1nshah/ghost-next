import Image from "next/image";
import Link from 'next/link'
import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";

const font = Outfit({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
  
    <main className="flex h-full glex-col items-center justify-center bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className={`text-6xl font-semibold text-white drop-shadow-md ${font.className}`}>
         🔐 Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication service
        </p>

          <Button variant={"secondary"} size={"lg"}>
            <Link href="/account/login">Sign in</Link>
            
          </Button>

      </div>
    </main>
  );
}
