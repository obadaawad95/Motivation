export default (state, action) => {
  switch (action.type) {
    case "REMOVE_BOOK":
      return {
        ...state,
        Books: state.Books.filter((book) => book.id !== action.payload),
      };
    case "ADD_BOOK":
      return {
        ...state,
        Books: [...state.Books, action.payload],
      };
    case "EDIT_BOOK":
      return {
        ...state,
        Books: state.Books.map((book) =>
          book._id === action.payload.id ? action.payload : book
        ),
      };
    case "GET_BOOKS":
      return {
        ...state,
        Books: action.payload,
      };
    default:
      return state;
  }
};
