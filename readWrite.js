const fs = require('fs')

// Blocking, synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}`
fs.writeFileSync('./txt/output.txt', textOut)
console.log('File written!')

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
    console.log(data2)
    fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
      console.log(data3)
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (error) => {
        console.log('Your file has been written!')
      })
    })
  })
})

console.log('Will read file!')
