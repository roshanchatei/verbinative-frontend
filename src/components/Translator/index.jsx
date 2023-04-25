import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {Box, Button, Checkbox, Divider, Drawer, InputAdornment, MenuItem} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TranslateIcon from '@mui/icons-material/Translate';
import CustomTextField from "@/src/components/CustomTextField";
import {languages} from "@/src/store/languages";
import {useSnackbar} from "notistack";
import {translate} from "@/src/store/translate";

const Index = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false)
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');


    const [mobOpen, setMobOpen] = useState(false);
    const handleMobDrawer = () => {
        setMobOpen(!mobOpen);
    };
    const drawerWidth = 500;

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        enqueueSnackbar("Copied to clipboard", {
            variant: "success",
        });
        return false;
    };

    const handleClick = () => {
        setLoading(true)

        const src = checked ? 'auto-detect' : sourceLanguage;
        translate(text, src, targetLanguage)
            .then((translatedMessage) => {
               setOutput(translatedMessage)
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))

    }

    const handleInterChange = () => {
        const temp = sourceLanguage;
        setSourceLanguage(targetLanguage);
        setTargetLanguage(temp)
    }

    return (
        <>
            <IconButton onClick={handleMobDrawer}>
                <TranslateIcon sx={{color: '#fff'}} />
            </IconButton>


            <Drawer anchor={'right'} open={mobOpen} onClose={handleMobDrawer}>
                <Box width={drawerWidth}>
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 3,
                            pt: 2,
                        }}
                        onClick={() => {
                            setMobOpen(false);
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Live Text Translation
                        </Box>
                        <IconButton onClick={handleMobDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <Box mt={3} />
                    <Box px={3}>
                        <CustomTextField
                            disabled={checked}
                            page={'login'}
                            label={"Select source language"}
                            type={"text"}
                            select
                            value={sourceLanguage}
                            onChange={(event) => {
                                setSourceLanguage(event.target.value);
                            }}
                        >
                            {languages.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                        <Box my={0.5} display={'flex'} width={'100%'} justifyContent={'center'}>
                            <IconButton onClick={handleInterChange} disabled={sourceLanguage === "" && targetLanguage === ""}>
                                <CompareArrowsIcon sx={{rotate: '90deg'}} />
                            </IconButton>
                        </Box>
                        <CustomTextField
                            page={'login'}
                            label={"Select target language"}
                            type={"text"}
                            select
                            value={targetLanguage}
                            onChange={(event) => {
                                setTargetLanguage(event.target.value);
                            }}
                        >
                            {languages.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                        <Box mt={1.5} />
                        <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Box ml={-0.3}>
                                    Use auto-detect
                                </Box>
                            </Box>
                        </Box>
                        <Box mt={1.5} />
                        <CustomTextField
                            page={'login'}
                            label={"Enter text to translate"}
                            type={"email"}
                            value={text}
                            onChange={(event) => {
                                setText(event.target.value);
                            }}
                            multiline
                            rows={3}
                        />
                        <Box mt={2} />
                        <Box display={'flex'} width={'100%'} justifyContent={'center'}>
                            <Button
                                disabled={
                                    (sourceLanguage === '' && !checked) ||
                                    targetLanguage === '' ||
                                    text === '' ||
                                    loading
                                }
                                onClick={handleClick}
                                disableElevation
                                variant={"contained"}
                                sx={{
                                    backgroundColor: "#268AFF",
                                    color: "#FFF",
                                    borderRadius: "15px",
                                    zIndex: 2,
                                    px: 2.5,
                                    py: 1.5,
                                    "&:hover": {
                                        backgroundColor: "#006ff8",
                                    },
                                    textTransform: 'none'
                                }}
                            >
                                Launch
                            </Button>
                        </Box>

                        <Divider sx={{mt: 4, mb: 3}} />

                        <Box mb={1} ml={0.5} fontWeight={600} fontSize={'18px'}>
                            Result
                        </Box>
                        <CustomTextField
                            page={'login'}
                            label={"Translated text"}
                            type={"email"}
                            value={output}
                            multiline
                            rows={3}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Box height={'100%'} display={'flex'} alignItems={'start'}>
                                        <IconButton onClick={handleCopy}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Box>
                                </InputAdornment>
                            }
                        />
                    </Box>


                </Box>
            </Drawer>
        </>
    );
};

export default Index;