"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import type { LegendProps, TooltipProps } from "recharts";

export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
  };
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  data: Record<string, number | string>[];
  type?: "bar" | "line";
}

export function Chart({ config, data, type = "bar", className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent config={config} />} />
            <Legend content={<ChartLegendContent config={config} />} />
            {Object.keys(config).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key].color || "#8884d8"}
                name={config[key].label}
              />
            ))}
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent config={config} />} />
            <Legend content={<ChartLegendContent config={config} />} />
            {Object.keys(config).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config[key].color || "#8884d8"}
                name={config[key].label}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

// ---------------- HELPER ----------------
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: Record<string, unknown> | null | undefined,
  key: string
) {
  if (!payload || typeof payload !== "object") return undefined;

  const payloadPayload =
    "payload" in payload && payload.payload && typeof payload.payload === "object"
      ? (payload.payload as Record<string, unknown>)
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof (payload as Record<string, unknown>)[key] === "string") {
    configLabelKey = (payload as Record<string, unknown>)[key] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : undefined;
}

// ---------------- LEGEND ----------------
type LegendEntry = {
  dataKey: string;
  color?: string;
  value?: string;
  [key: string]: unknown;
};

export function ChartLegendContent({
  payload,
  config,
}: {
  payload?: LegendEntry[];
  config: ChartConfig;
}) {
  if (!payload) return null;

  return (
    <ul className="flex flex-wrap gap-4">
      {payload.map((entry: LegendEntry, index: number) => {
        const itemConfig = getPayloadConfigFromPayload(config, entry, "dataKey");
        return (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="block w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span>{itemConfig?.label || entry.value}</span>
          </li>
        );
      })}
    </ul>
  );
}

// ---------------- TOOLTIP ----------------
type TooltipEntry = {
  color?: string;
  name?: string;
  value?: number | string;
  payload?: Record<string, unknown>;
  [key: string]: unknown;
};

export function ChartTooltipContent({
  active,
  payload,
  config,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  config: ChartConfig;
}) {
  const safePayload = React.useMemo(
    () => (payload && payload.length ? payload[0].payload : null),
    [payload]
  );

  if (!active || !payload || payload.length === 0 || !safePayload) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {payload.map((entry: TooltipEntry, index: number) => {
        const itemConfig = getPayloadConfigFromPayload(config, entry, "dataKey");
        return (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <span
              className="block w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span>{itemConfig?.label || entry.name}:</span>
            <span>{entry.value}</span>
          </div>
        );
      })}
    </div>
  );
}











// "use client";

// import * as React from "react";
// import * as RechartsPrimitive from "recharts";

// import { cn } from "./utils";

// // ---------- Local minimal Recharts item types (avoid non-exported types) ----------
// type TooltipItem = {
//   color?: string;
//   dataKey?: string | number;
//   name?: string;
//   value?: number | string | null;
//   payload?: Record<string, unknown> & { fill?: string };
// };

// type LegendItem = {
//   color?: string;
//   dataKey?: string | number;
//   value?: string;
// };

// // Props Recharts passes to a custom <Tooltip content={<.../>} />
// type TooltipContentProps = React.ComponentProps<"div"> & {
//   active?: boolean;
//   payload?: TooltipItem[];
//   label?: unknown;
//   labelFormatter?: (label: unknown, payload?: TooltipItem[]) => React.ReactNode;
//   formatter?: (
//     value: unknown,
//     name: unknown,
//     item: TooltipItem,
//     index: number,
//     raw?: unknown,
//   ) => React.ReactNode;
//   className?: string;
//   color?: string;
//   nameKey?: string;
//   labelKey?: string;
//   labelClassName?: string;
//   // our extras
//   hideLabel?: boolean;
//   hideIndicator?: boolean;
//   indicator?: "line" | "dot" | "dashed";
// };

// type LegendContentProps = React.ComponentProps<"div"> & {
//   payload?: LegendItem[];
//   verticalAlign?: "top" | "middle" | "bottom";
//   hideIcon?: boolean;
//   nameKey?: string;
// };

