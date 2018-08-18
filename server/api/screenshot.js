const express = require('express')
const axios = require('axios')
const router = express.Router()
const mongoose = require('../../db/mongoose')
const Binary = require('mongodb').Binary;
const {File} = require('../../db/models/File.js')
const Screenshot = require('../../Helpers/takeScreenshot')
const config = require('../../server/config.js')

router.get('/', (req, res) => {

    let { url , device } = req.query

    let width = 0;
    let height = 0;

    if (device == 'phone') {
        width = 414;
        height = 736;
    } 
    if (device == 'desktop') {
        width = 1024;
        height = 768;
    }

    url = url.replace('https://', '')
    url = url.replace('http://', '')

    Screenshot({ 
        url: `http://${url}`,
        width:width,
        height:height
    })
        .then(img => {

            let nameArr = url.split('.')
            console.log(nameArr)
            let name = nameArr[0]
            console.log(name)

            File.findOne({name:`${name}-${device}`}, (e, fileFounded) => {
                if (e) {res.send(e)}
                if (fileFounded) {res.send(fileFounded)}
                else {
                    let time = new Date().getTime()
                    let newImage = new File({
                        name:`${name}-${device}-${time}.png`,
                        file: Binary(img), // creating and saving the image as binary buffer
                    })
                    newImage.save((e, doc) => {
                        if (e) res.send(e)
                        else if (doc) res.send({
                            name:`${name}-${device}.png`,
                            link:`${config.server}/getscreenshot/${name}-${device}-${time}.png`
                        })
                    })
                }
            })
        })
})

module.exports = router


