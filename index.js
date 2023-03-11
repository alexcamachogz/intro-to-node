const http = require('http')
const url = require('url')
const fs = require('fs')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

// Create a server
const server = http.createServer((required, response) => {
  const pathName = required.url
  if (pathName === '/' || pathName === '/overview') {
    response.end('This is the OVERVIEW')
  } else if (pathName === '/product') {
    response.end('This is the PRODUCT')
  } else if (pathName === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' })
    response.end(data)
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    })
    response.end('<h1>Page not found</h1>')
  }
})

// Start the server in port 3500
server.listen(3500, '127.0.0.1', () => {
  console.log('Server is running...')
})
