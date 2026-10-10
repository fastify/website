declare module "virtual:fastify-api-reference/config" {
	const config: {
		base: string;
		dir: string;
		fastifySource: string | null;
		core: { tag: string; mode: "include" | "exclude" | "all" };
		plugins: { tag: string; mode: "include" | "exclude" | "all" };
		title: string;
		failOnMissing: boolean;
	};
	export default config;
}

declare module "virtual:fastify-api-reference/layout" {
	const Layout: (props: { title: string; description?: string }) => unknown;
	export default Layout;
}
