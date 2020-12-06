export default (state, action) => {
  switch (action.type) {
    case "REMOVE_CAT":
      return {
        ...state,
        Cats: state.Cats.filter((cat) => cat.id !== action.payload),
      };
    case "ADD_CAT":
      return {
        ...state,
        Cats: [...state.Cats, action.payload],
      };

    case "EDIT_CAT":
      return {
        ...state,
        Cats: state.Cats.map((cat) =>
          cat._id === action.payload.id ? action.payload : cat
        ),
      };

    case "GET_CAT":
      return {
        ...state,
        Cats: action.payload,
      };
    default:
      return state;
  }
};
