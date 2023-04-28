import { React, useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import ReactAvatarEditor from "react-avatar-editor";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloseButton from "./CloseButton";

function AvatarUpload(props) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const uploadFile = (e) => {
    // file upload handling
    if (props.sport) {
      const data = new FormData();
      data.append("fileName", props.formData.name);
      data.append("image", file);
      props.setFormData({ ...props.formData, sportPic: data });
      console.log("Photo uploaded successfully");
      props.toggle();
    } else if (props.product) {
      const data = new FormData();
      data.append("productName", props.formData.productName);
      data.append("image", file);

      props.setFormData({ ...props.formData, profilePic: data });
      console.log("Photo uploaded successfully");
      props.toggle();
    } else {
      const data = new FormData();
      data.append("imageid", props.formData.cin);
      data.append("image", file);

      props.setFormData({ ...props.formData, profilePic: data });
      console.log("Photo uploaded successfully");
      props.toggle();
    }
  };

  const [avatar, setAvatar] = useState({
    image: "avatar.jpg",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 300,
    height: 300,
  });

  const handleNewImage = (e) => {
    if (e.target.files[0] && e.target.files[0].type.split("/")[0] === "image") {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setAvatar({ ...avatar, image: e.target.files[0] });
    } else {
      alert("Please Upload an image");
    }
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setAvatar({ ...avatar, scale });
  };

  const handlePositionChange = (position) => {
    setAvatar({ ...avatar, position });
  };

  return (
    <Dialog open={props.isOpen}>
      <CloseButton
        onClose={() => {
          props.toggle();
        }}
      />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            marginLeft: 4,
            marginRight: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h4" gutterBottom>
              Select {!props.sport ? "avatar" : "sport picture"}
            </Typography>
            <ReactAvatarEditor
              scale={parseFloat(avatar.scale)}
              width={avatar.width}
              height={avatar.height}
              position={avatar.position}
              onPositionChange={handlePositionChange}
              rotate={parseFloat(avatar.rotate)}
              borderRadius={avatar.width / (100 / avatar.borderRadius)}
              image={avatar.image}
              className="editor-canvas"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleNewImage}
            />
          </Stack>
          <Slider
            aria-label="scale"
            defaultValue={1}
            onChange={handleScale}
            min={avatar.allowZoomOut ? 0.1 : 1}
            max={2}
            step={0.01}
            color="secondary"
          />
          <Button type="button" variant="contained" onClick={uploadFile}>
            Upload
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AvatarUpload;

AvatarUpload.propTypes = {
  isOpen: PropTypes.string,
  toggle: PropTypes.string,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};