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
      analytics: {
        Row: {
          created_at: string
          date: string
          id: string
          leads_contacted: number | null
          leads_converted: number | null
          leads_delivered: number | null
          revenue_generated: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          leads_contacted?: number | null
          leads_converted?: number | null
          leads_delivered?: number | null
          revenue_generated?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          leads_contacted?: number | null
          leads_converted?: number | null
          leads_delivered?: number | null
          revenue_generated?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_requests: {
        Row: {
          business_type: string
          completed_at: string | null
          created_at: string
          id: string
          quantity_requested: number
          requested_at: string
          status: Database["public"]["Enums"]["request_status"] | null
          target_city: string | null
          target_country: string
          user_id: string
        }
        Insert: {
          business_type: string
          completed_at?: string | null
          created_at?: string
          id?: string
          quantity_requested: number
          requested_at?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          target_city?: string | null
          target_country: string
          user_id: string
        }
        Update: {
          business_type?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          quantity_requested?: number
          requested_at?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          target_city?: string | null
          target_country?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          address: string | null
          business_name: string
          city: string | null
          contact_person: string | null
          contacted: boolean | null
          converted: boolean | null
          country: string | null
          created_at: string
          delivered_at: string | null
          email: string | null
          id: string
          industry: string | null
          notes: string | null
          phone: string | null
          quality_score: number | null
          rating: number | null
          review_count: number | null
          source: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          city?: string | null
          contact_person?: string | null
          contacted?: boolean | null
          converted?: boolean | null
          country?: string | null
          created_at?: string
          delivered_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          notes?: string | null
          phone?: string | null
          quality_score?: number | null
          rating?: number | null
          review_count?: number | null
          source?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          city?: string | null
          contact_person?: string | null
          contacted?: boolean | null
          converted?: boolean | null
          country?: string | null
          created_at?: string
          delivered_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          notes?: string | null
          phone?: string | null
          quality_score?: number | null
          rating?: number | null
          review_count?: number | null
          source?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          description: string | null
          id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_invoice_id: string | null
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_invoice_id?: string | null
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_invoice_id?: string | null
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          canceled_at: string | null
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          package_type: Database["public"]["Enums"]["package_type"]
          status:
            | Database["public"]["Enums"]["stripe_subscription_status"]
            | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          canceled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          package_type: Database["public"]["Enums"]["package_type"]
          status?:
            | Database["public"]["Enums"]["stripe_subscription_status"]
            | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          canceled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          package_type?: Database["public"]["Enums"]["package_type"]
          status?:
            | Database["public"]["Enums"]["stripe_subscription_status"]
            | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          business_type: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          monthly_value: number | null
          package_type: Database["public"]["Enums"]["package_type"] | null
          phone: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at: string
        }
        Insert: {
          business_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          last_login?: string | null
          monthly_value?: number | null
          package_type?: Database["public"]["Enums"]["package_type"] | null
          phone?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at?: string
        }
        Update: {
          business_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          monthly_value?: number | null
          package_type?: Database["public"]["Enums"]["package_type"] | null
          phone?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_conversion_rate: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_leads_by_filters: {
        Args: {
          p_user_id: string
          p_country?: string
          p_city?: string
          p_industry?: string
          p_contacted?: boolean
          p_converted?: boolean
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          address: string | null
          business_name: string
          city: string | null
          contact_person: string | null
          contacted: boolean | null
          converted: boolean | null
          country: string | null
          created_at: string
          delivered_at: string | null
          email: string | null
          id: string
          industry: string | null
          notes: string | null
          phone: string | null
          quality_score: number | null
          rating: number | null
          review_count: number | null
          source: string | null
          updated_at: string
          user_id: string
          website: string | null
        }[]
      }
      get_user_analytics: {
        Args: { p_user_id: string; p_start_date?: string; p_end_date?: string }
        Returns: {
          date: string
          leads_delivered: number
          leads_contacted: number
          leads_converted: number
          revenue_generated: number
          conversion_rate: number
        }[]
      }
    }
    Enums: {
      package_type: "starter" | "pro" | "premium"
      payment_status: "succeeded" | "failed" | "pending"
      request_status: "pending" | "processing" | "completed"
      stripe_subscription_status:
        | "active"
        | "canceled"
        | "past_due"
        | "incomplete"
        | "trialing"
      subscription_status: "active" | "inactive" | "trial"
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
    Enums: {
      package_type: ["starter", "pro", "premium"],
      payment_status: ["succeeded", "failed", "pending"],
      request_status: ["pending", "processing", "completed"],
      stripe_subscription_status: [
        "active",
        "canceled",
        "past_due",
        "incomplete",
        "trialing",
      ],
      subscription_status: ["active", "inactive", "trial"],
    },
  },
} as const
