var MockRobot = require("../"),
    robotCtx = new MockRobot(),
    expect = require("chai").expect;

describe("Intercepts http behavior",function() {
    var executedGetCallback = false;
    var executedPostCallback = false;
    var executedPutCallback = false;
    
    it("captures get",function(done) {
        robotCtx.hear(/get/,function(res) {
            robotCtx.http("http://someget.com").get(function(err,second,third) {
                executedGetCallback = true;
            });
        });
        
        robotCtx.ExecHear("get",function(matched, msgCtx, err) {
            expect(err).to.be.null;
            expect(matched).to.be.true;
            expect(executedGetCallback).to.be.true;
            done();
        });
    });
    
    it("captures post", function(done) {
        robotCtx.hear(/post/,function(res) {
            robotCtx.http("http://somepost.com").post(function(err,second,third) {
                executedPostCallback = true;
            });
        });
        
        robotCtx.ExecHear("post", function(matched, msgCtx, err) {
            expect(err).to.be.null;
            expect(matched).to.be.true;
            expect(executedPostCallback).to.be.true;
            done();
        });
    });
    
    it("captures put", function(done) {
        robotCtx.hear(/put/,function(res) {
            robotCtx.http("http://someput.com").put(function(err,second,third) {
                executedPutCallback = true;
            });
        });
        
        robotCtx.ExecHear("put", function(matched, msgCtx, err) {
            expect(err).to.be.null;
            expect(matched).to.be.true;
            expect(executedPutCallback).to.be.true;
            done();
        });
    });
    
    it("captures headers", function(done) {
        var executedCallback = false;
        var httpcontext;
        
        robotCtx.hear(/headerTest/,function(res) {
            httpcontext = robotCtx.http("http://headers.com")
                    .header("Test-Header","TestValue");
            
            httpcontext.get(function(err,second,third) {
                executedCallback = true;
            });
        });
        
        robotCtx.ExecHear("headerTest",function(matched, msgCtx, err) {
            expect(err).to.be.null;
            expect(matched).to.be.true;
            expect(executedCallback).to.be.true;
            
            expect(httpcontext).not.to.be.null;
            expect(httpcontext.headers["Test-Header"]).not.be.null;
            expect(httpcontext.headers["Test-Header"]).to.be.equal("TestValue");
            done();
        });
    });
    
    describe("Can return custom responses", function() {
        it("for get", function(done) {
            var executedCallback = false;
            var httpcontext;
            
            done(new Error("Not Implemented"))
        })
        
        it("for put", function(done) {
            done(new Error("Not Implemented"))
        });   
        
        it("for post", function(done) {
            done(new Error("Not Implemented"))
        });    
    });
    
});