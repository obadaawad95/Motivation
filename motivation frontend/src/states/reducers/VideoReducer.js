export default (state, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...state,
        Videos: action.payload,
      };
    default:
      return state;
  }
};
