export interface Root {
    data: Daum[]
  }
  
  export interface Daum {
    id: string
    name: string
    website_url: string
    description?: string
    detailed_info: any
    address: string
    main_campus: boolean
    canteen: boolean
    boarding: boolean
    email?: string
    phone?: string
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    miur_code?: string
    responsabile_orientamento?: string
    short_name: string
    position: Position
    sort: number
    events: Event[]
    admins: Admin[]
    school_phones: SchoolPhone[]
    school_emails: SchoolEmail[]
    videos: Video[]
    edu_links: EduLink[]
    branch_schools: BranchSchool[]
    transport_routes: TransportRoute[]
    type: Type
    logo: Logo
    parent_school?: ParentSchool
  }
  
  export interface Position {
    coordinates: number[]
    type: string
  }
  
  export interface Event {
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
  
  export interface Admin {
    id: string
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    user: string
    school: string
  }
  
  export interface SchoolPhone {
    id: string
    number: string
    sort: number
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    school: string
    label: string
  }
  
  export interface SchoolEmail {
    id: string
    email: string
    sort: number
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    school: string
    label: string
  }
  
  export interface Video {
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
  
  export interface EduLink {
    id: string
    link_url: string
    sort: number
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    school: string
    educational_path: string
    name: string
  }
  
  export interface BranchSchool {
    id: string
    name: string
    type: string
    logo: string
    website_url: string
    description: any
    detailed_info: any
    address: string
    main_campus: boolean
    parent_school: string
    canteen: boolean
    boarding: boolean
    email: any
    phone: any
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    miur_code: any
    responsabile_orientamento: any
    short_name: string
    position: Position2
    sort: number
    events: string[]
    admins: any[]
    school_phones: string[]
    school_emails: string[]
    videos: string[]
    edu_links: string[]
    branch_schools: any[]
    transport_routes: any[]
  }
  
  export interface Position2 {
    coordinates: number[]
    type: string
  }
  
  export interface TransportRoute {
    id: string
    name: string
    description: any
    route_path: RoutePath
    transportation_type: string
    estimated_time_minutes: number
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    school: string
    start: Start
    start_label: string
  }
  
  export interface RoutePath {
    coordinates: number[]
    type: string
  }
  
  export interface Start {
    type: string
    coordinates: number[]
  }
  
  export interface Type {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
  }
  
  export interface Logo {
    id: string
    storage: string
    filename_disk: string
    filename_download: string
    title: string
    type: string
    folder: string
    uploaded_by: string
    created_on: string
    modified_by?: string
    modified_on: string
    charset: any
    filesize: string
    width: number
    height: number
    duration: any
    embed: any
    description: any
    location: any
    tags: any
    metadata: Metadata
    focal_point_x: any
    focal_point_y: any
    tus_id: any
    tus_data: any
    uploaded_on: string
  }
  
  export interface Metadata {}
  
  export interface ParentSchool {
    id: string
    name: string
    type: string
    logo: string
    website_url: string
    description: string
    detailed_info: any
    address: string
    main_campus: boolean
    parent_school: any
    canteen: boolean
    boarding: boolean
    email: any
    phone: any
    created_at: string
    updated_at: string
    user_created: any
    user_updated: any
    miur_code: string
    responsabile_orientamento: string
    short_name: string
    position: Position3
    sort: number
    events: string[]
    admins: any[]
    school_phones: string[]
    school_emails: string[]
    videos: string[]
    edu_links: string[]
    branch_schools: string[]
    transport_routes: any[]
  }
  
  export interface Position3 {
    coordinates: number[]
    type: string
  }
  