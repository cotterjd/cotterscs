import { format } from 'date-fns'

export const formatDBData = (record) => {
  const { fields } = record
  const { codes, unit, job } = fields

  return {
    codes,
    unit,
    job,
    deviceId: fields["device ID"],
    createdAt: format(new Date(fields["creatd date"]), 'MM/DD/YYYY h:mm'),
  }
}