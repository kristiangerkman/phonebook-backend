require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");
const cors = require("cors");

app.use(express.static("build"));
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(bodyparser.json());

morgan.token("person", function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        unknownEndpoint(req, res);
      }
    })
    .catch(error => {
      errorHandler(error, req, res);
    });
});

//
/* app.get("/info", (req, res) => {
  res.send(
    `<div><p>Phonebook has info for ${
      persons.length
    } people </p> ${new Date()} </div>`
  );
}); */

//const genereateId = () => Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

const inList = name => {
  const persons = [];
  Person.find({})
    .then(person => {
      persons.concat(person);
    })
    .catch(error => console.log(error));
  if (persons.length !== 0) {
    return Person.find({ name: name }).then(person => person.name === name)
      .length === 0
      ? false
      : true;
  } else {
    return false;
  }
};

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name && !body.number) {
    return res.status(400).json({
      error: "Fill out the from"
    });
  } else if (!body.name) {
    return res.status(400).json({
      error: "Name missing"
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "Number missing"
    });
  } else if (inList(body.name)) {
    const oldPerson = [];
    Person.find({ name: body.name }).then(person => oldPerson.concat(person));

    const newPerson = {
      name: oldPerson.name,
      number: body.name
    };

    Person.findByIdAndUpdate(oldPerson.id, newPerson, { new: true })
      .then(updatedPerson => {
        res.json(updatedPerson.toJSON());
      })
      .catch(error => next(error));
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
      //id: genereateId()
    });

    person
      .save()
      .then(savedPerson => {
        res.json(savedPerson);
      })
      .catch(error => next(error));
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  /*   const result = Person.findOne({ username: body.name });
  if (result.length > 0) {
    result.status(404).end();
  } */

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
