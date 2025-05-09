export interface EventsData {
    data: Daum[]
  }
  
  export interface Daum {
    id: string
    title: string
    description: string
    start_date: string
    end_date: string
    location: string
    is_online: boolean
    online_link: any
    image?: string
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    school: string
  }