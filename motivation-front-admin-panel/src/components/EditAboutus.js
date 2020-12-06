import React, { useState, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHttpClient } from "../hooks/http-hook";

export default function EditArticle({ ab }) {
  const { sendRequest } = useHttpClient();
  const [title, setTitle] = useState();
  const [aboutus, setAboutus] = useState("");
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
    if (ab) {
      setTitle(ab.title);
      setAboutus(ab.description);
    } else {
      setTitle("");
      setAboutus("");
    }
  }, [ab]);
  const handleSubmit = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/aboutus/${ab.id}`,
        "PATCH",
        JSON.stringify({
          title: title,
          description: aboutus,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="admin-button"
        style={{ outline: "none" }}
      >
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
          <h1> Edit About Us Page</h1>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ backgroundColor: "#868585" }}>
            <div>
              <input
                type="Tile"
                placeholder="Title"
                id="Title"
                className="admin-input"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <textarea
                onChange={(e) => setAboutus(e.target.value)}
                value={aboutus}
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
              EDIT AboutUs
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
