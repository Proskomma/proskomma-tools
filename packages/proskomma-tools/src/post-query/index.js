import parseChapterVerseMapInDocSets from "./catalog.js";
import { parsePassageResponse, parseScopeLabels } from "./passage.js";
import searchForBookCodesFilter from "./searchForBookCodes.js";
import { searchForBlocksFilter, searchForVersesFilter } from "./searchForPassage.js";

const postQueries = { 
    parseChapterVerseMapInDocSets, 
    parsePassageResponse, 
    parseScopeLabels,
    searchForBlocksFilter,
    searchForBookCodesFilter,
    searchForVersesFilter
}
export default postQueries;