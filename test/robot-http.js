require('coffee-script')
require('coffee-script/register')
var MockRobot = require('../'),
    robotCtx = new MockRobot(),
    expect = require('chai').expect
    
function TestHttp(robot) {
    robot.hear(/http/,function(res) {
        res.http("http://someplay.com").get()
    })
}
    

describe("Intercepts http behavior",function() {
    var testScript = new TestHttp(robotCtx);
    
    it('captures get',function(done) {
        robotCtx.ExecHear('http',function(matched, msgCtx, err) {
            expect(matched).to.be.true
            
            done();
        })
    })
})