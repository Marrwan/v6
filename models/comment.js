var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    text : String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);

// 2266760771 -MUHAMMAD UTHMAN ZAINAB ZENITH BANK 10K