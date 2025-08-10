export type ParsedTime = { hour: number, minute: number };

// Parses time strings like:
// 12, 9, 12:30, 9:05, 12.30, 12-30, 12 30, 1200, 0930, 930, 1200am, 9pm, 9:30pm, 9.30 pm
// Supports optional am/pm (case-insensitive) with or without space. Returns null if invalid.
export function parseTimeInput(raw: string): ParsedTime | null {
    if (!raw) return null;
    const input = raw.trim();

    const pattern = /^(\d{1,2})(?:[:.\-\s]?(\d{2}))?\s*(am|pm)?$/i; // hour + optional minute + am/pm
    const compactPattern = /^(\d{3,4})(am|pm)?$/i; // 1200, 930, 0930, with optional am/pm

    let hour: number | undefined;
    let minute: number | undefined;
    let ampm: string | undefined;

    let match = input.match(pattern);
    if (match) {
        hour = parseInt(match[1], 10);
        minute = match[2] ? parseInt(match[2], 10) : 0;
        ampm = match[3]?.toLowerCase();
    } else {
        match = input.match(compactPattern);
        if (!match) return null;
        const num = match[1].padStart(4, '0');
        hour = parseInt(num.slice(0, 2), 10);
        minute = parseInt(num.slice(2, 4), 10);
        ampm = match[2]?.toLowerCase();
    }

    if (
        hour === undefined || minute === undefined ||
        isNaN(hour) || isNaN(minute) ||
        minute < 0 || minute > 59
    ) return null;

    if (ampm) {
        if (hour < 1 || hour > 12) return null;
        if (ampm === 'pm' && hour !== 12) hour += 12;
        if (ampm === 'am' && hour === 12) hour = 0;
    } else {
        if (hour > 23) return null;
    }

    return { hour, minute };
}
