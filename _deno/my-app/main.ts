import express from 'npm:express'

const app = express()

app.get('/block', (_, res: any) => {
  const start = Date.now()
  while (Date.now() < start + 1000 * 60);
  res.json('block done')
})

app.get('/', (req, res) => {
  res.json('welcome')
})

app.listen(3000, () => console.log('on port 3000'))