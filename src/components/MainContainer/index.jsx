import {Box, Container, Divider, Hidden, IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


const Index = ({children, current, setCurrent}) => {

    return (
        <>
            <Container maxWidth={'lg'}>
                <Box p={{md:4, xs: 2}} width={'100%'} height={{md: "100vh", xs: "85vh"}} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Box display={{md: "block", xs: "none"}} width={'49%'} position={'relative'}>
                        {
                            current === 1 && (
                                <IconButton
                                    sx={{pl: 2, py: 1.5, position: 'absolute', top: -70, left: -30}}
                                    onClick={() => {
                                        setCurrent(0)
                                    }}
                                >
                                    <ArrowBackIosIcon />
                                </IconButton>
                            )
                        }
                        <Box fontSize={'24px'} fontWeight={500}>
                            Hello!
                        </Box>
                        <Box fontSize={'32px'} fontWeight={700} mt={-1}>
                            Welcome.
                        </Box>
                        <Box mt={4} />
                        <img src={'/images/auth-logo.svg'} alt={'img'} width={'100%'} />
                    </Box>
                    <Hidden mdDown>
                        <Divider sx={{mx: 12}} orientation="vertical" flexItem />
                    </Hidden>
                    <Box width={{md: "49%", xs: "100%"}}>
                        <Hidden mdUp>
                            <Box width={"100%"} mb={5} display={'flex'} alignItems={'center'} justifyContent={"center"} position={'relative'}>
                                {
                                    current === 1 && (
                                        <IconButton
                                            sx={{pl: 2, position: 'absolute', top: 0, left: -20}}
                                            onClick={() => {
                                                setCurrent(0)
                                            }}
                                        >
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                    )
                                }
                                <Box display={'flex'} alignItems={'center'}>
                                    <img src={'/images/logo-color-blue.svg'} width={'55px'} />
                                    <Box fontWeight={550} fontSize={'18px'} mt={0.5} ml={0.5}>
                                        Verbinative
                                    </Box>
                                </Box>
                                <span />
                            </Box>
                        </Hidden>
                        <Hidden mdDown>
                            <Box display={'flex'} alignItems={'center'} mb={4}>
                                <img src={'/images/logo-color-blue.svg'} width={'55px'} />
                                <Box fontWeight={550} fontSize={'18px'} mt={0.5} ml={0.5}>
                                    Verbinative
                                </Box>
                            </Box>
                        </Hidden>
                        {
                            children
                        }
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Index;
