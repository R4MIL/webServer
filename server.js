import express from 'express'
import fs from 'fs/promises'
import bodyParser from 'body-parser'

const server = express()

server.get('/', async (req, res) => {
    const indexPage = await fs.readFile('./index.html')
    res.send(indexPage.toString())
})

//все товары или по цене
server.get('/goods', async (req, res) => {
    const goods = await fs.readFile('./goods.json')
    if (req.query.hasOwnProperty('price')) {
        const good = JSON.parse(goods).filter(item => {return item.price == req.query.price})  
        res.send(good) 
    } else {
        res.send(goods.toString())  
    }
})

//товар по id
server.get('/goods/:id', async (req, res) => {
    const goods = await fs.readFile('./goods.json')
    const good = JSON.parse(goods).filter(item => {return item.id == req.params.id})
    res.send(good)  
})

//изменение
server.patch('/goods/:id', bodyParser.json(), async (req, res) => {
    let goods = await fs.readFile('./goods.json')
    const obj = JSON.parse(goods)
    obj.forEach(item => { if (item.id == req.params.id) {item.price = req.body.price}})
    fs.writeFile('./goods.json', JSON.stringify(obj))
    res.send('ok')
})

//удаление
server.delete('/goods/:id', async (req, res) => {
    const goods = await fs.readFile('./goods.json')
    const obj = JSON.parse(goods)
    const good = obj.find(item => item.id == req.params.id)
    const index = obj.indexOf(good)
    obj.splice(index,1)
    fs.writeFile('./goods.json', JSON.stringify(obj))
    res.send('ok')
})

server.listen(5000, () => {
    console.log('сервер успешно запущен.');
})
