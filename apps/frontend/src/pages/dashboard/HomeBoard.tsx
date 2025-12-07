import { Button } from "@assets/components/shadcnui/button.tsx";
import {toast} from "sonner";
export default function HomeBoard() {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
                    <Button
                        variant="outline"
                        onClick={() =>
                            toast("Test event has been created", {
                                description: new Date().toISOString(),
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                        }
                    >
                        Show Toast
                    </Button>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                </div>
            </div>
        </>
    );
}