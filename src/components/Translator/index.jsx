import IconButton from "@mui/material/IconButton";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    InputAdornment,
    MenuItem,
    Skeleton,
    Switch,
    useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TranslateIcon from '@mui/icons-material/Translate';
import CustomTextField from "@/src/components/CustomTextField";
import {languages} from "@/src/store/languages";
import {useSnackbar} from "notistack";
import {translate} from "@/src/store/translate";
import {generateText} from "@/src/store/text-generator";

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

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        enqueueSnackbar("Copied to clipboard", {
            variant: "success",
        });
        return false;
    };

    const handleClick = async () => {
        setLoading(true)

        if (isOn) {
            try {
                const translatedPrompt = await translate(text, 'auto-detect', 'en');
                const aiResponse = await generateText(translatedPrompt);
                if(targetLanguage === 'en'){
                    setOutput(aiResponse);
                }
                else{
                    const translatedOutput = await translate(aiResponse, 'en', targetLanguage);
                    setOutput(translatedOutput);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        } else {
            const src = checked ? 'auto-detect' : sourceLanguage;
            translate(text, src, targetLanguage)
                .then((translatedMessage) => {
                    setOutput(translatedMessage)
                })
                .catch((e) => console.log(e))
                .finally(() => setLoading(false))
        }


    }

    const handleInterChange = () => {
        const temp = sourceLanguage;
        setSourceLanguage(targetLanguage);
        setTargetLanguage(temp)
    }

    const [isOn, setIsOn] = useState(false);
    const handleSwitch = (event) => {
        setIsOn(event.target.checked);
    };

    useEffect(() => {
        if(isOn){
            setChecked(true)
            setSourceLanguage('')
            setTargetLanguage('en')
            setText('')
            setOutput('')
        }

        else {
            setChecked(false)
            setTargetLanguage('')
            setText('')
            setOutput('')
        }
    }, [isOn])

    return (
        <>
            <IconButton onClick={handleMobDrawer}>
                <TranslateIcon sx={{color: '#fff'}} />
            </IconButton>


            <Drawer anchor={'right'} open={mobOpen} onClose={handleMobDrawer}>
                <Box
                    width={isMobile ? "100vw" : drawerWidth}
                    sx={{
                        background: isOn ? 'linear-gradient(180deg, rgba(38,138,255,1) 0%, rgba(255,255,255,1) 85%)' : '#FFF',
                    }}
                >
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 3,
                            pt: 2,
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            {isOn ? "Live Text Generation" : "Live Text Translation"}
                        </Box>
                        {/*<Box display={'flex'} alignItems={'center'}>*/}
                        {/*    <Box>*/}
                        {/*        AI*/}
                        {/*    </Box>*/}
                        {/*    <Switch*/}
                        {/*        checked={isOn}*/}
                        {/*        onChange={handleSwitch}*/}
                        {/*    />*/}
                        {/*    <Box ml={2} />*/}
                        {/*    <IconButton onClick={handleMobDrawer}>*/}
                        {/*        <CloseIcon sx={{color: 'red'}} />*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                        <IconButton onClick={handleMobDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>

                    </Box>
                    <Box mt={{md: 3, xs: 2}} />
                    <Box px={3}>
                        <CustomTextField
                            disabled={checked || isOn}
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
                        <Box my={{md: 0.5, xs: 0}} display={'flex'} width={'100%'} justifyContent={'center'}>
                            <IconButton onClick={handleInterChange} disabled={sourceLanguage === "" && targetLanguage === "" || isOn}>
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
                        <Box mt={{md: 1.5, xs: 0.5}} />
                        <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Checkbox
                                    disabled={isOn}
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Box ml={-0.3}>
                                    Use auto-detect
                                </Box>
                            </Box>
                        </Box>
                        <Box mt={{md: 1.5, xs: 0.5}} />
                        <CustomTextField
                            page={'login'}
                            label={isOn ? "Enter a prompt to generate text" : "Enter text to translate"}
                            type={"email"}
                            value={text}
                            onChange={(event) => {
                                setText(event.target.value);
                            }}
                            multiline
                            rows={3}
                        />
                        <Box mt={{md: 2, xs: 1}} />
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
                                    px: 3,
                                    py: 1.2,
                                    "&:hover": {
                                        backgroundColor: "#006ff8",
                                    },
                                    textTransform: 'none'
                                }}
                            >
                                {isOn ? "Generate" : "Launch"}
                            </Button>
                        </Box>

                        <Divider sx={{mt: {md: 4, xs: 2}, mb: {md: 3, xs: 1}}} />

                        {
                            loading ? (
                                <Box>
                                    <Box mb={1} width={"100%"} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Skeleton animation="wave" variant="rectangular" width={150} />
                                        <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                    </Box>
                                    <Skeleton animation="wave" variant="rectangular" width={'100%'} height={120} />
                                </Box>
                            ) : (
                                <>
                                    <Box width={"100%"} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Box mb={1} ml={0.5} fontWeight={600} fontSize={'18px'}>
                                            {isOn ? "AI generated response" : "Translated text"}
                                        </Box>
                                        <IconButton sx={{mb: 0.5}} onClick={handleCopy}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Box>
                                    <Box px={2} py={1.5} fontSize={'15px'} width={'100%'} height={'120px'} bgcolor={'#F2F2F2'} borderRadius={'12px'} sx={{overflowY: 'scroll'}}>
                                        {output}
                                    </Box>
                                </>
                            )
                        }
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Index;