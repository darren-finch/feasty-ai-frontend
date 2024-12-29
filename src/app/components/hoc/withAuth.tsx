import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading";
import { Session } from "next-auth";

export interface AuthenticatedPageProps {
    session: Session;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & AuthenticatedPageProps>) => {
    return (props: P) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === "unauthenticated") {
                // Redirect to sign-in page if user is not authenticated
                router.push("/login");
            }
        }, [status, router]);

        if (status === "loading") {
            // Display loading screen while session is being fetched
            return (
                <Loading />
            );
        }

        // Render the wrapped component only if the session exists
        return session ? <WrappedComponent {...props} session={session} /> : null;
    };
};

export default withAuth;
