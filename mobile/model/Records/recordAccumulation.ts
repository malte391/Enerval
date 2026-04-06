import { recordAsNumber } from "@/utils/recordConvert"
import {Records} from "@/types";

export const sumTotalConsumption = (records: Pick<Records, 'value'>[]): number => {
  if (records.length === 0) return 0
  const values = records.map(r => recordAsNumber(r.value))
  const first = values[0]
  const last = values[values.length - 1]
  return last - first
}
