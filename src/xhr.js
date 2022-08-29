const del = (id) => {
    return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            deleteUnitCode(where: {
              id: "${id}"
            }) {
              id
            }
          }
        `
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
, listUnitCodes = () => {
    return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            unitCodes {
              unit
              codes
              createdAt
              deviceId
              job
            }
          }
        `
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => r.json())
  }
, listOldRecords = (jobName, unitName) => {
    return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
      method: 'POST',
      body: JSON.stringify({
        query: `
          {
            unitCodes(orderBy: createdAt_DESC where: {
              job: "${jobName}"
              unit: "${unitName}"
            }) {
              id
              createdAt
              codes
              job
            }
          }
        `
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => r.json())
    .catch(console.error)
  }
; // eslint-disable-line semi


export default { del, listUnitCodes, listOldRecords, }
