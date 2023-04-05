import {Box, Grid} from "@mui/material";
import SearchAutocomplete from "@/src/page-components/Home/SearchAutocomplete";
import ChatCard from "@/src/page-components/Home/ChatCard";
import {useState, useEffect} from "react";
import Chat from "@/src/page-components/Home/Chat";

const Index = () => {

    const users = [
        {
            id: '1',
            name: 'Roshan',
            username: 'rkc',
            lastMessage: '2023-02-16T05:19:10Z'
        },
        {
            id: '2',
            name: 'Ashutosh',
            username: 'ash_king',
            lastMessage: '2023-02-14T05:19:10Z'
        },
        {
            id: '3',
            name: '',
            username: 'rahul',
            lastMessage: '2023-02-09T05:19:10Z'
        }
    ]

    const [current, setCurrent] = useState(null)
    // useEffect(() => {
    //     console.log(current)
    // }, [current])

    return (
        <>
            <Box width={'100%'}>
                <Grid container>
                    <Grid item xs={5}>
                        <Box bgcolor={'#F4F4F4'} width={'100%'} height={'calc(100vh - 48px)'} borderRight={'1px solid #E1E1E1'}>
                            <Box width={'100%'} p={2} borderBottom={'1px solid #E1E1E1'}>
                                <SearchAutocomplete />
                            </Box>
                            <Box
                                width={'100%'}
                                sx={{
                                    scrollBehavior: "smooth",
                                    overflowY: "scroll",
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    }
                                }}
                            >
                                {
                                    users.map((each) => (
                                        <ChatCard
                                            key={each.id} person={each}
                                            current={current}
                                            setCurrent={setCurrent}
                                        />
                                    ))
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        {
                            current !== null ? (
                                <Chat
                                    current={current}
                                    setCurrent={setCurrent}
                                />
                            ) : (
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'calc(100vh - 48px)'}>
                                    Click on any user to see the chats
                                </Box>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default Index;
// Index.layout = null;
Index.title = "Home";
