import React, { forwardRef } from 'react'
import styles from './index.module.css'

const Button = forwardRef(({ label, onClick, props }) => {
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

// set display name
Button.displayName = 'Button'

export default Button
