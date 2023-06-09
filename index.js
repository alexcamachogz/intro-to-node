const http = require('http')
const url = require('url')
const fs = require('fs')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate')

const templateOverview = fs.readFileSync(`${__dirname}/templates/template_overview.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template_card.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }))

// Create a server
const server = http.createServer((required, response) => {
  const { query, pathname } = url.parse(required.url, true)

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    response.writeHead(200, { 'Content-type': 'text/html' })
    const cardsHTML = dataObj.map((el) => replaceTemplate(templateCard, el)).join('')
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML)
    response.end(output)

    // Product page
  } else if (pathname === '/product') {
    response.writeHead(200, { 'Content-type': 'text/html' })
    const product = dataObj[query.id]
    const output = replaceTemplate(templateProduct, product)
    response.end(output)

    // API
  } else if (pathname === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' })
    response.end(data)

    // Not found
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
