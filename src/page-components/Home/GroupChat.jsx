import InfoIcon from '@mui/icons-material/Info';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Avatar, Box, Button, Chip, CircularProgress, Divider, Drawer, Grid, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from '@mui/icons-material/Group';
import LinkIcon from '@mui/icons-material/Link';
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import SearchAutoComplete from "@/src/page-components/Home/SearchAutoComplete";
import {baseURL} from "@/src/store/config";
import {useRouter} from "next/router";

const Index = ({current, loading}) => {

    const Router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const drawerWidth = 500;
    const [infoOpen, setInfoOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const handleInfoDrawer = () => {
        setInfoOpen(!infoOpen);
    };
    const handleAddDrawer = () => {
        setAddOpen(!addOpen);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText('');
        enqueueSnackbar("Invite link copied to clipboard", {
            variant: "success",
        });
        return false;
    };

    const [detailLoading, setDetailLoading] = useState(false)
    const [usersDetails, setUsersDetails] = useState([]);

    async function getUsersDetails(users_ids) {
        setDetailLoading(true)

        const userDetailsArr = [];
        for (const userId of users_ids) {
            try {
                const response = await fetch(`${baseURL}/user/${userId}`);
                const result = await response.json();
                userDetailsArr.push(result?.data?.data);
            } catch (error) {
                console.log('Error fetching user details: ', error);
            } finally {
                setDetailLoading(false)
            }
        }
        return userDetailsArr;
    }

    useEffect(() => {
        // setUsersDetails([]);
        if(infoOpen){
            async function fetchData() {
                const result = await getUsersDetails(current?.user_ids);
                setUsersDetails(result);
            }

            fetchData();
        }
    }, [infoOpen]);

    const [selectedList, setSelectedList] = useState([])
    const handleAddUsers = () => {

        const userIds = selectedList.map(obj => obj?.user_id);
        const allUserIds = [...current?.user_ids, ...userIds];
        const uniqueArr = [...new Set(allUserIds)];

        const raw = JSON.stringify({
            "user_ids": uniqueArr,
        });

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseURL}/chat/join/${current?.chatroom_id}/`, requestOptions)
            .then(response => response.json())
            .then((res) => {
                enqueueSnackbar(`Successfully added ${selectedList?.length} participants`, {
                    variant: "success",
                });
                Router.reload();
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <Box display={'flex'} alignItems={'center'}>
                <IconButton disabled={loading} onClick={handleAddDrawer}>
                    <GroupAddIcon />
                </IconButton>
                <Box ml={1.5} />
                <IconButton disabled={loading} onClick={handleInfoDrawer}>
                    <InfoIcon />
                </IconButton>
            </Box>


            <Drawer anchor={'right'} open={infoOpen} onClose={handleInfoDrawer}>
                <Box width={drawerWidth}>
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 3,
                            pt: 4,
                        }}
                        onClick={() => {
                            setInfoOpen(false);
                            setAddOpen(false);
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Group Info
                        </Box>
                        <IconButton onClick={handleInfoDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <Box px={4} mt={5}>
                        <Box mb={10} width={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Avatar
                                sx={{background: '#181935', width: 150, height: 150}}
                            >
                               <GroupIcon fontSize={'large'} />
                            </Avatar>
                            <Box mt={2} fontSize={'20px'} fontWeight={500}>
                                {current?.name}
                            </Box>
                        </Box>
                        <Box mb={2} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box fontSize={'20px'} fontWeight={500}>
                                {current?.user_ids.length} Participants
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <IconButton onClick={() => {setInfoOpen(false); setAddOpen(true)}}>
                                    <GroupAddIcon />
                                </IconButton>
                                <Box ml={1.5} />
                                <IconButton onClick={handleCopy}>
                                    <LinkIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box
                            height={'280px'}
                            width={'100%'}
                            display={'flex'} flexDirection={'column'}
                            sx={{
                                scrollBehavior: "smooth",
                                overflowY: "scroll",
                                '&::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }}
                        >
                            {
                                detailLoading ? (
                                    <Box height={'280px'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress size={28} />
                                    </Box>
                                ) : (
                                    <>
                                        {
                                            usersDetails.map((each, index) => (
                                                <>
                                                    <Box key={index} mb={1} mt={1} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} fontSize={'16px'}>
                                                        <Box>~{each?.username}</Box>
                                                        <Box>{each?.region}</Box>
                                                    </Box>
                                                    {
                                                        index !== usersDetails?.length - 1 && <Divider />
                                                    }
                                                </>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </Box>

                    </Box>
                </Box>
            </Drawer>

            <Drawer anchor={'right'} open={addOpen} onClose={handleAddDrawer}>
                <Box width={drawerWidth}>
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 3,
                            pt: 4,
                        }}
                        onClick={() => {
                            setAddOpen(false);
                            setInfoOpen(false)
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Add Participants
                        </Box>
                        <IconButton onClick={handleInfoDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <Box px={4} mt={5}>
                        <SearchAutoComplete type={'add'} selectedList={selectedList} setSelectedList={setSelectedList} />
                        <Box mb={2} mt={10} fontSize={'20px'} fontWeight={500}>
                            Participants to be added
                        </Box>
                        <Box
                            mb={2}
                            height={'380px'}
                            width={'100%'}
                            display={'flex'} flexDirection={'column'}
                            sx={{
                                scrollBehavior: "smooth",
                                overflowY: "scroll",
                            }}
                        >
                            <Grid container spacing={3} >
                                {
                                    selectedList.map((each, index) => (
                                        <Grid item xs={4} key={index}>
                                            <Chip
                                                label={each?.username}
                                                onDelete={() => {
                                                    const temp = selectedList.filter(e => e?.user_id !== each?.user_id)
                                                    setSelectedList(temp)
                                                }}
                                                sx={{
                                                    padding: '15px 7px',
                                                    fontSize: '14px',
                                                    border: '1.5px solid #4D9FFF',
                                                    "&.MuiChip-root": {
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    },
                                                }}

                                            />
                                        </Grid>

                                    ))
                                }
                            </Grid>

                        </Box>
                        <Button
                            disabled={selectedList.length < 1}
                            onClick={handleAddUsers}
                            disableElevation
                            variant={"contained"}
                            fullWidth
                            sx={{
                                backgroundColor: "#268AFF",
                                color: "#FFF",
                                borderRadius: "15px",
                                zIndex: 2,
                                py: 1.5,
                                fontSize: '16px',
                                "&:hover": {
                                    backgroundColor: "#006ff8",
                                },
                                textTransform: 'none'
                            }}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Drawer>

        </>
    );
};
export default Index;