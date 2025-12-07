import SiteLogo from "@/components/SiteLogo.tsx";
import {Link} from "react-router-dom";
import {buttonVariants} from "@assets/components/shadcnui/button.tsx";
import {useAuthenticatedUserStore} from "@/stores/UserStore.ts";
import ExternalLink from "@/components/ExternalLink.tsx";

export default function LandingNavBar() {
    const { isAuthenticated } = useAuthenticatedUserStore();

    return (
        <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full z-50 backdrop-blur-2xl border-b">
            <SiteLogo/>
            <nav className="ml-auto gap-4 sm:gap-6">
                <Link className="text-sm font-bold hover:underline underline-offset-4 mx-3" to={"/blogs"}>
                    Blogs
                </Link>
                <Link className="text-sm font-bold hover:underline underline-offset-4 mx-3" to={"/linktree/nebalus"}>
                    Linktree
                </Link>
                <ExternalLink className="text-sm font-bold hover:underline underline-offset-4 mx-3" to={"https://status.nebalus.dev"}>
                    Status
                </ExternalLink>
                <Link className={"text-sm font-bold mx-3 " + buttonVariants({ variant: "outline" })} to={"/login"}>
                    {isAuthenticated() ? "Dashboard" : "Login"}
                </Link>
            </nav>
        </header>
    )
}