import {Referral, ReferralCode} from "@/schemas/ReferralSchemas.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@assets/components/shadcnui/card.tsx";
import {useReferralStore} from "@/stores/ReferralStore.ts";
import {useEffect, useState} from "react";
import ReactTimeAgo from "react-time-ago";

export default function ReferralPersistentDetailsCard({ referralCode, className }: { referralCode: ReferralCode, className?: string }) {
    const {referrals, getReferralByCode} = useReferralStore();
    const [referral, setReferral] = useState<Referral>();

    useEffect(() => {
        (async () => {
            const referral = await getReferralByCode(referralCode);
            if(referral) {
                setReferral(referral);
                return;
            }
        })();
    }, [getReferralByCode, referralCode, referrals, setReferral]);

    return <>
        {referral != undefined ?
            <Card className={className}>
                <CardHeader>
                    <div className="grid gap-1 text-center sm:text-left">
                        <CardTitle>
                            Persistent Details
                        </CardTitle>
                        <CardDescription>
                            Showing the persistent details of the referral
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>Code: {referral.code}</p>
                    <p>Created: <ReactTimeAgo date={new Date(referral.created_at)}/> </p>
                    <p>Updated: <ReactTimeAgo date={new Date(referral.updated_at)}/></p>
                </CardContent>
            </Card>
        : null}
    </>
}