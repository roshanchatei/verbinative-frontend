
import {Box, Button, MenuItem} from "@mui/material";
import CustomTextField from "@/src/components/CustomTextField";
import {countries} from "@/src/store/countries";
import {languages} from "@/src/store/languages";

const Index = ({username, setUsername, country, setCountry, language, setLanguage, languageId, setLanguageId, loading, handleSignUp}) => {


    return (
        <>
            <Box fontSize={'24px'} fontWeight={500}>
                Sign Up
            </Box>
            <Box color={'#333333'} fontSize={'12px'}>
                Enter a unique username, country and default language for your account.
            </Box>
            <Box mt={5} />
            <CustomTextField
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
                page={'login'}
                label={"Select default language"}
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
            <Box mt={4} />
            <Button
                disabled={username === '' || country === '' || language === '' || languageId === '' || loading}
                onClick={handleSignUp}
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
                        backgroundColor: "#006ff8",
                    },
                    textTransform: 'none'
                }}
            >
                Sign Up
            </Button>
        </>
    );
}

export default Index;
