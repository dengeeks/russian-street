import "./Logo.css"
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  onClick?: () => void
}

const Logo = ({onClick}:LogoProps) => {
  return (
    <Link href="/" className="logo-wrapper" onClick={onClick}>
      <Image src="/logo.png" className="logo" fill alt="Улица России" priority sizes="(min-width: 768px) 200px, 300px"/>
    </Link>
  )
}

export default Logo;