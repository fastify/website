import type { ProfileCardPerson } from "~/components/ProfileCard.astro";

export const githubAvatarUrl = (
	person: ProfileCardPerson,
	size: number = 120,
): string => {
	const url = new URL(`https://avatars.githubusercontent.com/${person.login}`);
	url.searchParams.set("s", String(size));
	return url.href;
};
