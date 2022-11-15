const tape = require('tape');
const { queries, postQueries } = require('../../dist/index.js');
const { pkWithDocs } = require('../lib/load.cjs');

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
        const cq = queries.catalogQuery({ cv: true });
        const res = await pk.gqlQuery(cq);
        //console.log(JSON.stringify(res, null, 2));
        t.ok(res.data.nDocuments === 4, "catalog has 4 documents");

        const parsed = postQueries.parseChapterVerseMapInDocSets({ docSets: res.data.docSets });
        //console.log(JSON.stringify(parsed, null, 2));
        t.ok(parsed.length === 2, "parsed catalog has 2 docSets");
    }
);

tape(
    `test passageQuery`,
    async t => {
        const pq1 = queries.passageQuery({ reference: "JHN 1:1" });
        const res1 = await pk.gqlQuery(pq1);
        //console.log(JSON.stringify(res1, null, 2));
        t.ok(res1.data.documents[0].cv[0].text.startsWith("In the beginning"), "reference");

        const cv = postQueries.parseScopeLabels({
            scopeLabels: res1.data.documents[0].cv[0].scopeLabels
        });
        //console.log(JSON.stringify(cv, null, 2));
        t.ok(cv.chapter === "1" && cv.verse === "1", "John 1:1");

        const pq2 = queries.passageQuery({
            bookCode: "REV",
            chapter: "21"
        });
        const res2 = await pk.gqlQuery(pq2);
        //console.log(JSON.stringify(res2, null, 2));
        t.ok(res2.data.documents[0].cv[0].scopeLabels[0] === "chapter/21", "bookCode and chapter");

        const passage = postQueries.parsePassageResponse({
            bookCode: "REV",
            data: res2.data
        });
        //console.log(JSON.stringify(passage, null, 2));
        t.ok(passage[0].reference === "REV 21", "Revelation 21");

        const pq3 = queries.passageQuery({
            bookCode: "PSA",
            chapterVerses: "150:1-5"
        });
        const res3 = await pk.gqlQuery(pq3);
        //console.log(JSON.stringify(res3, null, 2));
        t.ok(res3.data.documents[0].cv.length === 5, "bookCode and chapterVerses");
    }
);

tape(
    `test searchForBookCodesQuery`,
    async t => {
        const sbq1 = queries.searchForBookCodesQuery({
            text: "with him",
            docSetId: "eng_web"
        });
        const res1 = await pk.gqlQuery(sbq1);
        //console.log(JSON.stringify(res1, null, 2));
        t.ok(res1.data.docSet.documents.length === 2, "plaintext search");

        const codes = postQueries.searchForBookCodesFilter({ data: res1.data });
        //console.log(JSON.stringify(codes, null, 2));
        t.deepEqual(codes, ["PSA","JHN"], "Psalms and John");

        const sbq2 = queries.searchForBookCodesQuery({
            text: "beginning strong:G0746", //currently cannot just search for a book code with just a strong
            docSetId: "eng_web"
        });
        const res2 = await pk.gqlQuery(sbq2);
        //console.log(JSON.stringify(res2, null, 2));
        t.ok(res2.data.docSet.documents.length === 1, "search with attribute");
    }
);

tape(
    `test searchForPassagesQuery`,
    async t => {
        const spq1 = queries.searchForPassagesQuery({
            text: "God",
            docSetId: "eng_lsv",
            bookCode: "REV"
        });
        const res1 = await pk.gqlQuery(spq1);
        //console.log(JSON.stringify(res1, null, 2));
        t.ok(res1.data.docSet.matches.length === 3, "no blocks or tokens");

        const passages = postQueries.searchForVersesFilter({ data: res1.data });
        //console.log(JSON.stringify(passages, null, 2));
        t.ok(passages.length === 8, "8 matching verses found");

        const spq2 = queries.searchForPassagesQuery({
            text: "Word",
            docSetId: "eng_web",
            bookCode: "JHN",
            blocks: true
        });
        const res2 = await pk.gqlQuery(spq2);
        //console.log(JSON.stringify(res2, null, 2));
        t.ok(res2.data.docSet.document.mainSequence.blocks.length === 2, "with blocks");

        const blocks = postQueries.searchForBlocksFilter({ data: res2.data });
        //console.log(JSON.stringify(blocks, null, 2));
        t.ok(blocks.length === 2, "2 blocks found");

        const spq3 = queries.searchForPassagesQuery({
            text: "strong:H1984",
            docSetId: "eng_web",
            bookCode: "PSA",
            tokens: true
        });
        const res3 = await pk.gqlQuery(spq3);
        //console.log(JSON.stringify(res3, null, 2));
        t.ok(res3.data.docSet.document.cvMatching.length === 6, "with tokens");
        //console.log(JSON.stringify(postQueries.searchForVersesFilter({ data: res3.data }),null,2))
    }
);
