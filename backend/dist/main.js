"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const frontendPath = (0, path_1.join)(__dirname, '..', '..', 'frontend', 'dist');
    app.useStaticAssets(frontendPath);
    await app.listen(process.env.PORT ?? 3005);
    console.log(`🚀 EventPanel Demo running at http://localhost:${process.env.PORT ?? 3005}`);
}
bootstrap();
//# sourceMappingURL=main.js.map