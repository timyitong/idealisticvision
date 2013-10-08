module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var ObjectId= Schema.ObjectId;

//Course:
    var Course = new Schema({
        uid: ObjectId,
        name: String,
        ctime: {type:Date, default:Date.now}
    });
    this.CourseModel = mongoose.model('Course', Course);

//Presentation:
    var Presentation = new Schema({
        cid: ObjectId,
        title:   String,
        content: String,
        ctime: {type:Date, default:Date.now}
    });
    this.PresentationModel = mongoose.model('Presentation', Presentation);

// End of this file
    return this;
}