// // ---------- Theme / Config ----------
// const THEMES = { light: "", dark: ".dark" } as const;

// export type ChartConfig = {
//   [k in string]: {
//     label?: React.ReactNode;
//     icon?: React.ComponentType;
//   } & (
//     | { color?: string; theme?: never }
//     | { color?: never; theme: Record<keyof typeof THEMES, string> }
//   );
// };

// type ChartContextProps = {
//   config: ChartConfig;
// };

// const ChartContext = React.createContext<ChartContextProps | null>(null);

// function useChart() {
//   const context = React.useContext(ChartContext);
//   if (!context) {
//     throw new Error("useChart must be used within a <ChartContainer />");
//   }
//   return context;
// }

// // ---------- Container ----------
// function ChartContainer({
//   id,
//   className,
//   children,
//   config,
//   ...props
// }: React.ComponentProps<"div"> & {
//   config: ChartConfig;
//   children: React.ComponentProps<
//     typeof RechartsPrimitive.ResponsiveContainer
//   >["children"];
// }) {
//   const uniqueId = React.useId();
//   const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

//   return (
//     <ChartContext.Provider value={{ config }}>
//       <div
//         data-slot="chart"
//         data-chart={chartId}
//         className={cn(
//           "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
//           className,
//         )}
//         {...props}
//       >
//         <ChartStyle id={chartId} config={config} />
//         <RechartsPrimitive.ResponsiveContainer>
//           {children}
//         </RechartsPrimitive.ResponsiveContainer>
//       </div>
//     </ChartContext.Provider>
//   );
// }

// // ---------- Dynamic CSS variables for series colors ----------
// const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
//   const colorConfig = Object.entries(config).filter(
//     ([, cfg]) => cfg.theme || cfg.color,
//   );

//   if (!colorConfig.length) return null;

//   return (
//     <style
//       dangerouslySetInnerHTML={{
//         __html: Object.entries(THEMES)
//           .map(
//             ([theme, prefix]) => `
// ${prefix} [data-chart=${id}] {
// ${colorConfig
//   .map(([key, itemConfig]) => {
//     const color =
//       itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
//       itemConfig.color;
//     return color ? `  --color-${key}: ${color};` : "";
//   })
//   .join("\n")}
// }
// `,
//           )
//           .join("\n"),
//       }}
//     />
//   );
// };

// // ---------- Tooltip ----------
// const ChartTooltip = RechartsPrimitive.Tooltip;

// function ChartTooltipContent({
//   active,
//   payload,
//   className,
//   indicator = "dot",
//   hideLabel = false,
//   hideIndicator = false,
//   label,
//   labelFormatter,
//   labelClassName,
//   formatter,
//   color,
//   nameKey,
//   labelKey,
//   ...rest
// }: TooltipContentProps) {
//   const { config } = useChart();
//   const safePayload = (payload ?? []) as TooltipItem[];

//   const tooltipLabel = React.useMemo(() => {
//     if (hideLabel || !safePayload.length) return null;

//     const [item] = safePayload;
//     const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
//     const itemConfig = getPayloadConfigFromPayload(config, item, key);
//     const value =
//       !labelKey && typeof label === "string"
//         ? config[label as keyof typeof config]?.label ?? label
//         : itemConfig?.label;

//     if (labelFormatter) {
//       return (
//         <div className={cn("font-medium", labelClassName)}>
//           {labelFormatter(value, safePayload)}
//         </div>
//       );
//     }

//     if (!value) return null;
//     return <div className={cn("font-medium", labelClassName)}>{value}</div>;
//   }, [label, labelFormatter, safePayload, hideLabel, labelClassName, config, labelKey]);

//   if (!active || !safePayload.length) return null;

//   const nestLabel = safePayload.length === 1 && indicator !== "dot";

//   return (
//     <div
//       className={cn(
//         "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
//         className,
//       )}
//       {...rest}
//     >
//       {!nestLabel ? tooltipLabel : null}
//       <div className="grid gap-1.5">
//         {safePayload.map((item, index) => {
//           const key = `${nameKey || item.name || item.dataKey || "value"}`;
//           const itemConfig = getPayloadConfigFromPayload(config, item, key);
//           const indicatorColor =
//             color || item.payload?.fill || item.color || "currentColor";

