import { Entity, Schema } from 'redis-om'

import client from './client.js'

class Person extends Entity { }

const personSchema = new Schema(Person, {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: { type: 'number' },
    verified: { type: 'boolean' },
    location: { type: 'point' }, // Redis-OM will automatically convert this to a Redis Geo type long lat
    locationUpdated: { type: 'date' },
    skills: { type: 'string[]' },
    personalStatment: { type: 'string' },
})

export const personRepository = client.fetchRepository(personSchema)