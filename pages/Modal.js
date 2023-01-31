import React from 'react'
import styles from '../styles/modal.module.css'

export default function Modal({  open, handleConfirm }) {

    return (
        <div>
                 <div className={open ? styles.confirmShow: styles.confirm}>
        <div className={styles.confirmContent}>
          <h4>CONFIRM</h4>
          <div>
            <h2></h2>
            <p>This action is final...</p>
          </div>
        </div>
        <div className={styles.confirmBtns}>
          <button onClick={() => handleConfirm(true)}>YES</button>
          <button onClick={() => handleConfirm(false)}>NO</button>
        </div>
      </div>
      <div 
        className={styles.overlay} 
        onClick={() => handleConfirm(false)} 
      />
  
        </div>
      )

}
