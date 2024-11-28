"use client"

import React from 'react';  

interface ModalProps {  
  isOpen: boolean;  
  onClose: () => void;  
  title: string;  
  children: React.ReactNode; // To allow any React elements as children  
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {  
    if (!isOpen) return null;  

    return (  
        <div className="modal-overlay" onClick={onClose}>  
            <div className="modal-content" onClick={e => e.stopPropagation()}>  
                <div className="modal-header">  
                    <h2 style={{fontSize:'24px'}}>{title}</h2>  
                    <button onClick={onClose}><span style={{fontSize:'24px'}}>&times;</span></button>  
                </div>  
                <div className="modal-body">  
                    {children}  
                </div>  
            </div>  
        </div>  
    );  
};  

export default Modal;