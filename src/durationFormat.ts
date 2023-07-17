export function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60.0);
    const remSeconds = seconds - (minutes * 60.0);

    const paddedMinutes = minutes.toFixed(0).padStart(2, '0');
    const paddedSeconds = remSeconds.toFixed(0).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`
}