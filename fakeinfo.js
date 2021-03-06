const request = require('request-promise-native')
const cheerio = require('cheerio')
const sanitize = require('sanitize-html')

module.exports = async() => {
    const url = `https://www.fakenamegenerator.com/`
    const result = await request(url)
    const $ = cheerio.load(result)
    const infoHTML = $('dl')
    const nameHTML = sanitize($('h3')).split("</h3>")[0].replace("<h3>", "")
    const gender = /\/images\/sil-(male|female).png/gm.exec(result)[1]
    const info = sanitize(infoHTML)
    const data = info.replace(/<div>.+<\/div>/g, "").replace(/<a>.+<\/a>/g, "").split(/\r?\n/).map(m => m.trim())
    let obj = {}
    let want = ["Phone", "Age", "Birthday", "Email Address", "Username", "Password", "Visa", "MasterCard", "Expires", "CVV2", "CVC2", "Height", "Weight", "Blood type", "Favorite color", "Veichle"]
    for (let i = 0; i < data.length; i++) {
        if (data[i] != "") {
            if (want.includes(data[i])) {
                obj[data[i].split(" ").join("").toLowerCase()] = data[i + 1] == "" ? data[i + 2] : data[i + 1]
            }
        }

    }
    obj.gender = gender
    obj.image = `https://www.fakenamegenerator.com/images/sil-${gender}.png`
    obj.name = nameHTML
    return obj
}