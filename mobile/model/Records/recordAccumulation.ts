import { recordAsNumber } from "@/utils/recordConvert"

export const sumRecords = (records: { value: string }[]): number => {
  return records.reduce((sum, record) => sum + recordAsNumber(record.value), 0)
}
