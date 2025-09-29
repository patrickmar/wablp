declare module "react-player" {
  import * as React from "react";

  export interface ReactPlayerProps {
    url?: string | string[];
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    playsinline?: boolean;
    config?: Record<string, any>;
    [key: string]: any;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
