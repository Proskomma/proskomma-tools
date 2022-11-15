export const searchTerms = (text) => (
    text.split(/ +/)
      .map((term) => term.trim())
      .filter((term) => term.length > 0)
      .filter(term => !term.includes(':'))
  );
  
  export const searchTermsClause = (text) => (
searchTerms(text)
    .map(st => `"${st.toLowerCase()}"`).join(', ')
);
  
export const attTermsClause = (text) => (
text.split(/ +/)
    .map((term) => term.trim())
    .filter((term) => term.length > 0)
    .filter(term => term.includes(':'))
    .map(term => term.split(':').slice(0, 2))
    .map(st => {
    const isMilestone = st[0].startsWith('x-');
    const attribute = isMilestone ? 'milestone' : 'spanWithAtts';
    const marker = isMilestone ? 'zaln' : 'w';
    return `"""attribute/${attribute}/${marker}/${st[0]}/0/${st[1]}"""`;
    }).join(', ')
);
  
export const searchTermsRegex = (text) => {
    const _searchTerms = searchTerms(text);
    let regex = 'xxxxx';

    if (_searchTerms.length > 0) {
        regex = _searchTerms.map(st => `(${st})`).join('|');
    };
    return regex;
};

export const parseReferenceString = (reference) => {
    let response = {};
    // 3JN 1:1-2 PSA 119:100 MAT 1-2
    const regex = /(?<bookCode>[\d\w]\w{2}) (?<cv>(?<c>\d+):?(?<v>[\d-]*))/;
    const { bookCode, cv, c, v } = reference.match(regex).groups || {};
    response.bookCode = bookCode;
  
    if (cv.includes(':') && !!v) {
      response.chapterVerses = cv;
    } else if (!!c && !v) {
      response.chapter = c;
    };
  
    return response;
  };

const preQueries = { searchTerms, searchTermsClause, attTermsClause, searchTermsRegex, parseReferenceString };

export default preQueries;