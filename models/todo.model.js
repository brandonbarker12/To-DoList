const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDoSchema = new Schema({
    item: {type: String, required: true, max:100},
    done: {type: Boolean, required: true}
});

module.exports = mongoose.model('Todo', ToDoSchema);