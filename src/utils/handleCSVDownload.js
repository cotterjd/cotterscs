
export const handleCSVDownload = (columns, data) => {
    const CSVHead = `${columns.reduce((soFar, column) => `${soFar}"${column}",`, '').slice(0, -1)}\r\n`
    let CSVBody = data.reduce((soFar, row) => `${soFar}"${row.join('","')}"\r\n`, [])
    if (typeof CSVBody === "string") {
      CSVBody = CSVBody.trim()
    } else CSVBody = ''
    /* taken from react-csv */
    const csv = `${CSVHead}${CSVBody}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const dataURI = `data:text/csv;charset=utf-8,${csv}`

    const URL = window.URL || window.webkitURL
    const downloadURI = typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', downloadURI)
    link.setAttribute('download', 'tableDownload.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }