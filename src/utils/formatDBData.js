// import { format } from 'date-fns'

export const formatDBData = (record) => {
  const { fields, id } = record
  const { codes, unit, job, deviceId, createdAt } = fields

  return {
    id,
    codes,
    unit,
    job,
    deviceId,
    createdAt,
    // deviceId: fields["device ID"],
    // createdAt: format(new Date(fields["creatd date"]), 'MM/DD/YYYY h:mm'),
  }
}