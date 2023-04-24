import {Avatar, Box, Button, IconButton, MenuItem} from "@mui/material";
import CustomTextField from "@/src/components/CustomTextField";
import {useState} from "react";
import {countries} from "@/src/store/countries";
import {languages} from "@/src/store/languages";
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {

    const avatarKey = localStorage.getItem('username')[0].toUpperCase();

    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState(localStorage.getItem("region"));
    const [language, setLanguage] = useState(localStorage.getItem("language"));
    const [languageId, setLanguageId] = useState(localStorage.getItem("language_id"));

    const [canEdit, setCanEdit] = useState(false)

    const handleEdit = () => {
        setCanEdit(!canEdit)
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
                    disabled={!canEdit}
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
                        email === localStorage.getItem('email') &&
                        country === localStorage.getItem('region') &&
                        language === localStorage.getItem('language')
                    }
                    // onClick={handleSignUp}
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
