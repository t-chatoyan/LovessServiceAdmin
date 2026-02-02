import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn, { type SignInValues } from '../../Components/SignIn'
import { setAuthenticated, validateDemoAdmin } from '../../auth/demoAuth'
import logo from '../../assets/lovess.png'
import logoBackground from '../../assets/logoBackground.png'

const SignInPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: SignInValues) => {
    setLoading(true)
    try {
      const ok = validateDemoAdmin(values.username, values.password)
      if (!ok) {
        message.error('Սխալ մուտքանուն կամ գաղտնաբառ')
        return
      }

      setAuthenticated(values.remember)
      navigate('/categories', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen w-full">
        <div className="flex w-1/2 min-w-0 items-center justify-center px-6 py-12">
          <SignIn onSubmit={handleSubmit} loading={loading} />
        </div>
        <div
          className="relative w-1/2 min-w-0 overflow-hidden bg-gradient-to-b from-[#E6E6FA] to-[#9966CC]"
        >
          <img
            src={logoBackground}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[-15px] top-[295px] z-10 h-[796px] w-auto rotate-[-223deg] object-contain"
          />
          <img
            src={logoBackground}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[-408px] top-[117px] z-10 h-[796px] w-auto rotate-[-54.78deg] object-contain"
          />
          <div
            className="absolute inset-0 z-0 bg-[#FF61F6]/10"
            aria-hidden="true"
          />
          <div className="relative z-20 flex h-full w-full items-center justify-center">
            <img src={logo} alt="Lovess" className="w-[260px] drop-shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage