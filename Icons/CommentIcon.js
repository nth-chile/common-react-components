import React from 'react'

const CommentIcon = (props) => (
  <svg className="icon-comment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 35" width={ props.width || "36" } height={ props.height || "35" }>
    <g fill="none" fillRule="evenodd" opacity=".4">
      <path fill="#131114" d="M2.3 8.1c-4.9 9-1.7 20.1 7 24.8A18.3 18.3 0 0 0 34 25.1c4.9-9 .4-17.7-8.3-22.4C16.9-2 7-.8 2.3 8.1z"/>
      <path fill="#FFF" d="M19.8 26c-.5 0-.9-.3-1.1-.7a9.2 9.2 0 0 0-1.5-2.5c-3.7 0-5.6-.1-6.6-.6-.2 0-.3-.2-.5-.3-1.2-1.6-1.7-7.8 0-9.7l.3-.3c2-1.2 13.2-1.5 15.3.9l.3.6c.5 3.9 0 7.2-.4 8.2-.2.2-.3.4-.6.5a7 7 0 0 1-2.5.2 1.2 1.2 0 1 1 .3-2.4h.7c.2-1 .5-3 .2-5.7C22 13.4 14 13 11.8 14a13 13 0 0 0 0 6.2c1 .2 2.9.3 5.8.2.2 0 .4 0 .6.2 1.3.6 2.4 2.9 2.7 3.8a1.2 1.2 0 0 1-1 1.7"/>
    </g>
  </svg>
)

export default CommentIcon
