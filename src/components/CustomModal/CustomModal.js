import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",

  width: "80%",
  height: "90%",
  overflow: "scroll",
  bgcolor: "background.paper",

  boxShadow: 24
};

export default function CustomModal({ open = false, handleClose, children }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          overflow: "scroll",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
