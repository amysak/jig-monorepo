## Implementation checklist:

- [x] Finalize typegen
- [x] Setup CI using Railway
- [ ] Share eslint config and remove dep from root

### Project setup

```bash
pnpm i && pnpm docker:start && pnpm dev
```

🎉Project is live on Railway.app!🚀

Health-check route available
[here](https://server-production-e10c.up.railway.app/health)

### Current development strategy

- Make changes to the code
- `pnpm start:prod`
- `git checkout -b feature/<feature_name>`
- `git push origin feature/<feature_name>` (if everything is fine)
- Create and merge pull request
- Railway & Netlify automatically trigger deploy from main

### Code conventions

- camelCase only. snake_case and UPPER_CASE are only allowed in enums and
  constants
- ESLint, Prettier
- Strict TypeScript
- Decompose logic as much as possible and make it generic
- index.ts files export only one level up (except client/features)
