import {Box, Container, Divider, IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


const Index = ({children, current, setCurrent}) => {

    return (
        <>
            <Container maxWidth={'lg'}>
                <Box p={4} width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Box width={'49%'} position={'relative'}>
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
                    <Divider sx={{mx: 12}} orientation="vertical" flexItem />
                    <Box width={'49%'}>
                        <Box display={'flex'} alignItems={'center'} mb={4}>
                            <img src={'/images/logo-color-blue.svg'} width={'55px'} />
                            <Box fontWeight={550} fontSize={'18px'} mt={0.5} ml={0.5}>
                                Verbinative
                            </Box>
                        </Box>
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