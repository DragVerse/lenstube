import MetaTags from '@components/Common/MetaTags'
import { Analytics, TRACK } from '@utils/analytics'
import React, { useEffect } from 'react'

import ExploreFeed from './Feed'

const Explore = () => {
  useEffect(() => {
    Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.EXPLORE })
  }, [])

  return (
    <>
      <MetaTags title="Explore" />
      <ExploreFeed />
    </>
  )
}

export default Explore