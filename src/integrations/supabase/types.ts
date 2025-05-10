export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      connections: {
        Row: {
          battery: number | null
          connected_at: string | null
          created_at: string
          id: string
          instance_name: string
          last_sync: string | null
          name: string
          number: string | null
          status: string
        }
        Insert: {
          battery?: number | null
          connected_at?: string | null
          created_at?: string
          id?: string
          instance_name: string
          last_sync?: string | null
          name: string
          number?: string | null
          status?: string
        }
        Update: {
          battery?: number | null
          connected_at?: string | null
          created_at?: string
          id?: string
          instance_name?: string
          last_sync?: string | null
          name?: string
          number?: string | null
          status?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          connection_id: string | null
          created_at: string
          description: string | null
          id: string
          last_activity: string | null
          members_count: number | null
          messages_count: number | null
          name: string
          status: string | null
          whatsapp_id: string | null
        }
        Insert: {
          connection_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_activity?: string | null
          members_count?: number | null
          messages_count?: number | null
          name: string
          status?: string | null
          whatsapp_id?: string | null
        }
        Update: {
          connection_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_activity?: string | null
          members_count?: number | null
          messages_count?: number | null
          name?: string
          status?: string | null
          whatsapp_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "connections"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
          is_admin: boolean | null
          name: string | null
          number: string
          status: string | null
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
          is_admin?: boolean | null
          name?: string | null
          number: string
          status?: string | null
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
          is_admin?: boolean | null
          name?: string | null
          number?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          features: Json | null
          id: string
          interval: string
          is_active: boolean | null
          max_connections: number | null
          max_groups: number | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          features?: Json | null
          id?: string
          interval?: string
          is_active?: boolean | null
          max_connections?: number | null
          max_groups?: number | null
          name: string
          price: number
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          features?: Json | null
          id?: string
          interval?: string
          is_active?: boolean | null
          max_connections?: number | null
          max_groups?: number | null
          name?: string
          price?: number
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
