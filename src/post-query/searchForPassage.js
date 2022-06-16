export const searchForBlocksFilter = ({ data }) => {
    let passages = [];

    passages = data?.docSet?.document?.mainSequence?.blocks?.map(block => {
        const docSetId = data.docSet.id;
        const bookCode = data.docSet.document.bookCode;
        const chapter = block.scopeLabels.filter(sl => sl.startsWith('chapter'))[0].split('/')[1];
        const verses = block.scopeLabels.filter(sl => sl.startsWith('verse'))
            .map(sl => sl.split('/')[1]).map(vns => parseInt(vns));
        const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
        const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
        // const matches = data.docSet.matches.map(m => m.matched);
        const itemGroups = block.itemGroups;
        const text = itemGroups.map(itemGroup => itemGroup.text).join(' ');

        return {
            docSetId,
            reference,
            text,
        };
    });
    return passages;
};

export const searchForVersesFilter = ({ data }) => {
    let passages = [];

    passages = data?.docSet?.document?.cvMatching?.map(cvMatch => {
        const docSetId = data.docSet.id;
        const bookCode = data.docSet.document.bookCode;
        const chapter = cvMatch.scopeLabels.filter(sl => sl.startsWith('chapter'))[0].split('/')[1];
        const verses = cvMatch.scopeLabels.filter(sl => sl.startsWith('verse'))
            .map(sl => sl.split('/')[1]).map(vns => parseInt(vns));
        const verse = (verses.length > 1) ? `${verses[0]}-${verses[verses.length - 1]}` : verses[0];
        const reference = `${bookCode} ${chapter}:${verse}`; // {bookCode, chapter, verse};
        // const matches = data.docSet.matches.map(m => m.matched);
        const text = cvMatch.text;

        return {
            docSetId,
            reference,
            text,
        };
    });
    return passages;
};