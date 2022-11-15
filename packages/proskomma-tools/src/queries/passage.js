import { parseReferenceString } from "../pre-query/index.js";
const passageQuery = ({
    reference,
    bookCode: _bookCode,
    chapterVerses: _chapterVerses,
    chapter: _chapter,
  }) => {
    let query;
    let bookCode = _bookCode;
    let chapterVerses = _chapterVerses;
    let chapter = _chapter;
  
    if (reference) {
      const parsed = parseReferenceString(reference);
      bookCode = parsed.bookCode;
      chapterVerses = parsed.chapterVerses;
      chapter = parsed.chapter;
    };
  
    let _scope = scope({ bookCode });
  
    let clause = (chapterVerses) ?
      chapterVersesClause({ chapterVerses }) :
      chapterClause({ bookCode, chapter });
  
    query = `{
      ${_scope} {
        docSetId
        cv ( ${clause} ) { scopeLabels text }
      }
    }`;
  
    return query;
};

const scope = ({ bookCode }) => `documents ( withBook: "${bookCode}" )`;

const chapterVersesClause = ({ chapterVerses }) => `chapterVerses: "${chapterVerses}"`;

const chapterClause = ({ chapter }) => `chapter: "${chapter}"`;

export default passageQuery;