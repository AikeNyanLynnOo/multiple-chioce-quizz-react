import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Transition } from "../styles/muiStyles";

export const LoadingDialog = () => {
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ mt: 1, textAlign: "center" }}>Loading...</DialogTitle>
      <DialogContent sx={{ width: "70%", mx: "auto", textAlign: "center" }}>
        <DialogContentText id="alert-dialog-slide-description">
          Please wait while getting ready!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
