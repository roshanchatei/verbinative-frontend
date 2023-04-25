import {Avatar, Box, Button, IconButton, MenuItem} from "@mui/material";
import CustomTextField from "@/src/components/CustomTextField";
import {useState} from "react";
import {countries} from "@/src/store/countries";
import {languages} from "@/src/store/languages";
import EditIcon from '@mui/icons-material/Edit';
import {useSnackbar} from "notistack";

const Profile = () => {

    const { enqueueSnackbar } = useSnackbar();

    const userId = localStorage.getItem('id');
    const avatarKey = localStorage.getItem('username')[0].toUpperCase();

    const [loading,  setLoading] = useState(false);
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [country, setCountry] = useState(localStorage.getItem("region"));
    const [language, setLanguage] = useState(localStorage.getItem("language"));
    const [languageId, setLanguageId] = useState(localStorage.getItem("language_id"));

    const [canEdit, setCanEdit] = useState(false)
    const handleEdit = () => {
        setCanEdit(!canEdit)
    }

    const handleProfileChange = () => {
        setLoading(true)

        let data = {
            "region": country,
            "language": language,
            "language_id": languageId
        };

        let requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/user/${userId}/`, requestOptions)
            .then(response => response.json())
            .then(res =>{
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("id", res.data.data.user_id);
                localStorage.setItem("username", res.data.data.username);
                localStorage.setItem("region", res.data.data.region);
                localStorage.setItem("email", res.data.data.email);
                localStorage.setItem("language", res.data.data.language);
                localStorage.setItem("language_id", res.data.data.language_id);
                enqueueSnackbar("Profile changed successfully", {
                    variant: "success",
                });
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
    }


    return (
        <>
            <Box px={3}>
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                    <Avatar
                        src={'https://source.unsplash.com/featured/300x202'}
                        sx={{background: '#181935', width: 150, height: 150, fontSize: '30px'}}
                    >
                        {
                            avatarKey ? avatarKey : 'K'
                        }
                    </Avatar>
                </Box>
                <Box mt={2} />
                <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
                    {
                        canEdit ? (
                            <Button onClick={handleEdit} sx={{textTransform: 'none', borderRadius: '10px', mb: 0.5}}>
                                Cancel
                            </Button>
                        ) : (
                            <IconButton onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                        )
                    }


                </Box>
                <Box mt={2} />
                <CustomTextField
                    disabled
                    page={'login'}
                    label={"Enter a username"}
                    type={"text"}
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <Box mt={2} />
                <CustomTextField
                    disabled
                    page={'login'}
                    label={"Enter Email ID"}
                    type={"email"}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <Box mt={2} />
                <CustomTextField
                    disabled={!canEdit}
                    page={'login'}
                    label={"Select Country"}
                    type={"text"}
                    select
                    value={country}
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                >
                    {countries.map((option) => (
                        <MenuItem key={option.code} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </CustomTextField>
                <Box mt={2} />
                <CustomTextField
                    disabled={!canEdit}
                    page={'login'}
                    label={"Change default language"}
                    type={"text"}
                    select
                    value={language}
                    onChange={(event) => {
                        setLanguage(event.target.value);
                        const language = languages.find(lang => lang.name === event.target.value);
                        setLanguageId(language.value)
                    }}
                >
                    {languages.map((option) => (
                        <MenuItem key={option.value} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </CustomTextField>
                <Box mt={11} />
                <Button
                    disabled={
                        loading ||
                        email === localStorage.getItem('email') &&
                        country === localStorage.getItem('region') &&
                        language === localStorage.getItem('language')
                    }
                    onClick={handleProfileChange}
                    disableElevation
                    variant={"contained"}
                    fullWidth
                    sx={{
                        backgroundColor: "#268AFF",
                        color: "#FFF",
                        borderRadius: "15px",
                        zIndex: 2,
                        py: 1.5,
                        "&:hover": {
                            // fontWeight: "600",
                            backgroundColor: "#006ff8",
                        },
                        textTransform: 'none'
                    }}
                >
                    Save
                </Button>
            </Box>
        </>
    );
};
export default Profile;
