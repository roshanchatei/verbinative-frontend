import React, {useEffect, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {Box, Dialog, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import CropIcon from '@mui/icons-material/Crop';
import CloseIcon from "@mui/icons-material/Close";


const ImageCropper = ({initialImage, setCroppedImage, aspectRatio}) => {

    const [image, setImage] = useState('');
    const [cropper, setCropper] = useState({});
    const [pop, setPop] = useState(false);
    const handleClick = () => {
        setPop(true);
    };
    const handleClose = () => {
        setPop(false);
    };

    useEffect(() => {
        if(initialImage){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(initialImage)
        }
        else setImage(initialImage)

    }, [initialImage])

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCroppedImage(cropper.getCroppedCanvas().toDataURL())
        }
        handleClose()
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <CropIcon color={'primary'} />
            </IconButton>
            <Dialog
                open={pop}
                onClose={handleClose}
            >
                <Box
                    py={3}
                    px={3}
                    zIndex={1}
                    width={"450px"}
                    bgcolor={"#F6F2E6"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"column"}
                    >
                        <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            px={2}
                        >
                            <Box fontSize={"27px"} fontWeight={600}  color={'#181935'}>
                                Crop Image
                            </Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: "#FFF" }} />
                            </IconButton>
                        </Box>
                        <Box mb={5} />
                        <Cropper
                            style={{ height: 400, width: "100%" }}
                            zoomOnWheel={false}
                            aspectRatio={aspectRatio} //aspectRatio values format 1/1, 19/9, 4/3, etc.
                            src={image}
                            viewMode={1}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                        />
                        <Box mb={4} />
                        <Button
                            onClick={getCropData}
                            variant={"contained"}
                            disableElevation
                            fullWidth
                            sx={{
                                borderRadius: "15px",
                                py: 1.5,
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};

export default ImageCropper;
