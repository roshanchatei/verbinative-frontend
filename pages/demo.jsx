import {Avatar, Box, CircularProgress, IconButton, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ChatContainer from "@/src/page-components/Home/ChatContainer";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useUser} from "@/src/store/UserContext";
import {useSnackbar} from "notistack";

const Chat = ({current, setCurrent}) => {

    const [user] = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [message,setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [newMessageList, setNewMessageList] = useState([]);

    useEffect(() =>{
        setMessageList([]);
        setHasMore(true);
    },[current]);

    // useEffect(() => {
    //     if (newMessageList.length === 0) return;
    //     let _messageList = messageList;
    //     _messageList = [..._messageList, ...newMessageList];
    //     setMessageList([..._messageList]);
    // }, [newMessageList]);

    // useEffect(() => {
    //     if (current === null) return;
    //     const token = localStorage.getItem(authCookieName);
    //     const socketClient = io(process.env.baseUrl);
    //     const socketApp = feathers();
    //     socketApp.configure(
    //         socketio(socketClient, {
    //             transports: ['websocket'],
    //         }),
    //     );
    //     socketClient.on('connect', () => {
    //         socketClient.emit(
    //             'create',
    //             'authentication',
    //             {
    //                 strategy: 'jwt',
    //                 accessToken: token,
    //                 fcmId: 'sifw73rwejsdfdsrowe7rweoiewresdkfdsy',
    //             },
    //             function (e) {
    //                 if (e) {
    //                 } else {
    //                     socketApp.service(services.chat).on('created', (message) => {
    //                         setNewMessageList([message]);
    //                     });
    //                     socketApp.service(services.chat).on('patched', (message) => {
    //                         setMessageList((prev) =>
    //                             prev.map((each) => {
    //                                 if (each._id === message._id) return message;
    //                                 return each;
    //                             }),
    //                         );
    //                     });
    //                 }
    //             },
    //         );
    //     });
    // }, []);

    // const LoadMessages = () => {
    //     if (current === null) {
    //         setHasMore(false);
    //         return false;
    //     }
    //     chatService.find({
    //         query: {
    //             entityId: current?.id,
    //             $populate: ['createdBy'],
    //             $skip: messageList.length,
    //         },
    //     })
    //         .then((res) => {
    //             const { data, total } = res;
    //             const newList = [...messageList, ...data];
    //             setMessageList(newList);
    //             setHasMore(newList.length < total);
    //         })
    //         .catch((error) => {
    //             enqueueSnackbar(error.message ? error.message : 'Something went wrong', {
    //                 variant: 'error',
    //             });
    //             setHasMore(false);
    //         });
    // };

    // const sendMessage = () =>{
    //     setLoading(true);
    //     chatService.create({
    //         "text": message,
    //         "entityId": entity?.object?._id,
    //         "entityType":entity?.entityType,
    //         // "attachment": {
    //         //     "type": 1,
    //         //     "link": "https://kemnu-dev.s3.ap-south-1.amazonaws.com/2022/0302/1646234224565_Screenshot%202022-03-02%20at%203.41.19%20PM.png"
    //         // }
    //     })
    //         .then((res) =>{
    //             setMessageList([...messageList,res]);
    //             setLoading(false);
    //             setMessage('');
    //         })
    //         .catch((error) =>{
    //             enqueueSnackbar(error.message ? error.message : 'Something went wrong', {
    //                 variant: 'error',
    //             });
    //             setLoading(false);
    //         });
    // };

    const loadMoreMessages = () => {

    }


    return (
        <>
            <Box width={'100%'} height={'calc(100vh - 48px)'} position={'relative'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} py={0.5} px={3} borderBottom={'1px solid #E1E1E1'}>
                    <IconButton
                        sx={{pl: 2, py: 1.5}}
                        onClick={() => {
                            setCurrent(null)
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Box fontWeight={500} fontSize={'20px'}>
                        {
                            current.name !== '' ? current.name : current.username
                        }
                    </Box>
                </Box>
                <Box
                    height={'calc(100vh - 169px)'}
                    position={'absolute'} bottom={60}
                    width={'100%'}
                    display={'flex'} flexDirection={'column-reverse'}
                    py={2} px={3}
                    sx={{
                        scrollBehavior: "smooth",
                        overflowY: "scroll",
                    }}
                >

                    <InfiniteScroll
                        loadMore={loadMoreMessages}
                        hasMore={hasMore}
                        isReverse={true}
                        // loadMore={LoadMessages}
                        loader={
                            <Box align={'center'} key={'all-messages'} p={2}>
                                <CircularProgress size={28} />
                            </Box>
                        }
                        pageStart={0}
                    >
                        <ChatContainer
                            type={1}
                            msg={'hello, i am the sender'}
                        />
                        <ChatContainer
                            type={-1}
                            msg={'hello, i am the reciever'}
                        />
                    </InfiniteScroll>

                </Box>

                <Box bgcolor={'#FFF'} position={'absolute'} bottom={0} px={3} py={1} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} borderTop={'1px solid #E1E1E1'}>
                    <TextField
                        variant="standard"
                        size={'small'}
                        sx={{
                            background: "#FFF",
                            py: 1,
                            px: 2,
                            borderRadius: "40px",
                            width: "90%",
                            border: '1px solid #000'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            disableUnderline: true,
                        }}
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value)
                        }}
                    />
                    <IconButton
                        dis
                    >
                        <SendIcon />
                    </IconButton>
                </Box>

            </Box>
        </>
    );
};
export default Chat;