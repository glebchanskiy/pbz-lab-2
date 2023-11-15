export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      EmployeesInContract: {
        Row: {
          contractId: number
          employeeId: number
          paidAt: string | null
        }
        Insert: {
          contractId: number
          employeeId: number
          paidAt?: string | null
        }
        Update: {
          contractId?: number
          employeeId?: number
          paidAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "EmployeesInContract_contractId_fkey"
            columns: ["contractId"]
            referencedRelation: "InsuranceContract"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EmployeesInContract_employeeId_fkey"
            columns: ["employeeId"]
            referencedRelation: "InsuredEmploye"
            referencedColumns: ["id"]
          }
        ]
      }
      EmployeesPaymentsInContract: {
        Row: {
          contractId: number
          employeeId: number
        }
        Insert: {
          contractId: number
          employeeId: number
        }
        Update: {
          contractId?: number
          employeeId?: number
        }
        Relationships: [
          {
            foreignKeyName: "EmployeesPaymentsInContract_contractId_fkey"
            columns: ["contractId"]
            referencedRelation: "InsuranceContract"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EmployeesPaymentsInContract_employeeId_fkey"
            columns: ["employeeId"]
            referencedRelation: "InsuredEmploye"
            referencedColumns: ["id"]
          }
        ]
      }
      InsuranceAgent: {
        Row: {
          fullName: string
          id: number
          passportData: string
        }
        Insert: {
          fullName: string
          id?: number
          passportData: string
        }
        Update: {
          fullName?: string
          id?: number
          passportData?: string
        }
        Relationships: []
      }
      InsuranceContract: {
        Row: {
          agentId: number
          creationDate: string
          expirationDate: string
          id: number
          organizationId: number
        }
        Insert: {
          agentId: number
          creationDate?: string
          expirationDate: string
          id?: number
          organizationId: number
        }
        Update: {
          agentId?: number
          creationDate?: string
          expirationDate?: string
          id?: number
          organizationId?: number
        }
        Relationships: [
          {
            foreignKeyName: "InsuranceContract_agentId_fkey"
            columns: ["agentId"]
            referencedRelation: "InsuranceAgent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "InsuranceContract_organizationId_fkey"
            columns: ["organizationId"]
            referencedRelation: "Organization"
            referencedColumns: ["id"]
          }
        ]
      }
      InsuranceContractPaymants: {
        Row: {
          cost: number
          insuranceContractId: number
          riskCategory: Database["public"]["Enums"]["RiskCategory"]
        }
        Insert: {
          cost: number
          insuranceContractId: number
          riskCategory: Database["public"]["Enums"]["RiskCategory"]
        }
        Update: {
          cost?: number
          insuranceContractId?: number
          riskCategory?: Database["public"]["Enums"]["RiskCategory"]
        }
        Relationships: [
          {
            foreignKeyName: "InsuranceContractPaymants_insuranceContractId_fkey"
            columns: ["insuranceContractId"]
            referencedRelation: "InsuranceContract"
            referencedColumns: ["id"]
          }
        ]
      }
      InsuredEmploye: {
        Row: {
          age: number
          fullName: string
          id: number
          organizationId: number
          riskCategory: Database["public"]["Enums"]["RiskCategory"]
        }
        Insert: {
          age: number
          fullName: string
          id?: number
          organizationId: number
          riskCategory: Database["public"]["Enums"]["RiskCategory"]
        }
        Update: {
          age?: number
          fullName?: string
          id?: number
          organizationId?: number
          riskCategory?: Database["public"]["Enums"]["RiskCategory"]
        }
        Relationships: [
          {
            foreignKeyName: "InsuredEmploye_organizationId_fkey"
            columns: ["organizationId"]
            referencedRelation: "Organization"
            referencedColumns: ["id"]
          }
        ]
      }
      Organization: {
        Row: {
          address: string
          bankNumber: string
          code: string
          fullName: string
          id: number
          shortName: string
          specialization: string
        }
        Insert: {
          address: string
          bankNumber: string
          code: string
          fullName: string
          id?: number
          shortName: string
          specialization: string
        }
        Update: {
          address?: string
          bankNumber?: string
          code?: string
          fullName?: string
          id?: number
          shortName?: string
          specialization?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_insurance_data: {
        Args: {
          date_arg: string
          organization_name_arg: string
        }
        Returns: {
          insurance_contract_id: number
          organization_id: number
          insurance_agent_id: number
          insurance_contract_payment_id: number
          organization_full_name: string
        }[]
      }
      getActiveContractsByDate: {
        Args: {
          organizationnamearg: string
          selecteddatearg: string
        }
        Returns: {
          organizationName: string
          address: string
          contractId: number
          creationDate: string
          expirationDate: string
        }[]
      }
      getInsuranceAgentsByDate: {
        Args: {
          organizationnamearg: string
          selecteddatearg: string
        }
        Returns: {
          agentName: string
          passportData: string
          contractCreationDate: string
          organizationName: string
        }[]
      }
    }
    Enums: {
      RiskCategory:
        | "LowRisk"
        | "MediumRisk"
        | "ModerateRisk"
        | "HighRisk"
        | "VeryHighRisk"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

