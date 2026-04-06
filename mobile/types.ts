import {Database} from "@/database.types";

export type Profile = Database['public']['Tables']['Profiles']['Row']
export type Meter = Database['public']['Tables']['Meters']['Row']
export type Address = Database['public']['Tables']['Addresses']['Row']
export type Records = Database['public']['Tables']['Records']['Row']

export type RecordData = {value: number, label: string}
