const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =`mongodb://127.0.0.1:27017/test`;

const skeema = new mongoose.Schema({
    name:String,
    number:String
});

const personModel = mongoose.model("phonebook", skeema);

mongoose.set('strictQuery', false);
mongoose.connect(url);

if (name) {
    const person = new personModel({
        name:name,
        number:number
    })

    person.save().then((result) => {
        console.log("added " + name + " number " + number + " to phonebook")
        mongoose.connection.close();
    })
} else {
    personModel.find({}).then((result) => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close();
    })
}


