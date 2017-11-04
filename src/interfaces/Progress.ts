export interface Progress {
    event: ProgressEvent,
    lengthComputable: boolean,
    percentage?: number,
    loaded: number,
    total?: number
}