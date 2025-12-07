import {createBrowserRouter, redirect} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import LoginPage from "@/pages/user/LoginPage";
import RegisterPage from "@/pages/user/RegisterPage";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout.tsx";
import loginAction from "@/actions/loginAction.ts";
import registerAction from "@/actions/registerAction.ts";
import HomeBoard from "@/pages/dashboard/HomeBoard.tsx";
import ReferralsPage from "@/pages/dashboard/referral/ReferralsPage.tsx";
import LinktreeBoard from "@/pages/dashboard/LinktreeBoard.tsx";
import TodosBoard from "@/features/todos/TodosBoard";
import ReferralPage from "@/pages/ReferralPage.tsx";
import ApiCommunicator from "@/communicator/ApiCommunicator.ts";
import protectedLoader from "@/loader/protectedLoader.ts";
import authenticatedLoader from "@/loader/authenticatedLoader.ts";
import {APP_DASHBOARD_PATH} from "@/constants.ts";
import WorkInProgress from "@/components/WorkInProgress.tsx";
import TimeCapsuleBoard from "@/features/timecapsule/TimeCapsuleBoard";
import {AccountSettingsPage} from "@/pages/user/settings/AccountSettingsPage.tsx";
import FormsBoard from "./pages/dashboard/FormsBoard.tsx";
import ApodBoard from "./pages/dashboard/ApodBoard.tsx";
import PasteBinBoard from "./pages/dashboard/PasteBinBoard.tsx";
import GamesIRLBoard from "@/pages/dashboard/GamesIRLBoard.tsx";
import BlogBoard from "@/pages/dashboard/BlogBoard.tsx";
import ReferralsDetailsBoard from "@/pages/dashboard/referral/ReferralDetailsPage.tsx";
import LinktreePage from "./pages/LinktreePage";
import BlogPage from "./pages/BlogPage";
import PrivacyPage from "./pages/PrivacyPage";

export const appRouter = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />
    },
    {
        path: APP_DASHBOARD_PATH,
        element: <DashboardLayout />,
        loader: protectedLoader,
        children: [
            {
                path: "",
                element: <HomeBoard />
            },
            {
                path: "games_irl",
                element: <GamesIRLBoard />
            },
            {
                path: "referrals",
                element: <ReferralsPage />,
            },
            {
                path: "referrals/:referral_code",
                element: <ReferralsDetailsBoard />
            },
            {
                path: "linktree",
                element: <LinktreeBoard />
            },
            {
                path: "todos",
                element: <TodosBoard />
            },
            {
                path: "time_capsule",
                element: <TimeCapsuleBoard />
            },
            {
                path: "forms",
                element: <FormsBoard />
            },
            {
                path: "apod",
                element: <ApodBoard />
            },
            {
                path: "paste_bin",
                element: <PasteBinBoard />
            },
            {
                path: "blog",
                element: <BlogBoard />
            },
        ]
    },
    {
        path: APP_DASHBOARD_PATH + "settings",
        loader: protectedLoader,
        children: [
            {
                path: "account",
                element: <AccountSettingsPage />,
            },
        ]
    },
    {
        path: "ref/:referral_code",
        element: <ReferralPage />
    },
    {
        path: "linktree/:username",
        element: <LinktreePage />
    },
    {
        path: "form/:form_id",
        element: <WorkInProgress />
    },
    {
        path: "blogs",
        element: <BlogPage />,
        children: [
            {        
                path: ":blog_id",
                element: <WorkInProgress />
            }
        ]
    },
    {
        path: "login",
        action: loginAction,
        loader: authenticatedLoader,
        element: <LoginPage />
    },
    {
        path: "register",
        action: registerAction,
        loader: authenticatedLoader,
        element: <RegisterPage />
    },
    {
        path: "logout",
        loader() {
            ApiCommunicator.logout();
            return redirect('/login');
        }
    },
    {
        path: "privacy",
        element: <PrivacyPage />
    },
    {
        path: "terms",
        element: <WorkInProgress />
    }
]);
