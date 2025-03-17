import React from 'react'

interface DisclaimerPopupProps {
  onAccept: () => void // Callback saat pengguna menerima disclaimer
}

const DisclaimerPopup: React.FC<DisclaimerPopupProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-500">Disclaimer</h2>
        {/* Teks Disclaimer Bahasa Indonesia */}
        <p className="text-gray-700 mb-4">
          <strong>PERHATIAN</strong>: Website ini adalah <strong className="italic">PROOF OF CONCEPT (POC)</strong> dan{' '}
          <strong>HANYA DIGUNAKAN UNTUK KEPERLUAN PENGUJIAN</strong>. Website ini <strong>BUKAN</strong> merupakan
          website resmi Maybank.
        </p>

        {/* Garis Pembatas Putus-putus */}
        <div className="border-t border-dashed border-gray-400 my-4"></div>

        {/* Teks Disclaimer Bahasa Inggris */}
        <p className="text-gray-700 mb-6 italic">
          <strong>ATTENTION</strong>: This website is a <strong>PROOF OF CONCEPT (POC)</strong> and is{' '}
          <strong>ONLY USED FOR TESTING PURPOSES</strong>. This is <strong>NOT</strong> the official Maybank website.
        </p>

        <button
          onClick={onAccept}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Saya Mengerti / I Understand
        </button>
      </div>
    </div>
  )
}

export default DisclaimerPopup
