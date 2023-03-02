## Implementation checklist:

- [ ] ♻️ Design new material set logic (sets in general)
- [ ] ♻️ Implement new room calc and cabinet logic
- [ ] ♻️ Bind preferences to their models and implement preferences inheritance
      logic

---

- [ ] Re-implement mailing module and bind authorization
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
