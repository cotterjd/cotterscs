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
; // eslint-disable-line semi

export default { del }
