export type UserRole = 'visitor' | 'subscriber' | 'participant' | 'member' | 'admin'
export type AccessLevel = 'public' | 'subscriber' | 'participant' | 'member'
export type ContentMenuType = '듣다' | '읽다'
export type ProgramType = '온라인' | '오프라인' | '부모교육' | '진로상담' | '강사교수자' | '기관의뢰'
export type ProgramStatus = 'open' | 'closed' | 'upcoming'

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          role: UserRole
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          display_name?: string | null
          role?: UserRole
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          role?: UserRole
          is_approved?: boolean
          created_at?: string
        }
      }
      contents: {
        Row: {
          id: string
          menu_type: ContentMenuType
          title: string
          text_body: string | null
          media_url: string | null
          tags: string[] | null
          access_level: AccessLevel
          created_at: string
        }
        Insert: {
          id?: string
          menu_type: ContentMenuType
          title: string
          text_body?: string | null
          media_url?: string | null
          tags?: string[] | null
          access_level?: AccessLevel
          created_at?: string
        }
        Update: {
          id?: string
          menu_type?: ContentMenuType
          title?: string
          text_body?: string | null
          media_url?: string | null
          tags?: string[] | null
          access_level?: AccessLevel
          created_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          title: string
          type: ProgramType
          price: number
          status: ProgramStatus
          description: string | null
          thumbnail_url: string | null
          duration: string | null
          participants: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          type: ProgramType
          price?: number
          status?: ProgramStatus
          description?: string | null
          thumbnail_url?: string | null
          duration?: string | null
          participants?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: ProgramType
          price?: number
          status?: ProgramStatus
          description?: string | null
          thumbnail_url?: string | null
          duration?: string | null
          participants?: string | null
          location?: string | null
          created_at?: string
        }
      }
      books_outlinks: {
        Row: {
          id: string
          book_title: string
          subtitle: string | null
          cover_image_url: string | null
          purchase_url_kyobo: string | null
          purchase_url_yes24: string | null
          quote_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          book_title: string
          subtitle?: string | null
          cover_image_url?: string | null
          purchase_url_kyobo?: string | null
          purchase_url_yes24?: string | null
          quote_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          book_title?: string
          subtitle?: string | null
          cover_image_url?: string | null
          purchase_url_kyobo?: string | null
          purchase_url_yes24?: string | null
          quote_text?: string | null
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          type: string
          name: string
          email: string
          organization: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type?: string
          name: string
          email: string
          organization?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          name?: string
          email?: string
          organization?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          updated_at?: string
        }
      }
    }
  }
}
