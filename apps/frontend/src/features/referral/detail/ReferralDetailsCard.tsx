import {Referral, ReferralCode} from "@/schemas/ReferralSchemas.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@assets/components/shadcnui/card.tsx";
import {useReferralStore} from "@/stores/ReferralStore.ts";
import {useEffect, useState} from "react";
import {Button} from "@assets/components/shadcnui/button.tsx";
import ReferralDeleteConfirmationModal
    from "@/features/referral/modal/ReferralDeleteConfirmationModal.tsx";
import {useForm} from "react-hook-form";
import {
    UpdateReferralForm,
    UpdateReferralFormSchema
} from "@/schemas/Forms/ReferralFormSchemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@assets/components/shadcnui/form.tsx";
import {Input} from "@assets/components/shadcnui/input.tsx";
import {APP_FRONTEND_FULL_PATH} from "@/constants.ts";
import {Checkbox} from "@assets/components/shadcnui/checkbox.tsx";
import {ReferralStoreActionResponse} from "@/schemas/ZustandSchemas.ts";
import {toast} from "sonner";

export default function ReferralDetailsCard({ referralCode, className }: { referralCode: ReferralCode, className?: string }) {
    const {referrals, getReferralByCode, updateReferral} = useReferralStore();
    const [referral, setReferral] = useState<Referral>();
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<UpdateReferralForm>({
        resolver: zodResolver(UpdateReferralFormSchema),
        values: referral,
        defaultValues: {
            label: "",
            url: "",
            disabled: false
        },
    })

    useEffect(() => {
        (async () => {
            const referral = await getReferralByCode(referralCode);
            if(referral) {
                setReferral(referral);
                return;
            }
        })();
    }, [getReferralByCode, referralCode, referrals, setReferral]);

    async function onSubmit(data: UpdateReferralForm) {
        setIsSaving(true);
        await updateReferral(data, referralCode)
            .then((response: ReferralStoreActionResponse) => {
                setIsSaving(false);

                if(response.success) {
                    toast("Referral Updated", {
                        className: "",
                        description: ""
                    })
                    return;
                }

                toast("An Error occurred while edit an Referral", {
                    className: "bg-red-500",
                    description: response.message
                })
            });
    }

    return <>
        {referral != undefined ?
            <Card className={className}>
                <CardHeader>
                    <div className="grid gap-1 text-center sm:text-left">
                        <CardTitle>
                            Details
                        </CardTitle>
                        <CardDescription>
                            Shows and edits the details of the referral
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="label"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Referral Label</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Example Referral"
                                                {...field}
                                                value={field.value ?? ""}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Url</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={APP_FRONTEND_FULL_PATH}
                                                {...field}
                                                value={field.value ?? ""}
                                                type="url"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="disabled"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Disabled</FormLabel>
                                        <FormControl>
                                            <Checkbox className="cursor-pointer" checked={field.value} onCheckedChange={field.onChange}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                <ReferralDeleteConfirmationModal referral={referral} className="w-1/2">
                                    <Button variant="destructive" className="cursor-pointer w-full">Delete</Button>
                                </ReferralDeleteConfirmationModal>
                                <Button variant="default" className="cursor-pointer w-1/2" disabled={isSaving}>{isSaving ? "Saving" : "Save"}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        : null}
    </>
}