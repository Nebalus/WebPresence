import ReferralClickAnalyticsCard from "@/features/referral/detail/ReferralClickAnalyticsCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {ReferralCodeSchema} from "@/schemas/ReferralSchemas.ts";
import {APP_DASHBOARD_PATH} from "@/constants.ts";
import {useEffect} from "react";
import ReferralDetailsCard from "@/features/referral/detail/ReferralDetailsCard.tsx";
import {useReferralStore} from "@/stores/ReferralStore.ts";
import {Button} from "@assets/components/shadcnui/button.tsx";
import ReferralPersistentDetailsCard from "@/features/referral/detail/ReferralPersistentDetailsCard.tsx";
import {ReferralQrCodeCard} from "@/features/referral/detail/ReferralQrCodeCard.tsx";

export default function ReferralsDetailsBoard() {
    const navigate = useNavigate();
    const params = useParams<{ referral_code: string }>();
    const referralCode = ReferralCodeSchema.safeParse(params.referral_code);
    const {getReferralByCode} = useReferralStore();

    useEffect(() => {
        if (!referralCode.success) {
            navigate(APP_DASHBOARD_PATH + 'referrals');
            return;
        }
        (async () => {
            const referral = await getReferralByCode(referralCode.data);
            if(!referral) {
                navigate(APP_DASHBOARD_PATH + 'referrals');
                return;
            }
        })();
    }, [referralCode, navigate, getReferralByCode]);

    if (!referralCode.success) {
        return null;
    }

    return (
        <div className="mt-4 flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 xl:grid-cols-3">
                <ReferralPersistentDetailsCard className="rounded-none" referralCode={referralCode.data} />
                <ReferralDetailsCard className="rounded-none" referralCode={referralCode.data}/>
                <ReferralQrCodeCard className="rounded-none" referralCode={referralCode.data} />
            </div>

            <ReferralClickAnalyticsCard referralCode={referralCode.data}/>

            <Button variant="secondary" onClick={() => window.history.back()} className="mt-4 cursor-pointer">
                Back
            </Button>
        </div>
    );
}