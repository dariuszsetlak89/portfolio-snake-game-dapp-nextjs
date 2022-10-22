import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            // router.go(-1)
            router.push("/");
        }, 5000);
    }, []);

    return (
        <div className="pt-40 text-center text-lime-600">
            <h1 className="p-5 text-6xl font-semibold">Ooops...</h1>
            <h2 className="p-2 text-4xl font-medium">That page cannot be found :(</h2>
            <p className="p-2 text-4xl font-medium">
                Going back to the{" "}
                <Link href="/">
                    <a className="underline">Homepage</a>
                </Link>{" "}
                in 5 seconds...
            </p>
        </div>
    );
}
