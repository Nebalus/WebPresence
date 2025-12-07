import * as React from "react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@assets/components/shadcnui/card.tsx"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@assets/components/shadcnui/chart.tsx"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@assets/components/shadcnui/select.tsx"
import ApiCommunicator from "@/communicator/ApiCommunicator.ts";
import {ReferralClickHistoryDataPoint, ReferralCode} from "@/schemas/ReferralSchemas.ts";
import {
    ReferralClickHistoryResponseSchema
} from "@/schemas/ApiResponses/ReferralResponseSchemas.ts";
import {useEffect} from "react";

export default function ReferralClickAnalyticsCard({ referralCode }: { referralCode: ReferralCode }) {
    const [timeRange, setTimeRange] = React.useState("90")
    const [chartData, setChartData] = React.useState([] as ReferralClickHistoryDataPoint[]);

    useEffect(() => {
        (async () => {
            const response = await ApiCommunicator.apiFetch({
                context: {
                    method: 'GET'
                },
                route: `/ui/user/services/referrals/${referralCode}/click_history?range=${timeRange}`
            }).catch().then(response => response.json()).then(data => ReferralClickHistoryResponseSchema.safeParseAsync(data));

            if(response.success) {
                setChartData(response.data.payload.history);
            }
        })();
    }, [referralCode, timeRange]);

    const chartConfig = {
        count: {
            label: "Clicks",
            color: "hsl(var(--chart-1))",
        },
        unique_visitors: {
            label: "Unique Visitors ", // U+2003 EM SPACE don't remove
            color: "hsl(var(--chart-2))",
        }
    } satisfies ChartConfig

    return (
        <Card className="rounded-none">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid gap-1 text-center sm:text-left">
                    <CardTitle>Referral Click Events</CardTitle>
                    <CardDescription>
                        Showing the total Referral Click Events
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months"/>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-count)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-count)"
                                    stopOpacity={0.0}
                                />
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="fillUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-unique_visitors)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-unique_visitors)"
                                    stopOpacity={0.0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="count"
                            type="bump"
                            fill="url(#fillClicks)"
                            stroke="var(--color-count)"
                            stackId=";)"
                        />
                        <Area
                            dataKey="unique_visitors"
                            type="bump"
                            fill="url(#fillUniqueVisitors)"
                            stroke="var(--color-unique_visitors)"
                            stackId="c;)"
                        />
                        <ChartLegend content={<ChartLegendContent/>}/>
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}