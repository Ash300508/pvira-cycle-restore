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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      drop_off_centres: {
        Row: {
          accepted_materials: string[]
          address: string
          capacity: number
          city: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          current_load: number
          facilities: string[]
          id: string
          instructions: string | null
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: string
          pincode: string
          status: string
        }
        Insert: {
          accepted_materials?: string[]
          address: string
          capacity?: number
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          current_load?: number
          facilities?: string[]
          id?: string
          instructions?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: string
          pincode: string
          status?: string
        }
        Update: {
          accepted_materials?: string[]
          address?: string
          capacity?: number
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          current_load?: number
          facilities?: string[]
          id?: string
          instructions?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: string
          pincode?: string
          status?: string
        }
        Relationships: []
      }
      drop_off_records: {
        Row: {
          centre_id: string | null
          completed_at: string | null
          confidence: number | null
          created_at: string
          detected_material: string
          environmental_risk: string | null
          id: string
          idol_type: string | null
          image_url: string | null
          notes: string | null
          quantity: number
          reference_id: string
          status: string
          user_id: string
        }
        Insert: {
          centre_id?: string | null
          completed_at?: string | null
          confidence?: number | null
          created_at?: string
          detected_material?: string
          environmental_risk?: string | null
          id?: string
          idol_type?: string | null
          image_url?: string | null
          notes?: string | null
          quantity?: number
          reference_id?: string
          status?: string
          user_id: string
        }
        Update: {
          centre_id?: string | null
          completed_at?: string | null
          confidence?: number | null
          created_at?: string
          detected_material?: string
          environmental_risk?: string | null
          id?: string
          idol_type?: string | null
          image_url?: string | null
          notes?: string | null
          quantity?: number
          reference_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drop_off_records_centre_id_fkey"
            columns: ["centre_id"]
            isOneToOne: false
            referencedRelation: "drop_off_centres"
            referencedColumns: ["id"]
          },
        ]
      }
      eco_points: {
        Row: {
          created_at: string
          id: string
          points: number
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points?: number
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      impact_metrics: {
        Row: {
          id: string
          is_demo: boolean
          metric_name: string
          metric_value: number
          unit: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          is_demo?: boolean
          metric_name: string
          metric_value?: number
          unit?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          is_demo?: boolean
          metric_name?: string
          metric_value?: number
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          kind: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          eco_points: number
          email: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          eco_points?: number
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          eco_points?: number
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      recovery_records: {
        Row: {
          created_at: string
          drop_off_id: string
          id: string
          material: string
          quantity: number
          recovery_date: string | null
          recovery_method: string | null
          status: string
        }
        Insert: {
          created_at?: string
          drop_off_id: string
          id?: string
          material: string
          quantity?: number
          recovery_date?: string | null
          recovery_method?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          drop_off_id?: string
          id?: string
          material?: string
          quantity?: number
          recovery_date?: string | null
          recovery_method?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recovery_records_drop_off_id_fkey"
            columns: ["drop_off_id"]
            isOneToOne: false
            referencedRelation: "drop_off_records"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_reference_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin"
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
      app_role: ["user", "admin"],
    },
  },
} as const
