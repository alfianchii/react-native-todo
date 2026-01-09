export function formatDate(date: Date): string {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	
	const diffTime = targetDate.getTime() - today.getTime();
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Tomorrow";
	if (diffDays === -1) return "Yesterday";

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = months[date.getMonth()];
	const day = date.getDate();

	if (date.getFullYear() !== now.getFullYear()) {
		return `${month} ${day}, ${date.getFullYear()}`;
	}

	return `${month} ${day}`;
}

export function formatTime(date: Date): string {
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	
	hours = hours % 12;
	hours = hours ? hours : 12;
	
	const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
	
	return `${hours}:${minutesStr} ${ampm}`;
}

export function isToday(date: Date): boolean {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
}

export function isFuture(date: Date): boolean {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const targetDate = new Date(date);
	targetDate.setHours(0, 0, 0, 0);
	return targetDate > today;
}

export function getDateFromSelection(selection: string): Date {
	const now = new Date();
	
	switch (selection) {
		case "Today":
			return now;
		case "Tomorrow": {
			const tomorrow = new Date(now);
			tomorrow.setDate(tomorrow.getDate() + 1);
			return tomorrow;
		}
		case "This Week": {
			const endOfWeek = new Date(now);
			const daysUntilSunday = 7 - now.getDay();
			endOfWeek.setDate(now.getDate() + daysUntilSunday);
			return endOfWeek;
		}
		case "Next Week": {
			const nextWeek = new Date(now);
			nextWeek.setDate(now.getDate() + 7);
			return nextWeek;
		}
		default:
			return now;
	}
}
