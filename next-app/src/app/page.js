import { Container, Heading } from "@chakra-ui/react"
import Link from 'next/link'
export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Get Your Own</h1>
            <p className="py-6">Prot Prot</p>
            <Link href="/users"><button className="btn btn-primary">Getting Started
            </button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
