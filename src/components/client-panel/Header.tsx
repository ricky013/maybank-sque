import { useNavigate } from 'react-router-dom'
import { LOGO_TENANT } from '@utils/constants'

const Header = ({ displayLogo = true }: { displayLogo?: boolean }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full relative">
      {/* <img
        src="/src/assets/client/images/motif-header-left.png"
        alt="motif header"
        className="object-cover object-center absolute left-0 w-16 sm:w-24"
      /> */}
      {/* <img
        src="/src/assets/client/images/motif-header-right-1.png"
        alt="motif header"
        className="object-cover object-center absolute w-16 sm:w-24 right-0"
      /> */}
      {/* <img
        src="/src/assets/client/images/motif-header-right-2.png"
        alt="motif header"
        className="object-cover object-center absolute right-0 w-10 sm:w-14"
      /> */}
      {displayLogo && (
        <img
          onClick={() => navigate('/')}
          src={LOGO_TENANT}
          alt="motif header"
          className="object-cover md:scale-125 scale-100 object-center absolute left-[50%] right-[50%] top-12  -translate-x-[50%] -translate-y-[50%] w-1/3 md:w-24 cursor-pointer"
        />
      )}
    </div>
  )
}

export default Header
