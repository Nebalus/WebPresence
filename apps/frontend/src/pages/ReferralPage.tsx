import StarBackground from "@/components/StarBackground.tsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReferralClickResponseSchema} from "@/schemas/ApiResponses/ReferralResponseSchemas.ts";
import SiteLogo from "@/components/SiteLogo.tsx";
import wait from "waait";
import {APP_BACKEND_API_URL} from "@/constants.ts";
import 'ldrs/react/Quantum.css';
import {Quantum} from "ldrs/react";

export default function ReferralPage() {
    const navigate = useNavigate();
    const referralCode = useParams<'referral_code'>().referral_code;
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${APP_BACKEND_API_URL}/services/referral/` + referralCode, {
                    method: 'GET',
                }).then(response => response.json()).then(data => ReferralClickResponseSchema.safeParseAsync(data));

                if (response.success) {
                    window.location.replace(response.data.payload.url);
                } else {
                    setError(true);
                    await wait(5000);
                    navigate('/');
                }
            } catch (e) {
                console.error(e);
                setError(true);
                await wait(5000);
                navigate('/');
            }
        })();
    }, [navigate, referralCode]);

    return (
        <>
            <StarBackground/>
            <div className="flex items-center justify-center fixed w-screen h-screen z-40">
                <div className="grid w-72 h-96 bg-gray-900 rounded-3xl p-4 overflow-clip">
                    <div className="w-auto h-24 flex mt-10 items-center justify-center flex-col">
                        <SiteLogo className="mt-28"/>
                        <h1 className="mt-10 mb-10 font-bold text-2xl">Redirecting</h1>
                        {error ? (
                            <div className="text-red-600 text-center">
                                <p>An error occurred while redirecting</p>
                                <p>Redirecting to Landing Page instead</p>
                            </div>
                            ) : (
                            <div className="w-auto flex items-center justify-center">
                                <Quantum
                                    size="45"
                                    speed="1.75"
                                    color="white"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}