const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as an argument");
  process.exit();
}

const url = `mongodb+srv://fullstack:${
  process.argv[2]
}@cluster0-i5urs.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: String(process.argv[3]),
  number: String(process.argv[4])
});

if (process.argv.length === 5) {
  person.save().then(res => {
    console.log(`Added ${person.name} number ${person.number} to the database`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then(res => {
    console.log("Phonebook: ");
    res.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
