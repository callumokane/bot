const express = require('express')
const bodyParser = require('body-parser')
const client = require(`${process.cwd()}/src/index.js`)
var app = express()
var port = process.env.PORT
var listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener._connectionKey.split('::::')[1])
})

app.use(bodyParser.json())
app.post('/radioRequest', function (req, res) {
  const request = req.body
  if (request.model !== 'requests') return res.json({ success: false })
  const embed = new client.Embed()
    .setAuthor(request.entry.type)
    .setDescription(request.entry.content)
    .addField('Name', request.entry.name)
    .setFooter(`ID: ${request.entry.id}`)
  client.channels.cache.get('740698608567058463').send(embed)
  res.json({ success: true })
})

app.post('/radioStats', async function (req, res) {
  const data = req.body
  const message = await client.channels.cache.get('742030525333504080').messages.fetch('742043689341419532')
  const embed = new client.Embed()
    .setTitle('Livida | Radio')
    .addField('Song', data.now_playing.song.text)
    .addField('DJ', data.live.is_live ? data.live.streamer_name : 'Auto DJ')
    .setThumbnail('https://api.livida.net/api/radio/cover')
  message.edit(embed)
  client.log('Updated radio stats')
  res.json({ success: true })
})
