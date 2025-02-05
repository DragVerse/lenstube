import type {
  QueuedCommentType,
  QueuedLivestreamVideoType,
  QueuedVideoType
} from 'utils'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Tokens = {
  accessToken: string | null
  refreshToken: string | null
}

interface AppPerisistState {
  accessToken: Tokens['accessToken']
  refreshToken: Tokens['refreshToken']
  selectedChannelId: string | null
  sidebarCollapsed: boolean
  latestNotificationId: string
  queuedVideos: QueuedVideoType[]
  queuedComments: QueuedCommentType[]
  queuedLivestreams: QueuedVideoType[]
  setLatestNotificationId: (id: string) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setSelectedChannelId: (id: string | null) => void
  setQueuedComments: (queuedComments: QueuedCommentType[]) => void
  setQueuedVideos: (queuedVideos: QueuedVideoType[]) => void
  setQueuedLivestreams: (queuedVideos: QueuedLivestreamVideoType[]) => void
  signIn: (tokens: { accessToken: string; refreshToken: string }) => void
  signOut: () => void
  hydrateAuthTokens: () => Tokens
}

export const usePersistStore = create(
  persist<AppPerisistState>(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      selectedChannelId: null,
      sidebarCollapsed: true,
      latestNotificationId: '',
      queuedComments: [],
      queuedVideos: [],
      queuedLivestreams: [],
      setQueuedVideos: (queuedVideos) => set({ queuedVideos }),
      setQueuedComments: (queuedComments) => set({ queuedComments }),
      setQueuedLivestreams: (queuedLivestreams) => set({ queuedLivestreams }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setLatestNotificationId: (latestNotificationId) =>
        set({ latestNotificationId }),
      setSelectedChannelId: (id) => set({ selectedChannelId: id }),
      signIn: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      signOut: () => localStorage.removeItem('dragverse.store'),
      hydrateAuthTokens: () => {
        return {
          accessToken: get().accessToken,
          refreshToken: get().refreshToken
        }
      }
    }),
    {
      name: 'dragverse.store'
    }
  )
)

export default usePersistStore

export const signIn = (tokens: { accessToken: string; refreshToken: string }) =>
  usePersistStore.getState().signIn(tokens)
export const signOut = () => usePersistStore.getState().signOut()
export const hydrateAuthTokens = () =>
  usePersistStore.getState().hydrateAuthTokens()