//           return (
//             <div
//               key={(item.dataKey as React.Key) ?? index}
//               className={cn(
//                 "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
//                 indicator === "dot" && "items-center",
//               )}
//             >
//               {formatter && item?.value !== undefined ? (
//                 formatter(item.value, item.name ?? key, item, index, item.payload)
//               ) : (
//                 <>
//                   {itemConfig?.icon ? (
//                     <itemConfig.icon />
//                   ) : (
//                     !hideIndicator && (
//                       <div
//                         className={cn(
//                           "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
//                           {
//                             "h-2.5 w-2.5": indicator === "dot",
//                             "w-1": indicator === "line",
//                             "w-0 border-[1.5px] border-dashed bg-transparent":
//                               indicator === "dashed",
//                             "my-0.5": nestLabel && indicator === "dashed",
//                           },
//                         )}
//                         style={
//                           {
//                             // CSS variables consumed by the arbitrary styles above
//                             "--color-bg": indicatorColor,
//                             "--color-border": indicatorColor,
//                           } as React.CSSProperties
//                         }
//                       />
//                     )
//                   )}
//                   <div
//                     className={cn(
//                       "flex flex-1 justify-between leading-none",
//                       nestLabel ? "items-end" : "items-center",
//                     )}
//                   >
//                     <div className="grid gap-1.5">
//                       {nestLabel ? tooltipLabel : null}
//                       <span className="text-muted-foreground">
//                         {itemConfig?.label ?? item.name}
//                       </span>
//                     </div>
//                     {item.value !== undefined && item.value !== null && (
//                       <span className="text-foreground font-mono font-medium tabular-nums">
//                         {typeof item.value === "number"
//                           ? item.value.toLocaleString()
//                           : String(item.value)}
//                       </span>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ---------- Legend ----------
// const ChartLegend = RechartsPrimitive.Legend;

// function ChartLegendContent({
//   className,
//   hideIcon = false,
//   payload,
//   verticalAlign = "bottom",
//   nameKey,
//   ...rest
// }: LegendContentProps) {
//   const { config } = useChart();

//   if (!payload?.length) return null;

//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center gap-4",
//         verticalAlign === "top" ? "pb-3" : "pt-3",
//         className,
//       )}
//       {...rest}
//     >
//       {payload.map((item, index) => {
//         const key = `${nameKey || item.dataKey || "value"}`;
//         const itemConfig = getPayloadConfigFromPayload(config, item as any, key);

//         return (
//           <div
//             key={(item.value as React.Key) ?? index}
//             className={cn(
//               "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
//             )}
//           >
//             {itemConfig?.icon && !hideIcon ? (
//               <itemConfig.icon />
//             ) : (
//               <div
//                 className="h-2 w-2 shrink-0 rounded-[2px]"
//                 style={{ backgroundColor: item.color }}
//               />
//             )}
//             {itemConfig?.label ?? item.value}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ---------- Helper ----------
// function getPayloadConfigFromPayload(
//   config: ChartConfig,
//   payload: TooltipItem | LegendItem,
//   key: string,
// ) {
//   if (typeof payload !== "object" || payload === null) return undefined;

//   const payloadPayload =
//     "payload" in payload && payload.payload && typeof payload.payload === "object"
//       ? (payload.payload as Record<string, unknown>)
//       : undefined;

//   let configLabelKey: string = key;

//   if (
//     key in payload &&
//     typeof (payload as any)[key] === "string"
//   ) {
//     configLabelKey = (payload as any)[key] as string;
//   } else if (
//     payloadPayload &&
//     key in payloadPayload &&
//     typeof payloadPayload[key] === "string"
//   ) {
//     configLabelKey = payloadPayload[key] as string;
//   }

//   return configLabelKey in config
//     ? config[configLabelKey]
//     : (config as any)[key];
// }

// export {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
//   ChartStyle,
// };





















// "use client";

// import * as React from "react";
// import * as RechartsPrimitive from "recharts";

