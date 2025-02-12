import { Router } from "express";

import { personRepository } from "../om/person.js";


export const personRouter = Router();

// Create a new person
personRouter.post("/", async (req, res) => {
    const person = await personRepository.save(req.body);
    res.send(person);
});

// Get a person by ID
personRouter.get("/:id", async (req, res) => {
    const person = await personRepository.fetch(req.params.id);
    res.send(person);
});

// Update a person by ID
personRouter.put("/:id", async (req, res) => {
    const person = await personRepository.fetch(req.params.id);

    person.firstName = req.body.firstName ?? person.firstName;
    person.lastName = req.body.lastName ?? person.lastName;
    person.age = req.body.age ?? person.age;
    person.verified = req.body.verified ?? person.verified;
    person.location = req.body.location ?? person.location;
    person.locationUpdated = req.body.locationUpdated ?? person.locationUpdated;
    person.skills = req.body.skills ?? person.skills;
    person.personalStatement = req.body.personalStatement ?? person.personalStatement;

    await personRepository.save(person)
    res.send(person);
});

// Delete a person by ID
personRouter.delete("/:id", async (req, res) => {
    await personRepository.remove(req.params.id);
    res.send(`Person with ID ${req.params.id} has been deleted`);
});