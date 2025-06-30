import "./Logo.css"
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  onClick?: () => void
}

const Logo = ({onClick}:LogoProps) => {
  return (
    <Link href="/" className="logo-wrapper" onClick={onClick}>
      <Image
        src="/assets/logo.webp"
        className="logo"
        width={321}
        height={28}
        alt="Улица России"
        priority
        unoptimized
      />
    </Link>
  )
}

export default Logo;