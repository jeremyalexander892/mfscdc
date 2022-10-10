import "../styles/index.css"
import { useRouter } from "next/router"

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    return (
        <Component {...pageProps} key={router.route}/>
    )
}
export default MyApp
