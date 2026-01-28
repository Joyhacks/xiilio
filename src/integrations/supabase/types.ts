export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agent_activity_history: {
        Row: {
          activity_type: string
          agent_slug: string
          created_at: string
          details: Json | null
          id: string
          summary: string
        }
        Insert: {
          activity_type: string
          agent_slug: string
          created_at?: string
          details?: Json | null
          id?: string
          summary: string
        }
        Update: {
          activity_type?: string
          agent_slug?: string
          created_at?: string
          details?: Json | null
          id?: string
          summary?: string
        }
        Relationships: []
      }
      agent_configurations: {
        Row: {
          agent_slug: string
          created_at: string
          custom_instructions: string | null
          formality_level: string
          greeting_style: string
          id: string
          is_active: boolean
          personality_tone: string
          response_length: string
          updated_at: string
        }
        Insert: {
          agent_slug: string
          created_at?: string
          custom_instructions?: string | null
          formality_level?: string
          greeting_style?: string
          id?: string
          is_active?: boolean
          personality_tone?: string
          response_length?: string
          updated_at?: string
        }
        Update: {
          agent_slug?: string
          created_at?: string
          custom_instructions?: string | null
          formality_level?: string
          greeting_style?: string
          id?: string
          is_active?: boolean
          personality_tone?: string
          response_length?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_links: {
        Row: {
          created_at: string
          default_email_to: string | null
          email_body_template: string | null
          email_subject_template: string | null
          facebook_url: string | null
          id: string
          inbox_url: string | null
          instagram_url: string | null
          linkedin_url: string | null
          tiktok_url: string | null
          updated_at: string
          user_id: string
          whatsapp_phone_e164: string | null
          whatsapp_prefill_message: string | null
        }
        Insert: {
          created_at?: string
          default_email_to?: string | null
          email_body_template?: string | null
          email_subject_template?: string | null
          facebook_url?: string | null
          id?: string
          inbox_url?: string | null
          instagram_url?: string | null
          linkedin_url?: string | null
          tiktok_url?: string | null
          updated_at?: string
          user_id: string
          whatsapp_phone_e164?: string | null
          whatsapp_prefill_message?: string | null
        }
        Update: {
          created_at?: string
          default_email_to?: string | null
          email_body_template?: string | null
          email_subject_template?: string | null
          facebook_url?: string | null
          id?: string
          inbox_url?: string | null
          instagram_url?: string | null
          linkedin_url?: string | null
          tiktok_url?: string | null
          updated_at?: string
          user_id?: string
          whatsapp_phone_e164?: string | null
          whatsapp_prefill_message?: string | null
        }
        Relationships: []
      }
      user_memory: {
        Row: {
          created_at: string
          id: string
          memory_type: string
          structured_data: Json | null
          text_summary: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          memory_type?: string
          structured_data?: Json | null
          text_summary?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          memory_type?: string
          structured_data?: Json | null
          text_summary?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          company_name: string | null
          created_at: string
          data_consent: boolean | null
          full_name: string | null
          id: string
          industry: string | null
          onboarding_completed: boolean | null
          personalization_enabled: boolean | null
          preferred_tone: string | null
          primary_goal: string | null
          role_use_case: string | null
          target_audience: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          data_consent?: boolean | null
          full_name?: string | null
          id?: string
          industry?: string | null
          onboarding_completed?: boolean | null
          personalization_enabled?: boolean | null
          preferred_tone?: string | null
          primary_goal?: string | null
          role_use_case?: string | null
          target_audience?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          data_consent?: boolean | null
          full_name?: string | null
          id?: string
          industry?: string | null
          onboarding_completed?: boolean | null
          personalization_enabled?: boolean | null
          preferred_tone?: string | null
          primary_goal?: string | null
          role_use_case?: string | null
          target_audience?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
