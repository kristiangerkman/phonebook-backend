require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");
const cors = require("cors");

app.use(cors());
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

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

app.get("/info", (req, res) => {
  res.send(
    `<div><p>Phonebook has info for ${
      persons.length
    } people </p> ${new Date()} </div>`
  );
});

const genereateId = () => Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
const isInPersons = name => {
  const persons = [];
  Person.find({}).then(persons => {
    persons.concat(person);
  });
  console.log(persons.length !== 0);
  if (persons.length !== 0) {
    return Person.find({ name: name }).then(person => person.name === name)
      .length === 0
      ? false
      : true;
  } else {
    return false;
  }
};

const findAndReplace = () => {
  Person.find({ name: body.name }).then(person => {
    app.put(`/api/persons/${person.id}`, (req, res, next) => {
      const person_ = { name: person.name, number: body.number };
      Person.findByIdAndUpdate(person.id, person_, { new: true })
        .then(updatedPerson => {
          res.json(updatedPerson.toJSON());
        })
        .catch(error => next(error));
    });
  });
  return;
};
app.post("/api/persons", (req, res) => {
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
  } else if (isInPersons(body.name)) {
    Person.find({ name: body.name }).then(person => {
      console.log(person);
      app.put(`/api/persons/${person.id}`, (req, res, next) => {
        const person_ = { name: person.name, number: body.number };
        Person.findByIdAndUpdate(person.id, person_, { new: true })
          .then(updatedPerson => {
            res.json(updatedPerson.toJSON());
          })
          .catch(error => next(error));
      });
    });
    return;
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: genereateId()
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
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
