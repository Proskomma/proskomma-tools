import {
  searchTermsClause,
  attTermsClause,
} from '../pre-query/index.js';

const searchForBookCodesQuery = ({ text, docSetId }) => {
  const _searchTermsClause = searchTermsClause(text);
  const _attTermsClause = attTermsClause(text);

  const _sortClause = 'sortedBy: "paratext"';

  const bookCodeMatchQuery = `{
    docSet( id:"${docSetId}" ) {
      documents(` +
    _sortClause + `
        allChars: true
        withMatchingChars: [${_searchTermsClause}]
${(_attTermsClause.length > 0) ?
      `        withScopes: [${_attTermsClause}]
        allScopes: true
` : ''
    }      ) {
        bookCode: header( id:"bookCode" ) 
      }
    }
  }`;
  return bookCodeMatchQuery;
};

export default searchForBookCodesQuery;