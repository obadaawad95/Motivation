import React, { useContext, useReducer, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { CategoryContext } from "../states/contexts/CategoryContext";
const editCatReducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};
const initialState = {
  type: "",
};
export default function EditCat({ id }) {
  const { Cats, editcategory } = useContext(CategoryContext);
  const tempCat = Cats.find((a) => a.id === id);
  const [state, dispatch] = useReducer(editCatReducer, initialState);
  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, payload: event.target.value });
  };
  const labelStyles = useLabelIconStyles({ linked: true });
  const [open, setOpen] = React.useState(false);
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
    if (tempCat) {
      dispatch({
        type: "updateFieldValue",
        field: "type",
        payload: tempCat.type,
      });
    }
  }, [tempCat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const EditedCat = {
      id,
      type: state.type,
    };
    editcategory(EditedCat);
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
          <h1> Edit Category</h1>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ backgroundColor: "#868585" }}>
            <div>
              <input
                type="type"
                placeholder="Type of Article"
                id="type"
                className="admin-input"
                onChange={updateFieldValue("type")}
                value={state.type}
              />
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
              EDIT CATRGOTY
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
