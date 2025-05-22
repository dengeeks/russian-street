import "./Logo.css"
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  onClick?: () => void
}

const Logo = ({onClick}:LogoProps) => {
  return (
    <Link href="/" className="logo-wrapper" onClick={onClick}>
      <Image src="/logo.png" className="logo" fill alt="Улица России"/>
    </Link>
  )
}

export default Logo;