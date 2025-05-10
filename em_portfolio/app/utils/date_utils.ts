export function timeAgo(date: Date) : string {
    const now = new Date();
    const diffMs = now.valueOf() - date.valueOf(); // Difference in milliseconds
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Convert to days

    if (diffDays === 0) return "uploaded today"

    if (diffDays < 7) {
        return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) {
        return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
    }

    const diffMonths = Math.floor(diffDays / 30.44); // Approximate days in a month
    if (diffMonths < 12) {
        return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
    }

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
}

export function areDatesEqualIgnoringSeconds(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() && // Months are zero-based in JavaScript
        date1.getDate() === date2.getDate() &&
        date1.getHours() === date2.getHours() //&&
        // date1.getMinutes() === date2.getMinutes()
    );
}

export function formatDateTime(date: Date): string {
    // Format the date portion
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    // Format the time portion
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    // Combine both with custom text
    return `${formattedDate} - at ${formattedTime}`;
}