import { useUserContext } from "../../contexts/UserContext";

export function Home() {

    const userContext = useUserContext();

    const username = userContext.user ? userContext.user!.username : "Loading";

    return <div>Welcome {username}</div>
}
