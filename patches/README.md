# Dependency patches

- `@orama/plugin-docusaurus-v3@3.1.16`: Convert the Docusaurus version object to a version name string before passing it to Orama search so `/docs` queries match. Upstream passes the object directly, which makes the `where.version` filter fail on Docusaurus v3.
