import {ThemeProvider} from "../assets/providers/ThemeProvider.tsx";
import {RouterProvider} from "react-router-dom";
import {appRouter} from '@/AppRouter.tsx';
import ErrorPage from "@/pages/ErrorPage.tsx";

function App() {
    return (
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
              <RouterProvider router={appRouter} fallbackElement={<ErrorPage />}></RouterProvider>
          </ThemeProvider>
    )
}

export default App
