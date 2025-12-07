import {useLocation, useNavigate} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@assets/components/shadcnui/breadcrumb";
import { Fragment } from "react";
import {APP_DASHBOARD_PATH} from "@/constants.ts";

export function DashboardDynamicBreadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split("/").filter((x) => x && x !== Array.from(APP_DASHBOARD_PATH).filter(char => char !== "/").join(''));

    const format = (s: string) => {
        return (s.charAt(0).toUpperCase() + s.slice(1)).replace("_", " ").replace("-", " ");
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="cursor-pointer" onClick={() => {navigate(APP_DASHBOARD_PATH)}}>
                        Dashboard
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.map((name, index) => {
                    const routeTo = APP_DASHBOARD_PATH + `${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <Fragment key={routeTo}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{format(name)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink className="cursor-pointer" onClick={() => {navigate(routeTo)}}>
                                        {format(name)}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
