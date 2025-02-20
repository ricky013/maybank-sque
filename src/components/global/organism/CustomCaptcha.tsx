// import { RefreshCcw, Volume2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface CustomCaptchaProps {
  onVerify: (isValid: boolean) => void
  lineDistortion?: boolean
  optionsCanvas?: {
    colorLines: string
    colorRandomLines: string
    background: string
    color: string
    fontBold: string
    fontSize: number
    typeFont: string
  }
  optionsAudio?: {
    lang: string
    text: string
  }
}

const CustomCaptcha: React.FC<CustomCaptchaProps> = ({
  onVerify,
  lineDistortion = false,
  optionsCanvas = {
    colorLines: '#CCCCCC',
    colorRandomLines: '#000000',
    background: '#FFFFFF',
    color: '#000000',
    fontBold: 'bold',
    fontSize: 24,
    typeFont: 'Arial'
  }
  // optionsAudio = {
  //   lang: 'id-ID',
  //   text: 'Masukkan kode berikut:'
  // }
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [captchaText, setCaptchaText] = useState('')
  const [userInput, setUserInput] = useState('')

  // Generate random text for the CAPTCHA
  const generateCaptchaText = (length = 6): string => {
    const chars = '0123456789'
    // const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  }

  // Draw CAPTCHA on Canvas
  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current

    if (!canvas || !wrapper) return

    const context = canvas.getContext('2d')
    if (!context) return

    const width = canvas.width
    const height = canvas.height

    context.clearRect(0, 0, width, height)

    // Background color
    context.fillStyle = optionsCanvas.background
    context.fillRect(0, 0, width, height)

    // Add two crossing lines for distortion
    context.beginPath()
    context.moveTo(0, 0) // From top-left
    context.lineTo(width, height) // To bottom-right
    context.strokeStyle = optionsCanvas.colorLines
    context.lineWidth = 1
    context.stroke()

    context.beginPath()
    context.moveTo(width, 0) // From top-right
    context.lineTo(0, height) // To bottom-left
    context.strokeStyle = optionsCanvas.colorLines
    context.lineWidth = 1
    context.stroke()

    if (lineDistortion) {
      // Add random lines for distortion
      for (let i = 0; i < 2; i++) {
        context.beginPath()
        context.moveTo(Math.random() * width, Math.random() * height)
        context.lineTo(Math.random() * width, Math.random() * height)
        context.strokeStyle = optionsCanvas.colorRandomLines
        context.lineWidth = 1
        context.stroke()
      }
    }

    // Draw CAPTCHA text
    context.font = `${optionsCanvas.fontBold} ${optionsCanvas.fontSize}px ${optionsCanvas.typeFont}`
    context.fillStyle = optionsCanvas.color
    context.textBaseline = 'middle'
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const x = (i + 1) * (width / (text.length + 1))
      const y = height / 2 + (Math.random() * 10 - 5)
      context.save()
      context.translate(x, y)
      context.rotate((Math.random() * 30 - 15) * (Math.PI / 180))
      context.fillText(char, 0, 0)
      context.restore()
    }
  }

  // Generate and draw a new CAPTCHA
  const refreshCaptcha = () => {
    const text = generateCaptchaText()
    setCaptchaText(text)
    resizeCanvas()
    drawCaptcha(text)
  }

  // Resize canvas based on wrapper size
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current

    if (!canvas || !wrapper) return

    canvas.width = wrapper.offsetWidth * 0.85 // 85% of wrapper width
    canvas.height = 50 // Fixed height
  }

  // Play CAPTCHA text as audio
  // const playCaptchaAudio = () => {
  //   const speech = new SpeechSynthesisUtterance()
  //   speech.lang = optionsAudio.lang //  default: Bahasa Indonesia
  //   speech.text = `${optionsAudio.text} ${captchaText.split('').join(', ')}`
  //   window.speechSynthesis.speak(speech)
  // }

  // Monitor wrapper size and resize canvas
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new ResizeObserver(() => {
      resizeCanvas()
      drawCaptcha(captchaText)
    })

    observer.observe(wrapper)
    return () => {
      observer.disconnect()
    }
  }, [captchaText])

  // Generate initial CAPTCHA
  useEffect(() => {
    refreshCaptcha()
  }, [])

  useEffect(() => {
    onVerify(userInput === captchaText)
  }, [userInput, captchaText, onVerify])

  return (
    <div className="p-3 flex gap-2 flex-col w-full bg-[#EEEEEE] rounded-md">
      {/* <div className="flex w-full  justify-between"> */}
      <div ref={wrapperRef} className="w-full flex items-center justify-center bg-white rounded">
        <canvas ref={canvasRef} width="100%" />
      </div>

      {/* <div className="flex w-[10%]  flex-col gap-3 justify-end ">
          <div className="bg-white p-1 flex-center rounded-md cursor-pointer">
            <Volume2 className="h-4 w-4" onClick={playCaptchaAudio} />
          </div>
          <div className="bg-white p-1 flex-center rounded-md cursor-pointer">
            <RefreshCcw className="h-4 w-4" onClick={refreshCaptcha} />
          </div>
        </div> */}
      {/* </div> */}

      <div className="w-full bg-white rounded-md">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Masukkan CAPTCHA"
          className="w-full h-full p-2 placeholder:text-center rounded-md border-none outline-none"
        />
      </div>
    </div>
  )
}

export default CustomCaptcha
