import React from 'react'
import { func } from 'prop-types';

/*
*/

function DangerouslySetInnerHtml () {
  return <div dangerouslySetInnerHTML={{ __html: 'First &nbsp; Second' }}></div>
}

export default DangerouslySetInnerHtml

