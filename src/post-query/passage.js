export const parsePassageResponse = ({ bookCode, data }) => {
    let passages = [];

    data.documents.forEach((doc) => {
        doc.cv.forEach(({ scopeLabels, text }) => {
        const { chapter, verse } = parseScopeLabels({ scopeLabels });
        const verseReference = verse ? `:${verse}` : '';
        const passage = {
            docSetId: doc.docSetId,
            reference: `${bookCode} ${chapter}${verseReference}`,
            text,
        };
        passages = [...passages, passage];
        });
    });
    return passages;
};

export const parseScopeLabels = ({ scopeLabels }) => {
    const chapter = scopeLabels?.filter((sl) => sl.startsWith('chapter'))[0].split('/')[1];
    const verses = scopeLabels?.filter((sl) => sl.startsWith('verse')).map(v => v.split('/')[1]);
    const verse = verses[verses.length - 1];

    return { chapter, verse };
};