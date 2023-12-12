import express from 'express'
import fs from 'fs/promises'

const server = express()

server.get('/', async (req, res) => {
    const indexPage = await fs.readFile('./index.html')
    res.send(indexPage.toString())
})

server.get('/goods', async (req, res) => {
    const goods = await fs.readFile('./goods.json')
    res.send(goods.toString())  
})

server.listen(5000, () => {
    console.log('сервер успешно запущен.');
})
