const url = `https://api.airtable.com/v0/appjTdsBKlBGspP1Q/Imported%20table` 
const key = `keylFLOp8JEqdkskz`

const 
  del = (id) => {
    // return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     query: `
    //       mutation {
    //         deleteUnitCode(where: {
    //           id: "${id}"
    //         }) {
    //           id
    //         }
    //       }
    //     `
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    return fetch(`${url}?records[]=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    })
  }
, listUnitCodes = () => {
    // return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     query: `
    //       query {
    //         unitCodes {
    //           id
    //           unit
    //           codes
    //           createdAt
    //           deviceId
    //           job
    //         }
    //       }
    //     `
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    })
    .then(r => r.json())
  }
  // NOT CURRENTLY IN USE
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
, saveCodes = (deviceId, unit, chosenCodes, job) => {
    const payload = {
      records: [{
        fields: {
          deviceId,
          unit,
          job,
          codes: chosenCodes.join(', '),
          createdAt: new Date(),
        }
      }] 
    }
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
    }).then(r => r.json())
    // return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     query: `
    //       mutation {
    //         createUnitCode(data: {
    //           deviceId: "${deviceId}"
    //           unit: "${unitName}"
    //           codes: "${chosenCodes.join(', ')}"
    //           job: "${jobName}"
    //         }) {
    //           id job unit
    //         }
    //       }
    //     `
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(r => r.json())
  }
; // eslint-disable-line semi


export default { del, listUnitCodes, listOldRecords, saveCodes, }
