import parseChapterVerseMapInDocSets from "./catalog";
import { parsePassageResponse, parseScopeLabels } from "./passage";
import searchForBookCodesFilter from "./searchForBookCodes";
import { searchForBlocksFilter, searchForVersesFilter } from "./searchForPassage";

const postQueries = { 
    parseChapterVerseMapInDocSets, 
    parsePassageResponse, 
    parseScopeLabels,
    searchForBlocksFilter,
    searchForBookCodesFilter,
    searchForVersesFilter
}
export default postQueries;