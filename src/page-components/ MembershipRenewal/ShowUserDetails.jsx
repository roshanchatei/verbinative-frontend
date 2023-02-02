import {Avatar, Box, Grid} from "@mui/material";

const ShowUserDetails = () => {

    const statusColor = (days) => {
        if(days > 20) return '#02ff02';
        else if(days <= 20 && days > 10) return 'orange';
        else if(days <= 10 && days >= 0) return 'red'
        return null
    }

    return (
        <>
            <Box width={'100%'} pl={2}>
                <Box fontSize={'20px'} fontWeight={600} mb={5}>
                    User Details
                </Box>
                <Grid container spacing={0} pr={10}>
                    <Grid item xs={6} pr={15}>
                        <Box width={'100%'} display={'flex'} alignItems={'center'}>
                            <Box fontWeight={550}>ID:</Box>
                            <Box ml={2}>232344795</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Full Name:</Box>
                            <Box ml={2}>Roshan Ku. Chatei</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Phone No.:</Box>
                            <Box ml={2}>+91xxxxxxxxxx</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Email ID:</Box>
                            <Box ml={2}>aerofit.gym@gmail.com</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Aadhar No.:</Box>
                            <Box ml={2}>2345-4532-4543-3242</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Age:</Box>
                            <Box ml={2}>21</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Gender:</Box>
                            <Box ml={2}>Male</Box>
                        </Box>
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={2}>
                            <Box fontWeight={550}>Joined gym to?:</Box>
                            <Box ml={2}>Stay fit</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} pl={15}>
                        <Avatar
                            sx={{
                                width: 160,
                                height: 160,
                                border: '2px solid #181935',
                            }}
                            src={'https://source.unsplash.com/random'}
                        />
                        <Box width={'100%'} display={'flex'} alignItems={'center'} mt={5}>
                            <Box fontWeight={550}>Membership Status:</Box>
                            <Box ml={2} color={statusColor(21) || '#FFF'}>Expires in 24 days</Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ShowUserDetails;
