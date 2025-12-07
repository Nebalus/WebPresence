import {SquareTerminal} from "lucide-react";
import {Link} from "react-router-dom";
import {useAuthenticatedUserStore} from "@/stores/UserStore.ts";
import {APP_DASHBOARD_PATH} from "@/constants.ts";
import {useSidebar} from "@assets/components/shadcnui/sidebar.tsx";
import {cn} from "@assets/lib/utils.ts";

interface SiteLogoProps {
    className?: string
}

export default function SiteLogo({className}: SiteLogoProps) {
    const { isAuthenticated } = useAuthenticatedUserStore();

    const sidebarContext = (() => {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useSidebar()
        } catch {
            return null
        }
    })()

    const isCollapsed = sidebarContext?.state === "collapsed"

    return (
        <>
            <Link to={isAuthenticated() ? APP_DASHBOARD_PATH : "/"} className={className}>
                <div className="flex items-center justify-center">
                    <SquareTerminal className="h-8 w-8"/>
                    <span className={cn("ml-2 text-2xl font-bold transition-all duration-200", isCollapsed && "w-0 opacity-0 hidden")}>
                        nebalus.dev
                    </span>
                </div>
            </Link>
        </>
    )
}