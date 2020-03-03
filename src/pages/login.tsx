import React, {
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    MouseEvent
} from "react";
import { AbstractClient, listOrganizations } from "../utils/abstractApi";
import { NextPage } from "next";

const Login: NextPage = () => {
    const [token, setToken] = useState<string | null>(null);

    const client = (token: string) => AbstractClient({ token });

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current) {
            console.log(formRef.current["token"]);
        }
    }, [formRef]);

    const handleFormChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setToken(ev.target.value);
    };
    const handleTokenSubmit = (ev: MouseEvent<HTMLButtonElement>) => {
        console.log(ev);
    };

    useEffect(() => {
        if (token) {
            const yay = client(token);
            listOrganizations({ client: yay }).then(x => console.log(x));
        }
    }, [token]);

    return (
        <div>
            Login
            <form ref={formRef}>
                <input
                    onChange={handleFormChange}
                    name="token"
                    type="text"
                    placeholder="token"
                ></input>
                <button onClick={handleTokenSubmit} type="button">
                    Go!
                </button>
            </form>
        </div>
    );
};

export default Login;
