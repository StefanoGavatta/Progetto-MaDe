export interface Video {
  data: Data
}

export interface Data {
  id: string
  title: string
  description: any
  video_file: string
  youtube_id: any
  type: string
  sort: number
  created_at: string
  updated_at: string
  user_created: any
  user_updated: any
  school: string
}
