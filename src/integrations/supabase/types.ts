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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      consultation_requests: {
        Row: {
          created_at: string
          email: string
          first_name: string
          goals: string | null
          id: string
          last_name: string
          phone: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          goals?: string | null
          id?: string
          last_name: string
          phone?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          goals?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      salesflow_brokers: {
        Row: {
          active: boolean
          admin_name: string
          chatbot_id: string | null
          company_name: string
          config: Json | null
          created_at: string
          days: number
          email: string | null
          expiry: string
          id: string
          license_status: string
          max_leads_per_month: number
          password: string
          plan: string
          username: string
        }
        Insert: {
          active?: boolean
          admin_name: string
          chatbot_id?: string | null
          company_name: string
          config?: Json | null
          created_at?: string
          days?: number
          email?: string | null
          expiry: string
          id?: string
          license_status?: string
          max_leads_per_month?: number
          password: string
          plan?: string
          username: string
        }
        Update: {
          active?: boolean
          admin_name?: string
          chatbot_id?: string | null
          company_name?: string
          config?: Json | null
          created_at?: string
          days?: number
          email?: string | null
          expiry?: string
          id?: string
          license_status?: string
          max_leads_per_month?: number
          password?: string
          plan?: string
          username?: string
        }
        Relationships: []
      }
      salesflow_leads: {
        Row: {
          age_range: string | null
          broker_id: string | null
          capital: string | null
          completed: boolean | null
          conversation: Json | null
          created_at: string
          existing_broker: boolean | null
          experienta: string | null
          id: string
          obiectiv: string | null
          orizont: string | null
          platform: string | null
          profil: string | null
          risc: string | null
          score: number
          session_id: string | null
          status: string
          sursa: string | null
        }
        Insert: {
          age_range?: string | null
          broker_id?: string | null
          capital?: string | null
          completed?: boolean | null
          conversation?: Json | null
          created_at?: string
          existing_broker?: boolean | null
          experienta?: string | null
          id?: string
          obiectiv?: string | null
          orizont?: string | null
          platform?: string | null
          profil?: string | null
          risc?: string | null
          score?: number
          session_id?: string | null
          status?: string
          sursa?: string | null
        }
        Update: {
          age_range?: string | null
          broker_id?: string | null
          capital?: string | null
          completed?: boolean | null
          conversation?: Json | null
          created_at?: string
          existing_broker?: boolean | null
          experienta?: string | null
          id?: string
          obiectiv?: string | null
          orizont?: string | null
          platform?: string | null
          profil?: string | null
          risc?: string | null
          score?: number
          session_id?: string | null
          status?: string
          sursa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salesflow_leads_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "broker_stats"
            referencedColumns: ["broker_id"]
          },
          {
            foreignKeyName: "salesflow_leads_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "salesflow_brokers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      broker_stats: {
        Row: {
          active: boolean | null
          admin_name: string | null
          broker_id: string | null
          chatbot_id: string | null
          cold_leads_count: number | null
          company_name: string | null
          completion_rate: number | null
          created_at: string | null
          hot_leads_count: number | null
          last_lead_at: string | null
          license_expires_at: string | null
          license_status: string | null
          max_leads_per_month: number | null
          plan: string | null
          total_leads_this_month: number | null
          username: string | null
          warm_leads_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
