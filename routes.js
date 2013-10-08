module.exports = function(app, models){
    // Lib:
    var ObjectId = app.mongoose.Types.ObjectId;
    
    //index:
    app.get('/', authenticate, function (req,res){
        res.send("hello");
    })
}
