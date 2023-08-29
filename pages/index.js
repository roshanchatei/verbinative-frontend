import {Box, Dialog, Grid, Hidden, Slide} from "@mui/material";
import ChatCard from "@/src/page-components/Home/ChatCard";
import {useState, useEffect} from "react";
import Chat from "@/src/page-components/Home/Chat";
import SearchAutoComplete from "@/src/page-components/Home/SearchAutoComplete";
import {baseURL} from "@/src/store/config";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Index = () => {

    const [chats, setChats] = useState([])

    const [current, setCurrent] = useState(null)
    const [loading, setLoading] = useState(false);

    const [chatsLoading, setChatsLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setChatsLoading(true);

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const user_id = localStorage.getItem('id')

        fetch(`${baseURL}/chat/user/${user_id}/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setChats(result?.data?.chatroom.reverse())
            })
            .catch(error => console.log('error', error))
            .finally(() => setChatsLoading(false))
    }, [])

    return (
        <>
            <Box width={'100%'} position={"relative"}>
                <Grid container>
                    <Grid item md={5} xs={12}>
                        <Box bgcolor={'#f1f1f1'} width={'100%'} borderRight={'1px solid #E1E1E1'} sx={{overflow: "hidden"}}>
                            <Box zIndex={100} position={{md: "static", xs: "fixed"}} bgcolor={'#f1f1f1'} width={'100%'} p={2} borderBottom={'1px solid #E1E1E1'}>
                                <SearchAutoComplete type={'search'} chats={chats} setChats={setChats} />
                            </Box>
                            <Box
                                width={'100%'}
                                height={'calc(100vh - 129px)'}
                                sx={{
                                    scrollBehavior: "smooth",
                                    overflowY: "scroll",
                                    // '&::-webkit-scrollbar': {
                                    //     display: 'none'
                                    // }
                                }}
                                pt={{md: 0, xs: 10}}
                                pb={{md: 0, xs: 4}}
                            >
                                {
                                    chatsLoading ? (
                                        <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                            <Box mt={-9} px={3} textAlign={'center'}>
                                                <CircularProgress size={28} />
                                            </Box>
                                        </Box>
                                    ) : (
                                        <>
                                            {
                                                chats?.length === 0 && (
                                                    <Box width={'100%'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                                        <Box mt={-9} px={3} textAlign={'center'}>
                                                            Create Chatroom or search user and start chat
                                                        </Box>
                                                    </Box>
                                                )
                                            }
                                            {
                                                chats?.map((each, index) => (
                                                    <ChatCard
                                                        key={index} person={each}
                                                        current={current}
                                                        setCurrent={setCurrent}
                                                        loading={loading}
                                                        handleClickOpen={handleClickOpen}
                                                    />
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={7}>
                            {
                                current !== null ? (
                                    <Chat
                                        current={current}
                                        setCurrent={setCurrent}
                                        loading={loading}
                                        setLoading={setLoading}
                                        handleClose={handleClose}
                                    />
                                ) : (
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'calc(100vh - 48px)'}>
                                        Click on any user to see the chats
                                    </Box>
                                )
                            }
                        </Grid>
                    </Hidden>

                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <Chat
                            current={current}
                            setCurrent={setCurrent}
                            loading={loading}
                            setLoading={setLoading}
                            handleClose={handleClose}
                        />
                    </Dialog>
                </Grid>
            </Box>
        </>
    );
};
export default Index;
Index.title = "Home";
