import SiteLogo from "@/components/SiteLogo.tsx";
import StarBackground from "@/components/StarBackground.tsx";
import {Form, Link, useActionData, useLocation, useNavigation} from "react-router-dom";
import {Button} from "@assets/components/shadcnui/button.tsx";
import {CircleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@assets/components/shadcnui/alert.tsx";
import {InvitationTokenSchema} from "@/schemas/UserSchema.ts";

export default function RegisterPage() {
  const navigation = useNavigation();
  const isRegistering = navigation.state === 'submitting';
  const actionData = useActionData() as { has_error: boolean, error_title: string, error_message: string } | undefined;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = InvitationTokenSchema.safeParse(params.get('token')).data ?? '';

  return (
      <>
        <StarBackground/>
        <div className="w-screen h-screen items-center flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-50">
          <div className="mx-auto w-full max-w-sm z-10">
            <SiteLogo className="mx-auto h-3 w-auto flex justify-center items-center"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300 bg-black">
              Register your account
            </h2>
          </div>

          <div className="mt-5 mx-auto w-full max-w-sm z-10 bg-black">
            {
              actionData && 'has_error' in actionData ? (
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
              ) : null
            }
            <Form method="POST" className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-4 text-gray-300">
                  Username
                </label>
                <div className="mt-2">
                  <input
                      id="username"
                      name="username"
                      placeholder=""
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text sm:leading-6 p-2 text-l"
                      required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-300">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                      id="email"
                      name="email"
                      placeholder=""
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 p-2 text-l"
                      required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-300">
                  Password
                </label>
                <div className="mt-2">
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 p-2 text-l"
                      required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                      id="password_confirm"
                      name="password_confirm"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 p-2 text-l"
                      required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-300">
                    Invitation token
                  </label>
                </div>
                <div className="mt-2">
                  <input
                      id="invitationtoken"
                      name="invitationtoken"
                      placeholder="0000-0000-0000-0000-0000"
                      defaultValue={token}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.55 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text sm:leading-6 p-2 text-l"
                      required
                  />
                </div>
              </div>

              <div>
                <Button
                    type="submit"
                    disabled={isRegistering}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500"
                >
                  {isRegistering ? 'Registering' : 'Register'}
                </Button>
              </div>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500 z-10">
              Already have an account?{' '}
              <Link
                  to={"/login"}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </>
  )
}