import ShareModal from '@components/Common/VideoCard/ShareModal'
import Tooltip from '@components/UIElements/Tooltip'
import { getVideoUrl } from '@utils/functions/getVideoUrl'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dynamic from 'next/dynamic'
import React, { FC, useState } from 'react'
import { AiOutlineComment } from 'react-icons/ai'
import { RiShareForwardLine } from 'react-icons/ri'
import { SiOpenmined } from 'react-icons/si'
import { LenstubePublication } from 'src/types/local'

const VideoPlayer = dynamic(() => import('../Common/VideoPlayer'))

dayjs.extend(relativeTime)

type Props = {
  video: LenstubePublication
}

type PlayerProps = {
  source: string
  poster: string
}

const MemoizedVideoPlayer = React.memo(({ source, poster }: PlayerProps) => (
  <VideoPlayer source={source} poster={poster} ratio="16:9" />
))

MemoizedVideoPlayer.displayName = 'MemoizedVideoPlayer'

const Video: FC<Props> = ({ video }) => {
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="overflow-hidden">
      <MemoizedVideoPlayer
        source={getVideoUrl(video)}
        poster={video?.metadata?.cover?.original.url}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mt-4 text-lg font-medium line-clamp-2">
            {video.metadata.name}
          </h1>
          <div className="flex items-center text-[11px] opacity-70">
            <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Tooltip content={`Total collected`}>
              <div className="flex items-center space-x-1 opacity-70 hover:opacity-100">
                <SiOpenmined className="text-xs" />
                <span>{video.stats.totalAmountOfCollects}</span>
              </div>
            </Tooltip>
            <Tooltip content={`Total comments`}>
              <div className="flex items-center space-x-1 opacity-70 hover:opacity-100">
                <AiOutlineComment />
                <span>{video.stats.totalAmountOfComments}</span>
              </div>
            </Tooltip>
          </div>
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center space-x-1 outline-none opacity-70 hover:opacity-100"
          >
            <RiShareForwardLine />
            <span>Share</span>
          </button>
        </div>
        <ShareModal
          video={video}
          show={showShare}
          setShowShare={setShowShare}
        />
      </div>
    </div>
  )
}

export default Video