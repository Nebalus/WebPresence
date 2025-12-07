import {QRCodeCanvas} from "qrcode.react";
import {APP_FRONTEND_FULL_PATH} from "@/constants.ts";
import {ReferralCode} from "@/schemas/ReferralSchemas.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@assets/components/shadcnui/card.tsx";

export function ReferralQrCodeCard({ referralCode, className }: { referralCode: ReferralCode, className?: string  }) {
    return (
        <Card className={className}>
            <CardHeader>
                <div className="grid gap-1 text-center sm:text-left">
                    <CardTitle>
                        Scan QR Code
                    </CardTitle>
                    <CardDescription>
                        Showing the qr code for the referral link
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="h-full">
                <QRCodeCanvas
                    value={APP_FRONTEND_FULL_PATH + "/ref/" + referralCode}
                    imageSettings={{
                        src: "/static/icons/dark_logo.svg",
                        height: 60,
                        width: 60,
                        excavate: true,
                    }}
                    className="m-auto"
                    size={256}
                    level="Q"/>
            </CardContent>
        </Card>
    );
}
