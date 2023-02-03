## Implementation checklist:

- [x] Build a basic data model that is possible to work with
- [x] Move references logic, complete folder restructuring
- [x] Remove leftover boilerplate
- [x] Polish package.json scripts & update README
- [x] Set up logger middleware
- [x] Implement data models ️
- [x] Add re-exports for entities and on module core level
- [x] Re-implement database configuration, seeding.
- [x] Implement migrations mechanism
- [x] Wire local development to Docker database instance
- [x] Finish basic seeding
- [x] Set up pseudo-functional boilerplate code for controllers
- [x] Finish authorization logic
- [x] Set up deployment (Render.com)
- [x] Restructure project yet again and reduce module complexity
- [x] Add logic for getting all account's jobs
- [x] Move [seeds](src/database/seeds/data) to JSON and finish seeding logic
- [x] Finish basic services logic and controllers
- [x] [Seed](src/services/seeding.service.ts) other parts
- [x] Bind main models logic to front-end (**jobs**, account, clients)
- [x] Implement error catching
- [x] Fix DTO validation
- [x] Bind cabinets to front-end
- [x] Implement basic search capabilities for cabinets
- [x] Connect all the entities to front-end, send paginated data
- [ ] ♻️ Design new material set logic (sets in general)
- [ ] ♻️ Rethink isDefault behaviour in db
- [ ] ♻️ Bind rooms to front-end
- [ ] ♻️ Bind preferences to their models and implement preferences inheritance
      logic

---

- [ ] Re-implement mailing module and bind authorization
- [ ] Add
      [custom serialization](https://blog.logrocket.com/serialization-in-nestjs-a-different-approach/),
      fixes [this](src/shared/account/account.service.ts#L54)
- [ ] Finish all basic logic and tie front-end
- [ ] Beta release

---

- [ ] Implement calculation module (metrics system could be different)
- [ ] Stable release
- [ ] Documentation

## Folder structure

```js
+-- dist // Source build
+-- src
|   +-- config // Environment Configuration
|   +-- auth // Authentication
|   +-- base // Base module
|   +-- common // Global Nest Module
|   |   +-- constants // Constant value and Enum
|   |   +-- decorators // Nest Decorators
|   |   +-- filters // Nest Filters
|   |   +-- guards // Nest Guards
|   |   +-- interceptors // Nest Interceptors
|   |   +-- serializers // Nest Serializers
|   |   +-- middlewares // Nest Middleware
|   |   +-- pipes // Nest Pipes
|   |   +-- types // TypeScript types & global
|   +-- config // Configuration
|   +-- database // Database folder
|   |   +-- entities // TypeORM entities
|   |   +-- migrations // Migrations
|   |   +-- seeds // Database seeds
|   |   +-- data-source.ts // Data source file
|   +-- shared // Shared Nest Modules (Modules that are often imported and share their functionality)
|   +-- services // Services that serve a particular purpose (usually can't live alone)
|   +-- models // Folder containing models related stuff, mostly non-functional CRUD modules
|   +-- * // Other application features
```

## Module structure

```js
+-- src/<module_name>
|   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   +-- *.controller.ts // Controller
|   +-- *.service.ts // Service
|   +-- *.module.ts // Module
|   +-- * // Other optional parts (like TypeORM custom repositories, constants files and other)
|   +-- index.ts // Barrel file (Re-exports)
```

### References

- https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401
- https://github.com/CatsMiaow/nestjs-project-structure
- https://orkhan.gitbook.io/typeorm/docs
