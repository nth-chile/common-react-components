import React from 'react'

const SavedIcon = (props) => (
  <svg
    className='icon-saved'
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    width="20"
  >
    <circle
      className="circle"
      cx="10"
      cy="10"
      r="8"
      fill="transparent"
      stroke="#47B684"
      strokeWidth="3"
    />
    <polyline
      points="7 8 11 12 18 5"
      stroke="#47B684"
      stroke-width="3"
      stroke-linecap="square"
      fill="none"
      stroke-linejoin="miter"
    />
  </svg>
)

export default SavedIcon
