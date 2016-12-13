release: release_major

publish: release_major

release_minor:
	./node_modules/.bin/npm-bump minor

release_major:
	./node_modules/.bin/npm-bump major

patch:
	./node_modules/.bin/npm-bump patch
