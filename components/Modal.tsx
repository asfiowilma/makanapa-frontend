import React, { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: ReactNode
}

export const Modal = ({ isOpen, setIsOpen, children }: Props) => {
  return (
    <div className={`modal pl-80 ${isOpen && "modal-open"}`} onClick={() => setIsOpen(false)}>
      <div className="modal-box relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div >
  )
}