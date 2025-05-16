import { useNavigate } from 'react-router-dom'
import { LOGO_TENANT } from '@utils/constants.ts'

const Header = ({ displayLogo = true }: { displayLogo?: boolean }) => {
  const navigate = useNavigate()
  return (
    <>
      {displayLogo && (
        <img
          onClick={() => navigate('/')}
          src={LOGO_TENANT}
          alt="motif header"
          className="object-contain h-full max-w-[80%] cursor-pointer transition-transform hover:scale-105"
        />
      )}
    </>
  )
}

export default Header
