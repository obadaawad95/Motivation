import React, {
  useContext,
  useReducer,
  useEffect,
  useRef,
  useState,
} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { BooksContext } from "../states/contexts/BooksContext";

const editBookReducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};
const initialState = {
  title: "",
  undertitle: "",
  description: "",
};
export default function EditArticle({ id }) {
  const { Books, editBook } = useContext(BooksContext);
  const tempBook = Books.find((a) => a.id === id);
  const [state, dispatch] = useReducer(editBookReducer, initialState);
  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, payload: event.target.value });
  };
  const labelStyles = useLabelIconStyles({ linked: true });
  const [open, setOpen] = useState(false);
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (tempBook) {
      dispatch({
        type: "updateFieldValue",
        field: "title",
        payload: tempBook.title,
      });
      dispatch({
        type: "updateFieldValue",
        field: "undertitle",
        payload: tempBook.undertitle,
      });
      dispatch({
        type: "updateFieldValue",
        field: "description",
        payload: tempBook.description,
      });
    }
  }, [tempBook]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const EditedBook = {
      id,
      title: state.title,
      undertitle: state.undertitle,
      description: state.description,
    };
    editBook(EditedBook);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className={labelStyles.link}
        style={{ outline: "none" }}
      >
        <EditIcon className={labelStyles.icon} />
        Edit
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            backgroundColor: "#DDB091",
            color: "#B93946",
            fontWeight: "bolder",
            textAlign: "center",
          }}
        >
          <h1> Edit Book</h1>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent style={{ backgroundColor: "#868585" }}>
            <div className="paperUserInfo">
              <div>
                <input
                  type="Tile"
                  placeholder="Title"
                  id="Title"
                  className="admin-input"
                  onChange={updateFieldValue("title")}
                  value={state.title}
                />
                <input
                  type="UnderTitle"
                  placeholder="UnderTitle"
                  id="UnderTitle"
                  className="admin-input"
                  onChange={updateFieldValue("undertitle")}
                  value={state.undertitle}
                />
                {/* <ImageUpload id="image" center onInput={imghandler} /> */}

                <textarea
                  onChange={updateFieldValue("description")}
                  value={state.description}
                  placeholder="Description"
                  required
                  cols={52}
                  rows={20}
                  style={{
                    backgroundColor: "#C8C8C8",
                    border: "1px solid ",
                    width: "100%",
                    borderColor: "transparent",
                    fontSize: 20,
                    resize: "none",
                  }}
                ></textarea>
              </div>
            </div>
          </DialogContent>
          <DialogActions style={{ backgroundColor: "#DDB091" }}>
            <button
              onClick={() => setOpen(false)}
              color="primary"
              className="admin-button"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              color="primary"
              className="admin-button"
              type="submit"
            >
              EDIT Book
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
