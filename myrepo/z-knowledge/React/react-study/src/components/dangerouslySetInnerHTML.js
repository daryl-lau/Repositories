import React from 'react'

/*
*/

function DangerouslySetInnerHtml () {
  return <div dangerouslySetInnerHTML={{ __html: 'First &nbsp; Second' }}></div>
}

export default DangerouslySetInnerHtml

