import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
	const docs = await getCollection("docs");
	return docs.map((doc) => {
		const slug = doc.id.replace(/\/(index|Index)$/, "");
		return { params: { slug }, props: { doc } };
	});
}

export const GET: APIRoute = ({ props }) => {
	const body = props.doc.body ?? "";
	return new Response(body, {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
};
