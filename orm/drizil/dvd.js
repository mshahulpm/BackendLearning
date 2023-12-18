const express = require('express')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info']
})


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/actor',async (req,res)=>{
    const result = await prisma.actor.findMany();
    res.json(result);
})

app.get('/address',async (req,res)=>{
    const result = await prisma.address.findMany();
    res.json(result);
})

app.get('/category',async (req,res)=>{
    const result = await prisma.category.findMany();
    res.json(result);
})

app.get('/city',async (req,res)=>{
    const result = await prisma.city.findMany();
    res.json(result);
})

app.get('/country',async (req,res)=>{
    const result = await prisma.country.findMany();
    res.json(result);
})

app.get('/customer',async (req,res)=>{
    const result = await prisma.customer.findMany();
    res.json(result);
})

app.get('/film',async (req,res)=>{
    const result = await prisma.film.findMany();
    res.json(result);
})

app.get('/film_actor',async (req,res)=>{
    const result = await prisma.film_actor.findMany();
    res.json(result);
})

app.get('/film_category',async (req,res)=>{
    const result = await prisma.film_category.findMany();
    res.json(result);
})

app.get('/inventory',async (req,res)=>{
    const result = await prisma.inventory.findMany();
    res.json(result);
})

app.get('/language',async (req,res)=>{
    const result = await prisma.language.findMany();
    res.json(result);
})

app.get('/payment',async (req,res)=>{
    const result = await prisma.payment.findMany();
    res.json(result);
})

app.get('/rental',async (req,res)=>{
    const result = await prisma.rental.findMany();
    res.json(result);
})

app.get('/staff',async (req,res)=>{
    const result = await prisma.staff.findMany();
    res.json(result);
})

app.get('/store',async (req,res)=>{
    const result = await prisma.store.findMany();
    res.json(result);
})

app.listen(3005,()=>{
    console.log('server is running on 3005');
})