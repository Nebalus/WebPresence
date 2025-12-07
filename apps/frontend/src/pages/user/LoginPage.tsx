import SiteLogo from "@/components/SiteLogo.tsx";
import StarBackground from "@/components/StarBackground.tsx";
import {Form, Link, useActionData, useLocation, useNavigation} from "react-router-dom";
import {Button} from "@assets/components/shadcnui/button.tsx";
import {CircleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@assets/components/shadcnui/alert.tsx";
import {APP_DASHBOARD_PATH} from "@/constants.ts";
import {Input} from "@assets/components/shadcnui/input.tsx";

export default function LoginPage() {
  const navigation = useNavigation();
  const isSigningIn = navigation.state === 'submitting';
  const actionData = useActionData() as { has_error: boolean, error_title: string, error_message: string } | undefined;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get('next') || APP_DASHBOARD_PATH;
  const registerSuccess = params.get('register_success') === 'true';

  return (
      <>
        <StarBackground />
        <div className="w-screen h-screen items-center flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-50">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm z-10">
            <SiteLogo className="mx-auto h-3 w-auto flex justify-center items-center" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight bg-black text-gray-300">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-5 mx-auto w-full max-w-sm z-10 bg-black">

            {
                registerSuccess ? (
                    <Alert className="min-h-[50px] bg-green-800 mb-4">
                        <CircleAlert className="h-8 w-8"/>
                        <div>
                        <AlertTitle>
                            Registration successful
                        </AlertTitle>
                        <AlertDescription className="overflow-">
                            You can now login to your account
                        </AlertDescription>
                        </div>
                    </Alert>
                ) : null
            }

            {actionData && 'has_error' in actionData ? (
                <Alert className="min-h-[50px] bg-red-800 mb-4">
                  <CircleAlert className="h-8 w-8"/>
                  <div>
                    <AlertTitle>
                      {actionData.error_title}
                    </AlertTitle>
                    <AlertDescription className="overflow-">
                      {actionData.error_message}
                    </AlertDescription>
                  </div>
                </Alert>
            ) : null}

            <Form method="POST" className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-300">
                  Username
                </label>
                <div className="mt-2">
                  <input
                      id="username"
                      name="username"
                      placeholder=""
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text sm:leading-6 p-2 text-l"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-300">
                    Password
                  </label>
                  {/*<div className="text-sm">*/}
                  {/*  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                  {/*    Forgot password?*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                </div>
                <div className="mt-2">
                  <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 p-2 text-l"
                  />
                </div>
              </div>

              <div>
                <Button
                    type="submit"
                    disabled={isSigningIn}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500"
                >
                  {isSigningIn ? 'Signing in' : 'Sign in'}
                </Button>
                <Input type="hidden" name="redirectTo" value={next} />
              </div>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500 z-10">
              Dont have an account?{' '}
              <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </>
  )
}