import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@assets/components/shadcnui/table.tsx"
import {useReferralStore} from "@/stores/ReferralStore.ts";
import TableSkeleton from "@/components/TableSkeleton.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Badge} from "@assets/components/shadcnui/badge.tsx";
import {Copy, Trash2} from "lucide-react";
import {APP_FRONTEND_FULL_PATH} from "@/constants.ts";
import {toast} from "sonner";
import ReferralDeleteConfirmationModal
    from "@/features/referral/modal/ReferralDeleteConfirmationModal.tsx";

export default function ReferralsTable() {
    const {referrals, isHydrated, hydrateReferrals} = useReferralStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isHydrated()) {
            return;
        }
        
        hydrateReferrals();
    }, [hydrateReferrals, isHydrated, referrals]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead className="w-[100px]">Code</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead>Url</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isHydrated() ? (
                            referrals.map((referral) => (
                                <TableRow className="cursor-pointer" key={"REFERRAL" + referral.code} onClick={() => {navigate(`./${referral.code}`)}}>
                                    <TableCell
                                        onClick={async (event) => {
                                            event.stopPropagation();

                                            try {
                                                await navigator.clipboard.writeText(APP_FRONTEND_FULL_PATH + "/ref/" + referral.code);

                                                toast("Referral copied",{
                                                    description: "The referral link has been copied to your clipboard",
                                                });

                                            } catch {
                                                toast("Hmm something went wrong",{
                                                    description: "Could not copy referral link",
                                                    className: "bg-red-900"
                                                });
                                            }
                                        }}
                                    >
                                        <Copy className="w-6 h-6" />
                                    </TableCell>
                                    <TableCell className="font-medium">{referral.code}</TableCell>
                                    <TableCell>{referral.label}</TableCell>
                                    <TableCell>{referral.url}</TableCell>
                                    <TableCell><Badge variant="secondary">{referral.disabled ? "Disabled" : "Enabled"}</Badge></TableCell>
                                    <ReferralDeleteConfirmationModal referral={referral}>
                                        <TableCell
                                            className="group"
                                        >
                                            <Trash2 className="group-hover:text-red-500 transition-all duration-150" />
                                        </TableCell>
                                    </ReferralDeleteConfirmationModal>
                                </TableRow>
                            ))
                        ) : (
                            <TableSkeleton rows={12} columns={6}/>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}
