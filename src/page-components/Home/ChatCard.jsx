import {Avatar, Box} from "@mui/material";

const ChatCard = ({person, current, setCurrent}) => {

    function getTimeOrDate(timestamp) {
        const now = new Date();
        const messageDate = new Date(timestamp);

        const daysDiff = (now.getTime() - messageDate.getTime()) / (1000 * 3600 * 24);

        if (daysDiff < 1) {
            return messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        } else if (daysDiff < 7) {
            return `${parseInt(daysDiff)} days ago`
        } else {
            const yyyy = messageDate.getFullYear();
            let mm = messageDate.getMonth() + 1;
            let dd = messageDate.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            return dd + '/' + mm + '/' + yyyy;
        }
    }
    const myUserId = localStorage.getItem('id');
    const temp = person?.user_ids.find((each) => each !== myUserId)
    console.log(temp)
    // const getUsername = () => {
    //     if(person?.user_ids === 2){
    //
    //     }
    //     else return person?.name
    // }
    // getUsername()

    return (
        <>
            <Box
                width={'100%'}
                borderBottom={'1px solid #E1E1E1'}
                px={3} py={2}
                display={'flex'} alignItems={'center'}
                sx={{
                    cursor: 'pointer',
                    "&:hover": {
                        backgroundColor: current?.user_id === person.user_id ? '#dedede' : '#eaeaea',
                        // backgroundColor: "#dedede",
                    },
                }}
                onClick={() => {
                    setCurrent(person)
                }}
                bgcolor={current?.id === person.id ? '#dedede' : 'transparent'}
            >
                <Avatar sx={{background: '#181935'}}>{person?.name[0].toUpperCase()}</Avatar>
                <Box ml={2} width={'100%'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box fontWeight={500} fontSize={'20px'} fontStyle={'italic'}>
                            {person?.name}
                        </Box>
                        {/*<Box>*/}
                        {/*    /!*{getTimeOrDate(person.lastMessage)}*!/*/}
                        {/*    12/01/23*/}
                        {/*</Box>*/}
                    </Box>
                </Box>

            </Box>
        </>
    );
};
export default ChatCard;
