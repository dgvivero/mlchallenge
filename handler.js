const { Discovery } = require('./services/discovery');
const { SatsController } = require('./satsController');
const { Satellite } = require('./models/satellite');

/**
 * Level 2 - path topsecret
 */

module.exports.topsecret = async event => {
    let response;
    try {
        const { satellites } = JSON.parse(event.body);
        validar(satellites);
        const satCtr = new SatsController(satellites);
        const service = new Discovery(...satCtr.getPositions());
        const ship = {
            position: service.GetLocation(satCtr.getDistances()),
            message: service.GetMessage(satCtr.getMessages())
        };
        response = {
            statusCode: 200,
            body: JSON.stringify(ship),
        };
    } catch (e){
        console.log(e);
        response =  { statusCode: 400 };
    }

  return response;
};


/**
 * Level 3  - Path /topsecret_split/
 * @param event
 * @return {Promise<{body: string, statusCode: number}|{statusCode: number}>}
 */
module.exports.getShip = async event => {
    let response;
    try {
        let {Items, Count} = await  SatsController.restore();

        if(Count < 3) throw Error('No hay suficiente informacion ')
        const satCtr = new SatsController(Items);
        const service = new Discovery(...satCtr.getPositions());
        const ship = {
            position: service.GetLocation(satCtr.getDistances()),
            message: service.GetMessage(satCtr.getMessages())
        };

        response = {
            statusCode: 200,
            body: JSON.stringify(ship),
        };
    } catch (e){
        console.log(e);
        response =  { statusCode: 400, body: e.message };
    }

    return response;
};


module.exports.saveSat = async event => {

    let response;

    try {
        const data = JSON.parse(event.body);
        data.name = event.pathParameters.satellite_name;
        const satellite = new Satellite(data);
        await satellite.save();
        response = {
            statusCode: 200
        };
    } catch (e){
        console.log(e);
        response =  { statusCode: 400 };
    }

    return response;
};
/**
 * Validaciones, si bien solo valido que exista la propiedad satellites en el evento que recibo
 * aqui mismo debiera realizar mas validaciones en los obj individuales (delego en la clase)
 * no los incluyo por razones de tiempo
 * @return {array} of satellites
 */
validar = (satellites)=>{
    if( !Array.isArray(satellites) || satellites.length == 0) throw Error('No hay satelites para procesar');
}


