import tape from 'tape';
import { queries } from '../../src/index.js';
import { pkWithDocs } from '../lib/load.cjs';

const pk = pkWithDocs([
    ['../test_data/lsv-exo20.usfm', {
        lang: 'eng',
        abbr: 'lsv',
    }],
    ['../test_data/lsv-rev21.usfm', {
        lang: 'eng',
        abbr: 'lsv',
    }],
    ['../test_data/web-psa150.usfm', {
        lang: 'eng',
        abbr: 'web',
    }],
    ['../test_data/web-jhn1.usfm', {
        lang: 'eng',
        abbr: 'web',
    }],
]);

tape(
    `test catalogQuery`,
    async t => {
        const catalogQuery = queries.catalogQuery({ cv: true});

        const res = await pk.gqlQuery(catalogQuery);

        console.log(JSON.stringify(res, null, 2));
    }
);

