yarn:
	yarn

serve: yarn
	hugo server \
		--buildDrafts \
		--buildFuture \
		--disableFastRender

production-build:
	hugo \
		--minify

preview-build:
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \
		--minify \
		--disableKinds="robotsTXT"

open:
	open https://o3de.netlify.com

clean:
	rm -rf resources
	rm -rf public
