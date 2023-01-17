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
- [x] Bind main models logic to front-end (**jobs**, account, clients)
- [x] Implement error catching
- [x] Fix DTO validation
- [x] Bind preferences to their models and implement preferences inheritance
      logic
- [x] Add isDefault fields to db (version=0)
- [ ] Implement creating new record if version=0 and custom logic for creating a
      dedicated client for a job etc.
- [ ] Use .env file on render instead of doing manual setup
- [ ] Re-implement mailing module and bind authorization
- [ ] Design new material set logic (sets in general)
- [ ] Bind rooms to front-end
- [ ] Implement [event listener flow](https://docs.nestjs.com/techniques/events)
      for re-applying different sets of data on other entitites
      ([possibly could be omitted](https://orkhan.gitbook.io/typeorm/docs/listeners-and-subscribers))
- [ ] Add
      [custom serialization](https://blog.logrocket.com/serialization-in-nestjs-a-different-approach/),
      fixes [this](src/shared/account/account.service.ts#L54)
- [ ] [Seed](src/services/seeding.service.ts) other parts
- [ ] Beta release
- [ ] Finish all basic logic and tie front-end
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
