import { recordAsNumber } from "@/utils/recordConvert"
import {Records} from "@/types";

export const sumRecords = (records: Pick<Records, 'value'>[]): number => {
  return records.reduce((sum, record) => sum + recordAsNumber(record.value), 0)
}
