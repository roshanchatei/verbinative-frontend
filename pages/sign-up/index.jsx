
import {Box} from "@mui/material";
import {useState} from "react";
import MainContainer from "@/src/components/MainContainer";
import EmailPassword from "@/src/page-components/SignUp/EmailPassword";
import BasicDetails from "@/src/page-components/SignUp/BasicDetails";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";

const Index = () => {

    const Router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");
    const [languageId, setLanguageId] = useState("");


    const [current, setCurrent] = useState(0);
    const [loading,  setLoading] = useState(false);


    const handleSignUp = () => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": username,
            "region": country,
            "email": email,
            "password": password,
            "language": language,
            "language_id": languageId
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/user/signup", requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                console.log(result)
                if (result.message === "success") {
                    await Router.push('/login')
                    enqueueSnackbar("SignUp Successful", {
                        variant: "success",
                    });
                } else if (result.message === "error") {
                    enqueueSnackbar("Signup Unsuccessful: Something went wrong", {
                        variant: "error",
                    });
                }
            })
            .catch(error => console.log('error', error));

        setLoading(false)
    }

    // useEffect(() => {
    //     const translateMessages = async () => {
    //         const translated = await Promise.all(
    //             messageList.map(async message => {
    //                 if (message.created_by !== userId) {
    //                     const translatedText = await translate(message.text);
    //                     return {
    //                         ...message,
    //                         text: translatedText
    //                     };
    //                 }
    //                 return message;
    //             })
    //         );
    //         setMessageList(translated);
    //     };
    //     translateMessages();
    // }, [messageList]);

    return (
        <>
            <MainContainer current={current} setCurrent={setCurrent}>
                {
                    current === 0 && (
                        <EmailPassword
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            setCurrent={setCurrent}
                        />
                    )
                }
                {
                    current === 1 && (
                        <BasicDetails
                            username={username}
                            setUsername={setUsername}
                            country={country}
                            setCountry={setCountry}
                            language={language}
                            setLanguage={setLanguage}
                            languageId={languageId}
                            setLanguageId={setLanguageId}
                            loading={loading}
                            handleSignUp={handleSignUp}
                        />
                    )
                }

                <Box mt={5} display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
                    <Box color={'#333333'} fontSize={'12px'}>
                        Already have an account?
                    </Box>
                    <Box sx={{cursor: 'pointer'}} ml={0.5} fontWeight={500} fontSize={'14px'} color={'#006ff8'}
                         onClick={async () => {
                             await Router.push('/login')
                         }}
                    >
                        LOGIN
                    </Box>

                </Box>
            </MainContainer>
        </>
    );
}

export default Index;
Index.layout = null;
Index.title = 'Sign up';
