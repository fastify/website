interface ImportMetaEnv {
	/**
	 * Set to `"true"` only for the real production build of fastify.dev.
	 * Any other value makes Carbon Ads requests with `ignore=yes`, so
	 * impressions, views and clicks are not counted.
	 */
	readonly PUBLIC_CARBON_ADS_PRODUCTION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
