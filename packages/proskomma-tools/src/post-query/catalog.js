const parseChapterVerseMapInDocSets = ({ docSets: _docSets }) => {
    let docSets = (_docSets?.length > 0) ? JSON.parse(JSON.stringify(_docSets)) : [];
  
    docSets?.forEach((docSet) => {
      if (docSet?.selectors?.forEach) {
        const selectors = {};
  
        docSet.selectors.forEach(({ key, value }) => {
          selectors[key] = value;
        });
        docSet.selectors = selectors;
      }
  
      if (docSet?.tagsKv?.forEach) {
        const tags = {};
  
        docSet.tagsKv.forEach(({ key, value }) => {
          tags[key] = value;
        });
        delete docSet.tagsKv;
        docSet.tags = tags;
      }
  
      docSet.documents.forEach((document) => {
        if (document?.cvNumbers) {
          let chaptersVersesObject = {};
  
          document?.cvNumbers?.forEach(({ chapter, verses }) => {
            let versesObject = {};
  
            verses.forEach(({ number, range }) => {
              versesObject[number] = range;
            });
            chaptersVersesObject[chapter] = versesObject;
          });
  
          delete document.cvNumbers;
          document.versesByChapters = chaptersVersesObject;
        }
      });
    });
      
    return docSets;
};

export default parseChapterVerseMapInDocSets;