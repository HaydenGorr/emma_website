export function timeAgo(date) {
    console.log(date)
    const now = new Date();
    const diffMs = now - date; // Difference in milliseconds
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