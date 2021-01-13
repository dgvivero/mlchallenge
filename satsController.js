const { Satellite } = require('./models/satellite');
const { Point } = require('./models/point');
const dbclient = require('./services/dynamodb');

/**
 * Esta clase maneja la coleccion de satelites
 * @Constructor {array}
 */
class SatsController {

    constructor(sats) {
        const [A, B, C] = sats;
        this.satellites= [new Satellite(A), new Satellite(B), new Satellite(C)];
    }

    /**
     * Devuelvo coleccion de distancias
     * @return {array} distancias
     */
    getDistances (){
        return this.satellites.map(s=> s.distance);
    }
    getPositions(){
       return this.satellites.map(s=> s.position);
    }
    getMessages(){
        return this.satellites.map(s=> s.message);
    }

    getSatellites(){
        return this.satellites
    }


    static async restore(){
        let response
        try {
            response = await dbclient.scan({ TableName: 'CHALLENGE'}).promise();

        } catch (e){
            console.log(e)
        }
        return { ...response};
    }

}

module.exports = { SatsController }