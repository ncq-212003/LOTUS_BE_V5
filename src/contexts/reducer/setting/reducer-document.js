const initialStateDocument = {
  documents: []
};

const HANDLERS_DOCUMENT = {
  LIST_DOCUMENTS: 'LIST_DOCUMENTS',
  ADD_DOCUMENTS: 'ADD_DOCUMENTS',
  UPATE_DOCUMENTS: 'UPATE_DOCUMENTS',
  FIND_DOCUMENTS_BYID: 'FIND_DOCUMENTS_BYID'
};

const handlersDocument = {
  [HANDLERS_DOCUMENT.ADD_DOCUMENTS]: (state, action) => {
    const document = action.payload;
    return {
      ...state,
      documents: [...state, document]
    };
  },

  [HANDLERS_DOCUMENT.LIST_DOCUMENTS]: (state, action) => {
    const document = action.payload;

    return {
      ...state,
      documents: document
    }
  },

  [HANDLERS_DOCUMENT.UPATE_DOCUMENTS]: (state, action) => {
    return state;
  },

  [HANDLERS_DOCUMENT.FIND_DOCUMENTS_BYID]: (state, action) => {
    const document = action.payload;

    return document;
  }
};

const reducerDocument = (state, action) =>
  handlersDocument[action.type] ? handlersDocument[action.type](state, action) : state;
export { initialStateDocument, reducerDocument, HANDLERS_DOCUMENT };