// import { cn } from "./utils";

// // Format: { THEME_NAME: CSS_SELECTOR }
// const THEMES = { light: "", dark: ".dark" } as const;

// export type ChartConfig = {
//   [k in string]: {
//     label?: React.ReactNode;
//     icon?: React.ComponentType;
//   } & (
//     | { color?: string; theme?: never }
//     | { color?: never; theme: Record<keyof typeof THEMES, string> }
//   );
// };

// type ChartContextProps = {
//   config: ChartConfig;
// };

// const ChartContext = React.createContext<ChartContextProps | null>(null);

// function useChart() {
//   const context = React.useContext(ChartContext);

//   if (!context) {
//     throw new Error("useChart must be used within a <ChartContainer />");
//   }

//   return context;
// }

// function ChartContainer({
//   id,
//   className,
//   children,
//   config,
//   ...props
// }: React.ComponentProps<"div"> & {
//   config: ChartConfig;
//   children: React.ComponentProps<
//     typeof RechartsPrimitive.ResponsiveContainer
//   >["children"];
// }) {
//   const uniqueId = React.useId();
//   const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

//   return (
//     <ChartContext.Provider value={{ config }}>
//       <div
//         data-slot="chart"
//         data-chart={chartId}
//         className={cn(
//           "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
//           className,
//         )}
//         {...props}
//       >
//         <ChartStyle id={chartId} config={config} />
//         <RechartsPrimitive.ResponsiveContainer>
//           {children}
//         </RechartsPrimitive.ResponsiveContainer>
//       </div>
//     </ChartContext.Provider>
//   );
// }

// const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
//   const colorConfig = Object.entries(config).filter(
//     ([, config]) => config.theme || config.color,
//   );

//   if (!colorConfig.length) {
//     return null;
//   }

//   return (
//     <style
//       dangerouslySetInnerHTML={{
//         __html: Object.entries(THEMES)
//           .map(
//             ([theme, prefix]) => `
// ${prefix} [data-chart=${id}] {
// ${colorConfig
//   .map(([key, itemConfig]) => {
//     const color =
//       itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
//       itemConfig.color;
//     return color ? `  --color-${key}: ${color};` : null;
//   })
//   .join("\n")}
// }
// `,
//           )
//           .join("\n"),
//       }}
//     />
//   );
// };

// const ChartTooltip = RechartsPrimitive.Tooltip;

// function ChartTooltipContent({
//   active,
//   payload,
//   className,
//   indicator = "dot",
//   hideLabel = false,
//   hideIndicator = false,
//   label,
//   labelFormatter,
//   labelClassName,
//   formatter,
//   color,
//   nameKey,
//   labelKey,
// }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
//   React.ComponentProps<"div"> & {
//     hideLabel?: boolean;
//     hideIndicator?: boolean;
//     indicator?: "line" | "dot" | "dashed";
//     nameKey?: string;
//     labelKey?: string;
//   }) {
//   const { config } = useChart();

//   const tooltipLabel = React.useMemo(() => {
//     if (hideLabel || !payload?.length) {
//       return null;
//     }

//     const [item] = payload;
//     const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
//     const itemConfig = getPayloadConfigFromPayload(config, item, key);
//     const value =
//       !labelKey && typeof label === "string"
//         ? config[label as keyof typeof config]?.label || label
//         : itemConfig?.label;

//     if (labelFormatter) {
//       return (
//         <div className={cn("font-medium", labelClassName)}>
//           {labelFormatter(value, payload)}
//         </div>
//       );
//     }

//     if (!value) {
//       return null;
//     }

//     return <div className={cn("font-medium", labelClassName)}>{value}</div>;
//   }, [
//     label,
//     labelFormatter,
//     payload,
//     hideLabel,
//     labelClassName,
//     config,
//     labelKey,
//   ]);

//   if (!active || !payload?.length) {
//     return null;
//   }

//   const nestLabel = payload.length === 1 && indicator !== "dot";

