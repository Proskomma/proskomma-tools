import {queries} from '../src/index.js';

const {catalogQuery} = queries;

console.log(
    catalogQuery({cv: true})
);
