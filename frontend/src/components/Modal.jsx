import React from 'react'

const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
        {isOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className="fixed  bg-black opacity-50 "></div>
                <div className="absolute top-[40%] right-[50%] p-4 border border-gray-900
                rounded-lg z-10 text-right bg-black">
                    <button 
                    className='text-white font-semibold hover:text-gray-100 focus:outline-none mr-2'
                    onClick={onClose}>
                        x
                    </button>
                    {children}
                </div>
            </div>
        )}
    </>
  )
}

export default Modal