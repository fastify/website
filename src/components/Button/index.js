import React, { forwardRef } from 'react'
import styles from './index.module.css'

// eslint-disable-next-line react/display-name
const Button = forwardRef(({ label, width, onClick, textAlign = 'left', className, href, props }, ref) => {
  return (
    <button
      onClick={(e) => {
        if (onClick) {
          onClick(e)
          e.stopPropagation()
        }
      }}
      className={styles.button}
      {...props}
      type="button">
      <span className={styles.buttonLabel}>{label}</span>
    </button>
  )
})

export default Button
