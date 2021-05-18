import Link from 'next/link'
import NavStyle from './styles/NavStyles'

export default function Nav() {
  return (
    <NavStyle>
      <Link href='/products'>Products</Link>
      <Link href='/sell'>Sell</Link>
      <Link href='/orders'>Orders</Link>
      <Link href='/account'>Account</Link>
    </NavStyle>
  )
}
