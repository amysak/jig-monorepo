## Implementation checklist:

- [x] Finalize typegen
- [x] Setup CI using Railway
- [ ] Share eslint config and remove dep from root

### Project setup

`pnpm i && pnpm docker:start && pnpm dev`

🎉Project is live on Railway.app!🚀

Health-check route available at `/health`

### Current development strategy

- Make changes to the code
- `pnpm start:prod`
- `git checkout -b feature/<feature_name>`
- `git push origin feature/<feature_name>` (if everything is fine)
- Create and merge pull request
- Railway automatically triggers deploy from main

### Code conventions

- camelCase, enums and constants could be in UPPER_CASE
- ESLint, Prettier
- Strict TypeScript (later)
- Semantical commits (later)
