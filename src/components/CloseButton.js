import * as React from "react";
import PropTypes from "prop-types";

import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";

export default function CloseButton(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          type="button"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon icon="ep:circle-close-filled" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CloseButton.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
