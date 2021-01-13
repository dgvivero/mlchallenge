const { spawn } = require('child_process');
let e2eTest;
exports.mochaHooks = {
    beforeAll(){
        e2eTest = spawn('serverless', ['offline']);
        const e2elog = new Promise((resolve) => {
            e2eTest.stdout.on('data', function (data) {
                console.log('e2e (' + e2eTest.pid + '): ' + data);
                if(data.includes(' [HTTP] server ready:')) resolve()
            });
        });
        return Promise.all([e2elog])
    },
    afterAll(done) {
        e2eTest.kill('SIGINT');
        done()
    }
};




