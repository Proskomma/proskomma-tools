# proskomma-tools
Helpers to use when building projects around Proskomma

## Setup
```
npm install proskomma-tools
cd proskomma-tools
npm install
```

## Usage
`proskomma-tools` currently exposes 3 objects as an interface to different utility functions for querying `Proskomma`.
- `queries`: functions to generate a query string to be passed to a `Proskomma` instance
- `preQueries`: functions to pre-process data being passed into a query function (most are already called from within the query functions)
- `postQueries`: functions to filter the results of a query
    - `catalogQuery`: `parseChapterVerseMapInDocSets`
    - `passageQuery`: `parsePassageResponse` and `parseScopeLabels`
    - `searchForBookCodesQuery`: `searchForBookCodesFilter`
    - `searchForPassagesQuery`: `searchForBlocksFilter` and `searchForVersesFilter`

### Example
This example assumes you already have a `Proskomma` instance that has been populated with scripture data.
```js
//import statements
import { queries, preQueries, postQueries } from 'proskomma-tools';

//separate "JHN 3:16" into a bookCode and chapter/chapterVerses
const reference = preQueries.parseReferenceString("JHN 3:16");

//string to pass to Proskomma.gqlQuery()
const queryString = queries.passageQuery({
    bookCode: reference.bookCode,
    chapterVerses: reference.chapterVerses
    /*
        passageQuery can take 3 different combinations of parameters:
        1. bookCode and chapter
        2. bookCode and chapterVerses
        3. reference

        In option 3, passageQuery internally calls preQueries.parseReferenceString 
        to separate reference out into a bookCode and chapter/chapterVerses.
    */
});

/*
    call gqlQuery method on Proskomma instance that for the purposes of the example 
    is located elsewhere and has been pre-populated with scripture
*/
const result = pk.gqlQuerySync(queryString);

//an array of objects with properties docSetId, reference, and text.
const passages = postQueries.parsePassageResponse({
    bookCode: reference.bookCode,
    data: result.data
});

//print to console [optional]
console.log(JSON.stringify(passages, null, 2));
```
