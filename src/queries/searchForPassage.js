import {
    searchTermsClause,
    attTermsClause,
    searchTermsRegex,
  } from '../pre-query/index.js';
  
const searchForPassagesQuery = ({
text, docSetId, bookCode, blocks = false, tokens = false,
}) => {
    const _searchTermsClause = searchTermsClause(text);
    const _attTermsClause = attTermsClause(text);
    const _searchTermsRegex = searchTermsRegex(text);

    const _tokensClause = tokens ? `tokens {
                subType
                payload
                scopes(
                    startsWith:[
                    "attribute/spanWithAtts/w/"
                    "attribute/milestone/zaln/"
                    ]
                )
                }
    `: '';

    const _blocksClause = `mainSequence {
            blocks(
            allChars : true
            withMatchingChars: [${_searchTermsClause}]
            withScopes: [${_attTermsClause}]
            ) {
            scopeLabels(startsWith:["chapter/", "verse/"])
            itemGroups(byScopes:["chapter/", "verses/"]) {
                scopeLabels(startsWith:["verses/"])
                text
                ${_tokensClause}          }
            }
        }`;

    const _versesClause = `cvMatching(
            allChars : true
            allScopes : true
            withMatchingChars: [${_searchTermsClause}]
            withScopes: [${_attTermsClause}]
        ) {
            scopeLabels(startsWith:["chapter/", "verse/"])
            text
            ${_tokensClause}      }`;

    const _blocksOrVersesClause = blocks ? _blocksClause : _versesClause;

    const blockMatchQuery = (
        `{
    docSet(id:"${docSetId}") {
        id
        document(
        bookCode:"${bookCode?.toUpperCase()}" 
        ) {
        id
        bookCode: header(id: "bookCode")
        ${_blocksOrVersesClause}
        }
        matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"${_searchTermsRegex}") { matched }
    }
    }`
    );
    return blockMatchQuery;
};

export default searchForPassagesQuery;  