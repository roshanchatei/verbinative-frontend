import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {useState} from "react";
import {useSnackbar} from "notistack";
import {Box, Button, Chip, Drawer, Grid, IconButton, useMediaQuery} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchAutoComplete from "@/src/page-components/Home/SearchAutoComplete";
import CustomTextField from "@/src/components/CustomTextField";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {baseURL} from "@/src/store/config";

const Index = () => {

    const Router = useRouter()
    const { enqueueSnackbar } = useSnackbar();
    const myUserId = localStorage.getItem('id');

    const drawerWidth = 500;
    const [createOpen, setCreateOpen] = useState(false);
    const handleCreateDrawer = () => {
        setCreateOpen(!createOpen);
    };

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    useEffect(() => {
        fetch(`${baseURL}/user/${myUserId}`)
            .then(response => response.json())
            .then(result => setSelectedList([result?.data?.data]))
            .catch(error => console.log('error', error));
    }, [])

    const [name, setName] = useState("");
    const [selectedList, setSelectedList] = useState([])
    const handleCreateGroup = () => {
        const userIds = selectedList.map(obj => obj?.user_id);

        const raw = JSON.stringify({
            "name": name,
            "user_ids": userIds,
            "messages": []
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseURL}/chat/create/`, requestOptions)
            .then(response => response.json())
            .then((res) => {
                enqueueSnackbar(`Created group ${name}`, {
                    variant: "success",
                });
                Router.reload();
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <IconButton onClick={handleCreateDrawer}>
                <QuestionAnswerIcon sx={{color: '#fff'}} />
            </IconButton>

            <Drawer anchor={'right'} open={createOpen} onClose={handleCreateDrawer}>
                <Box width={isMobile ? "100vw" : drawerWidth}>
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
                            setCreateOpen(false);
                        }}
                    >
                        <Box fontWeight={600} fontSize={'24px'}>
                            Create New Group
                        </Box>
                        <IconButton onClick={handleCreateDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <Box px={4} mt={4}>
                        <CustomTextField
                            page={'login'}
                            label={"Enter group name"}
                            type={"text"}
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <Box mt={2} />
                        <SearchAutoComplete type={'add'} selectedList={selectedList} setSelectedList={setSelectedList} />
                        <Box mb={2} mt={15} fontSize={'20px'} fontWeight={500}>
                            Participants to be added
                        </Box>
                        <Box
                            mb={2}
                            height={'250px'}
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
                                                    if(each?.user_id !== myUserId){
                                                        const temp = selectedList.filter(e => e?.user_id !== each?.user_id)
                                                        setSelectedList(temp)
                                                    }
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
                        <Box mt={4} />
                        <Button
                            disabled={selectedList.length < 3 || name === ''}
                            onClick={handleCreateGroup}
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
                            Create
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};
export default Index;