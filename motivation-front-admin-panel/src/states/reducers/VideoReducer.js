export default (state, action) => {
  switch (action.type) {
    case "REMOVE_VIDEO":
      return {
        ...state,
        Videos: state.Videos.filter((video) => video.id !== action.payload),
      };
    case "ADD_VIDEO":
      return {
        ...state,
        Videos: [...state.Videos, action.payload],
      };

    case "EDIT_VIDEO":
      return {
        ...state,
        Videos: state.Videos.map((video) =>
          video._id === action.payload.id ? action.payload : video
        ),
      };

    case "GET_VIDEOS":
      return {
        ...state,
        Videos: action.payload,
      };
    default:
      return state;
  }
};
