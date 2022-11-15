const searchForBookCodesFilter = ({ data }) => {
    let bookCodes = [];
  
    if (data && data.docSet && data.docSet.documents) {
      bookCodes = data?.docSet?.documents?.map((book) => book.bookCode);
    };
    return bookCodes;
};

export default searchForBookCodesFilter;