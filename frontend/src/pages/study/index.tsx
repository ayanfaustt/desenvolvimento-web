interface LoginPageProps {
    userName: string;
    password: string;
    data: Date;
    number: number;

}
export default function LoginPage(props : LoginPageProps){
    return(
        <>{props.password}</>
    )
}