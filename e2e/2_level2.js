const superagent = require('superagent');
const  assert = require('assert');


describe("topsecret", function() {

    it('should return position and message', async function (){
        let data = {
            "satellites": [
                {
                    "name": "kenobi",
                    "distance": 100.0,
                    "message": ["este", "", "", "mensaje", ""]
                },
                {
                    "name": "skywalker",
                    "distance": 115.5,
                    "message": ["", "es", "", "", "secreto"]
                },
                {
                    "name": "sato",
                    "distance": 142.7,
                    "message": ["este", "", "un", "", ""]
                }
            ]

        }
        console.log('test1')
        const res = await superagent.post('localhost:3000/dev/topsecret').send(data);
        assert.deepStrictEqual(res.body, { position: { x: -487.2859125, y: 1557.014225 }, message: 'este es un mensaje secreto' })
    })
})