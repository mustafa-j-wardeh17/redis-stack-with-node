import { Router } from "express";
import { personRepository } from "../om/person.js";



export const searchRouter = Router();

searchRouter.get('/all', async (req, res) => {
    const persons = await personRepository.search().return.all();
    res.send(persons);
});


searchRouter.get('/by-last-name/:lastName', async (req, res) => {
    const lastName = req.params.lastName;
    const persons = await personRepository.search().where('lastName').match(new RegExp(lastName, 'i')).return.all();
    res.send(persons);
});

searchRouter.get('/old-enough-to-drive-car', async (req, res) => {
    const persons = await personRepository.search().where('age').gte(18).return.all();
    res.send(persons);
});


searchRouter.get('/non-verified', async (req, res) => {
    const persons = await personRepository.search().where('verified').is.not.true().return.all();
    res.send(persons);
});


searchRouter.get('/verified-how-can-drive-with-last-name/:lastName', async (req, res) => {
    const lastName = req.params.lastName;

    const persons = await personRepository.search()
        .where('lastName').match(new RegExp(lastName, 'i'))
        .and('verified').is.true()
        .and('age').gte(18).return.all();

    res.send(persons);
});



searchRouter.get('/near/:lng,:lat/radius/:radius', async (req, res) => {
    const lng = Number(req.params.lng);
    const lat = Number(req.params.lat);
    const radius = Number(req.params.radius); 

    const persons = await personRepository.search()
    .where('location')
    .inRadius(circle=>circle
        .longitude(lng)
        .latitude(lat)
        .radius(radius)
        .miles
    ).return.all();

    res.send(persons);
});