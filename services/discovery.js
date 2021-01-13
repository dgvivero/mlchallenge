const { Point } = require('../models/point');
const { Satellite } = require('../models/satellite');

class Discovery {
    constructor(satA, satB, satC){
        this.k_pos = satA; //
        this.s_pos = satB; //
        this.t_pos = satC; //
    }

    /**
     * Algoritmo https://confluence.slac.stanford.edu/display/IEPM/TULIP+Algorithm+Alternative+Trilateration+Method
     * @param {array }distances
     * @return {Point}
     */
    GetLocation(distances){
        const [d1, d2, d3] = distances;
        const x = this.x_pos(...distances);
        const y = this.y_pos(d1, d2, x);
        return new Point(x, y);
    }

    /**
     *
     * @param {array} messages
     * @return {string}
     */
    GetMessage(messages){
        let norm_mess = this.limpioDesplazamientos(messages)
        console.log(norm_mess)
        const [m1, m2, m3]= norm_mess;
        const decode_msg = new Set();
        for (let idx = 0;  idx<m1.length; idx++ ){
            let word = new Set([m1[idx], m2[idx], m3[idx]]);
            word.delete('');
            decode_msg.add(...word);
        }
        console.log(...decode_msg)
        return  [...decode_msg].join(' ')
    }

    /**
     * Limpio los desplazamientos en los mensajes
     * Restriccion:
     * Debe estar al inicio y siempre hay un mensaje sin desplazamiento
     * siendo el de menor longitud
     * @param {array} messages - Coleccion de mensajes de los sat.
     * @return {array} messages
     */
    limpioDesplazamientos(messages){
        let lgt = messages.map(e=> e.length);
        let desplazamiento = Math.max(...lgt) - Math.min(...lgt);
        if (desplazamiento > 0 ){
            let idx = lgt.indexOf(Math.max(...lgt));
            for(let i=0; i==desplazamiento; i++){
                messages[idx].shift();
            }
        }
        return [...messages];
    }


    x_pos(r1, r2, r3) {
      
      const t1 = r1**2 - r2**2 + this.s_pos.x**2 + this.s_pos.y**2 - this.k_pos.x**2 - this.k_pos.y**2;
      const t1m = 2 * this.t_pos.y - 2 * this.s_pos.y; 
      
      const t2 = r2**2 - r3**2 + this.t_pos.x**2 - this.s_pos.x**2 + this.t_pos.y**2 - this.s_pos.y**2
      const t2m = 2 * this.s_pos.y - 2 * this.k_pos.y;
      const divisor =  4 * (this.s_pos.x - this.t_pos.x) * (this.s_pos.y - this.k_pos.y) -  4 * (this.k_pos.x - this.s_pos.x) * (this.t_pos.y - this.s_pos.y);
      let x;
      try {
         x = (t1 * t1m  -  t2 * t2m ) / divisor
      } catch(e){
          //division por cero o dato en null
        console.log(e)
      }
      
      return x;
    }

    y_pos(r1, r2, x) {
        const t1 = r1**2 - r2**2 + this.s_pos.x**2 - this.k_pos.x**2 + this.s_pos.y**2 - this.k_pos.y**2
        const t2 = 2 * this.k_pos.x - 2 * this.s_pos.x;
        const divisor = 2 * this.s_pos.y  - 2 * this.k_pos.y;
        let y;
        try{ 
             y = ( t1 + x * t2) / divisor
        }catch(e){
            console.log(e)
        }
        return y 
    }

}



module.exports = { Discovery }