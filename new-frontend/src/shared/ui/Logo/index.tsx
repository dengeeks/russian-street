import "./Logo.css"
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="logo-wrapper">
      <Image src="/logo.png" className="logo" fill alt="Улица России"/>
    </Link>
  )
}

export default Logo;