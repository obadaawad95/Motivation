export default (state, action) => {
  switch (action.type) {
    case "REMOVE_ARTICLE":
      return {
        ...state,
        Articles: state.Articles.filter(
          (article) => article.id !== action.payload
        ),
      };
    case "ADD_ARTICLE":
      return {
        ...state,
        Articles: [...state.Articles, action.payload],
      };

    case "EDIT_ARTICLE":
      return {
        ...state,
        Articles: state.Articles.map((article) =>
          article._id === action.payload.id ? action.payload : article
        ),
      };

    case "GET_ARTICLES":
      return {
        ...state,
        Articles: action.payload,
      };
    default:
      return state;
  }
};
