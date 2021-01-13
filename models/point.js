 class Point {
    constructor(x,y){
        this.x = x || 0;
        this.y = y || 0;
    }
    
    static distance(a, b){
        const dx = Math.pow((b.x - a.x),2);
        const dy = Math.pow((b.y - a.y),2); 
        return Math.sqrt(dx + dy);
    }

}

module.exports = { Point };
