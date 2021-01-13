const dbclient = require('../services/dynamodb');
const { Point } = require('./point');

class Satellite {

    constructor(obj){
        let positions = [];
        positions['kenobi']= [-500, -200];
        positions['skywalker'] = [100, -100];
        positions['sato'] =[500, 100];
        this.name = obj.name;
        this.position =new Point(...positions[obj.name]);
        this.distance = obj.distance || 0;
        this.message = obj.message || [];
    }


    /**
     * Valido algunas condiciones del mensaje
     * por ej. que no sea vacio
     * @return boolean
     */
    hasValidMessage(){
      return this.message.length > 0;
    }

    /**
     * Persisto en dynamoDB
     */
     save(){
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {...this}
        };

         return dbclient.put(params).promise();
    }

}

module.exports = { Satellite }