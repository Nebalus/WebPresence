import {Link} from "react-router-dom";
import StarBackground from "@/components/StarBackground.tsx";
import {useAuthenticatedUserStore} from "@/stores/UserStore.ts";
import {APP_DASHBOARD_PATH} from "@/constants.ts";

export default function ErrorPage() {
  const { isAuthenticated } = useAuthenticatedUserStore();

  const renderGoToDashboardButton = () => {
    if (isAuthenticated()) {
      return (
        <Link
            to={APP_DASHBOARD_PATH}
            className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Go to dashboard
        </Link>
      )
    }
  };

  return (
      <>
        <StarBackground />
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center z-20 bg-black">
            <h1 className="text-9xl font-bold tracking-tight text-primary">404</h1>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Oops, the page you were looking for does not exist.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                  to={"/"}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Go to landing page
              </Link>
              {renderGoToDashboardButton()}
            </div>
          </div>
        </div>
      </>
  )
}
