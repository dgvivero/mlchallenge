const  assert = require('assert');
const { Point } = require('../models/point');
const { Discovery } = require('../services/discovery');

describe('services', function() {
  describe('#GetLocation', function() {
    it('should return Point { x: 0, y: 0 }', function() {

        let check = new Point(0.00,0.00);
        const satA = new Point(-500, -200);
        const satB = new Point(100, -100);
        const satC = new Point(500, 100)
        let p = new Discovery(satA, satB ,satC);
        const ap = Point.distance(satA, check);
        const bp = Point.distance(satB, check);
        const cp = Point.distance(satC, check)
        let ds = [ap, bp, cp]
        console.log(ds)
        let ship = p.GetLocation(ds)
      assert.deepStrictEqual(ship, check );
    });
  });
  describe('#GetMessage', function() {
    it('should return  //"este es  un mensaje//"', function() {
        let check = 'este es un mensaje';
        let p = new Discovery();
        const msg1 = [ 'este', 'es', '', 'mensaje'];
        const msg2 = ['este', '', 'un', 'mensaje'];
        const msg3 = ['', '', 'es', '', 'mensaje'];
        let messages = [msg1, msg2, msg3];
        console.log(messages)
        let decode = p.GetMessage(messages);
        assert.deepStrictEqual(decode, check );
    });
      it('should not return  //"este es  un mensaje//"', function() {
          let check = 'este es un mensaje';
          let p = new Discovery();
          const msg1 = [ 'este', 'es', '', 'mensaje'];
          const msg2 = ['','este', '', 'un', 'mensaje'];
          const msg3 = ['', '', 'es', '', 'mensaje'];
          let messages = [msg1, msg2, msg3];
          console.log(messages)
          let decode = p.GetMessage(messages);
          assert.notDeepStrictEqual(decode, check );
      });
  });
});