import {useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, CircularProgress, Dialog} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import ImageCropper from "./ImageCropper";

const ProfileImage = () => {

    const [pop, setPop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [preview, setPreview] = useState('')
    const [avatarImg, setAvatarImg] = useState('')

    const handleClick = (event) => {
        setPop(true);
    };
    const handleClose = () => {
        setAvatarImg(preview)
        setPop(false);
    };

    const imgRef = useRef(null);

    const handleRemove = () => {
        if (!image) return;
        setImage(null);
        handleClose();
    };

    // const dataURLtoFile = (dataUrl, filename) => {
    //     let arr = dataUrl?.split(','),
    //         mime = arr[0]?.match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]),
    //         n = bstr?.length,
    //         u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, { type: mime });
    // };

    const handleChange = function () {};
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            e.target.value = null;
            // const imageFile = dataURLtoFile(preview, `${file.name}`);
            // const { name, size, type } = imageFile;
            // if (name === file.name && size === file.size && type === file.size)
            //     return handleChange((prevValue) => ({ ...prevValue, photo: imageFile }));
            // // else return preview image as it would be the updated image
        } else setImage(null);
    }

    useEffect(() => {
        setPreview('');
        setAvatarImg('');
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setAvatarImg(reader.result);
            };
            reader.readAsDataURL(image);
        } else setPreview('');
    }, [image]);


    return (
        <>
            <Box width={'100%'} display={'flex'} alignItems={'flex-end'}>
                <Avatar
                    sx={{
                        width: 140,
                        height: 140,
                        border: image ? '2px solid #181935' : ''
                    }}
                    src={avatarImg}
                />
                {
                    !image && (
                        <IconButton
                            sx={{
                                mb: 3,
                                ml: 3,
                                border: '1.5px solid #181935'
                            }}
                            onClick={() => imgRef?.current?.click()}
                        >
                            <UploadIcon fontSize={'small'} color={'primary'} />
                        </IconButton>
                    )
                }
                {
                    image && (
                        <IconButton
                            sx={{
                                mb: 3,
                                ml: 3,
                                border: '1.5px solid #181935'
                            }}
                            onClick={handleClick}
                        >
                            <EditIcon fontSize={'small'}  color={'primary'} />
                        </IconButton>
                    )
                }
            </Box>
            <Dialog
                open={pop}
                onClose={handleClose}
            >
                <Box
                    width={"100%"}
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box
                        py={3}
                        px={3}
                        zIndex={1}
                        width={"450px"}
                        bgcolor={"#F6F2E6"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Box fontSize={"22px"} fontWeight={600} color={'#181935'}>
                                Edit Profile Image
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <ImageCropper initialImage={image} setCroppedImage={setPreview} aspectRatio={1} />
                                <IconButton sx={{ml: 2}} onClick={handleRemove} disabled={!image}>
                                    <DeleteIcon sx={{ color: "red" }} />
                                </IconButton>
                                <IconButton  sx={{ml: 4}} onClick={handleClose}>
                                    <CloseIcon sx={{ color: "#000" }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box mt={1} color={"#ACACAC"} fontSize={"15px"}>
                            Please click to upload your picture to make your profile look genuine
                        </Box>
                        <Box mb={3} />
                        <Box
                            onClick={() => imgRef?.current?.click()}
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                            sx={{
                                cursor: "pointer",
                            }}
                        >
                            {loading ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    height={"250px"}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    bgcolor={"rgba(24, 25, 53, 0.64)"}
                                    width={'320px'}
                                    height={'320px'}
                                    border={"5px dashed #181935"}
                                    borderRadius={"50%"}
                                    overflow={"hidden"}
                                >
                                    {
                                        !image ? (<PersonAddAltIcon sx={{ml: 1}} fontSize={'large'} />) : (
                                            <img
                                                src={preview}
                                                alt={'logo'}
                                                width={'320px'}
                                                height={'320px'}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )
                                    }
                                </Box>
                            )}
                        </Box>
                        <Box mb={6} />
                        <Button
                            // disabled={loadingButton || image === user?.avatar}
                            onClick={handleClose}
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
            <input
                accept="image/*"
                onChange={(e) => handleImage(e)}
                ref={imgRef}
                style={{ display: 'none' }}
                type="file"
            />
        </>
    );
};

export default ProfileImage;
