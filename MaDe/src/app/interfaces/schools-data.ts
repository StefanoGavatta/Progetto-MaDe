
export interface SchoolsData {
    data: Daum[]
    meta: Meta
  }
  
  export interface Daum {
    id: string
    name: string
    type: string
    logo: string
    website_url: string
    description: string
    detailed_info: string
    address: string
    main_campus: boolean
    parent_school: string
    canteen: boolean
    boarding: boolean
    email: string
    phone: string
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    miur_code: string
    responsabile_orientamento: string
    short_name: string
    position: string
    sort: number
    events: [string, Events]
    admins: [string, Admins]
    school_phones: [string, SchoolPhones]
    school_emails: [string, SchoolEmails]
    videos: [string, Videos]
    edu_links: [string, EduLinks]
    branch_schools: string[]
    transport_routes: [string, TransportRoutes]
  }
  
  export interface Events {
    id: string
    title: string
    description: string
    start_date: string
    end_date: string
    location: string
    is_online: boolean
    online_link: string
    image: string
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    school: string
  }
  
  export interface Admins {
    id: string
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    user: string
    school: string
  }
  
  export interface SchoolPhones {
    id: string
    number: string
    sort: number
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    school: string
    label: string
  }
  
  export interface SchoolEmails {
    id: string
    email: string
    sort: number
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    school: string
    label: string
  }
  
  export interface Videos {
    id: string
    title: string
    description: string
    video_file: string
    youtube_id: string
    type: string
    sort: number
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    school: string
  }
  
  export interface EduLinks {
    id: string
    link_url: string
    sort: number
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    school: string
    educational_path: string
    name: string
  }
  
  export interface TransportRoutes {
    id: string
    name: string
    description: string
    route_path: string
    transportation_type: string
    estimated_time_minutes: number
    created_at: string
    updated_at: string
    user_created: string
    user_updated: string
    school: string
    start: Start
    start_label: string
  }
  
  export interface Start {}
  
  export interface Meta {
    total_count: number
    filter_count: number
  }
  