import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import AddReceptionist from "../../../pages/AddReceptionist";

// ----------------------------------------------------------------------

export default function ReceptionistMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { menu, setMenu } = props;

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${props.trainer.firstName} ${props.trainer.lastName} ?`
      )
    ) {
      // Save it!
      Axios.delete(
        `${process.env.REACT_APP_API_URL}/api/trainers/${props.trainer._id}`
      ).then((response) => {
        if (response.message) {
          console.log("An error has occured");
        } else {
          // rerender table component
          setMenu(!menu);
        }
      });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  const handleUpdate = () => setOpen(!open);
  return (
    <>
      <AddReceptionist isOpen={open} toggle={handleUpdate} />
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={handleUpdate}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}