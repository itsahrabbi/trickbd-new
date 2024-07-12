import getWPmedia from "./getWPmedia";

// Truncate a string with proper word boundaries and a maximum length
function truncateStr(str, maxLength) {
    if (
        typeof str !== "string" ||
        typeof maxLength !== "number" ||
        maxLength <= 0
    ) {
        throw new Error("Invalid input");
    }

    if (str.length <= maxLength) {
        return str;
    }

    const words = str.split(" ");
    let result = "";
    let length = 0;

    for (const word of words) {
        if (length + word.length + 1 > maxLength) {
            result += "\n";
            length = 0;
        }
        result += word + " ";
        length += word.length + 1;
    }

    return result.trim();
}

// Shorten a string to a specific length and append ellipsis if necessary
function shortenStr(inputString, maxLength) {
    if (
        typeof inputString !== "string" ||
        typeof maxLength !== "number" ||
        maxLength <= 0
    ) {
        throw new Error("Invalid input");
    }

    return inputString.length <= maxLength
        ? inputString
        : inputString.substring(0, maxLength) + "...";
}

// Format date string into a human-readable format
const formatDate = dateString => {
    try {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const diffTime = currentDate - postDate;
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) {
            if (diffDays < 1) {
                if (diffHours < 1) {
                    if (diffMinutes < 1) {
                        return "Just now";
                    }
                    return `${diffMinutes} minute${
                        diffMinutes !== 1 ? "s" : ""
                    } ago`;
                }
                return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
            }
            return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
        }

        return postDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    } catch (error) {
        console.error("Invalid date string:", error);
        return "Invalid date";
    }
};

// Remove HTML tags from a string
function stripHtmlTags(html) {
    if (typeof html !== "string") {
        throw new Error("Invalid input");
    }

    return html.replace(/<[^>]*>?/gm, "");
}

// Calculate reading time based on the text content
function calculateReadingTime(content) {
    try {
        const plainText = stripHtmlTags(content);
        const wordsPerMinute = 80; // Adjust as needed
        const words = plainText.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} read`;
    } catch (error) {
        console.error("Error calculating reading time:", error);
        return "Unknown reading time";
    }
}

function capitalizeWordFirstLetter(string) {
    return string
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
export {
    truncateStr,
    shortenStr,
    formatDate,
    getWPmedia,
    calculateReadingTime,
    stripHtmlTags,
    capitalizeWordFirstLetter
};