//   return (
//     <div
//       className={cn(
//         "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
//         className,
//       )}
//     >
//       {!nestLabel ? tooltipLabel : null}
//       <div className="grid gap-1.5">
//         {payload.map((item, index) => {
//           const key = `${nameKey || item.name || item.dataKey || "value"}`;
//           const itemConfig = getPayloadConfigFromPayload(config, item, key);
//           const indicatorColor = color || item.payload.fill || item.color;

//           return (
//             <div
//               key={item.dataKey}
//               className={cn(
//                 "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
//                 indicator === "dot" && "items-center",
//               )}
//             >
//               {formatter && item?.value !== undefined && item.name ? (
//                 formatter(item.value, item.name, item, index, item.payload)
//               ) : (
//                 <>
//                   {itemConfig?.icon ? (
//                     <itemConfig.icon />
//                   ) : (
//                     !hideIndicator && (
//                       <div
//                         className={cn(
//                           "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
//                           {
//                             "h-2.5 w-2.5": indicator === "dot",
//                             "w-1": indicator === "line",
//                             "w-0 border-[1.5px] border-dashed bg-transparent":
//                               indicator === "dashed",
//                             "my-0.5": nestLabel && indicator === "dashed",
//                           },
//                         )}
//                         style={
//                           {
//                             "--color-bg": indicatorColor,
//                             "--color-border": indicatorColor,
//                           } as React.CSSProperties
//                         }
//                       />
//                     )
//                   )}
//                   <div
//                     className={cn(
//                       "flex flex-1 justify-between leading-none",
//                       nestLabel ? "items-end" : "items-center",
//                     )}
//                   >
//                     <div className="grid gap-1.5">
//                       {nestLabel ? tooltipLabel : null}
//                       <span className="text-muted-foreground">
//                         {itemConfig?.label || item.name}
//                       </span>
//                     </div>
//                     {item.value && (
//                       <span className="text-foreground font-mono font-medium tabular-nums">
//                         {item.value.toLocaleString()}
//                       </span>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// const ChartLegend = RechartsPrimitive.Legend;

// function ChartLegendContent({
//   className,
//   hideIcon = false,
//   payload,
//   verticalAlign = "bottom",
//   nameKey,
// }: React.ComponentProps<"div"> &
//   Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
//     hideIcon?: boolean;
//     nameKey?: string;
//   }) {
//   const { config } = useChart();

//   if (!payload?.length) {
//     return null;
//   }

//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center gap-4",
//         verticalAlign === "top" ? "pb-3" : "pt-3",
//         className,
//       )}
//     >
//       {payload.map((item) => {
//         const key = `${nameKey || item.dataKey || "value"}`;
//         const itemConfig = getPayloadConfigFromPayload(config, item, key);

//         return (
//           <div
//             key={item.value}
//             className={cn(
//               "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
//             )}
//           >
//             {itemConfig?.icon && !hideIcon ? (
//               <itemConfig.icon />
//             ) : (
//               <div
//                 className="h-2 w-2 shrink-0 rounded-[2px]"
//                 style={{
//                   backgroundColor: item.color,
//                 }}
//               />
//             )}
//             {itemConfig?.label}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // Helper to extract item config from a payload.
// function getPayloadConfigFromPayload(
//   config: ChartConfig,
//   payload: unknown,
//   key: string,
// ) {
//   if (typeof payload !== "object" || payload === null) {
//     return undefined;
//   }

//   const payloadPayload =
//     "payload" in payload &&
//     typeof payload.payload === "object" &&
//     payload.payload !== null
//       ? payload.payload
//       : undefined;

//   let configLabelKey: string = key;

//   if (
//     key in payload &&
//     typeof payload[key as keyof typeof payload] === "string"
//   ) {
//     configLabelKey = payload[key as keyof typeof payload] as string;
//   } else if (
//     payloadPayload &&
//     key in payloadPayload &&
//     typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
//   ) {
//     configLabelKey = payloadPayload[
//       key as keyof typeof payloadPayload
//     ] as string;
//   }

//   return configLabelKey in config
//     ? config[configLabelKey]
//     : config[key as keyof typeof config];
// }

// export {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
//   ChartStyle,
// };
