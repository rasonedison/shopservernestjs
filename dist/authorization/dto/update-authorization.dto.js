"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthorizationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_authorization_dto_1 = require("./create-authorization.dto");
class UpdateAuthorizationDto extends (0, mapped_types_1.PartialType)(create_authorization_dto_1.CreateAuthorizationDto) {
}
exports.UpdateAuthorizationDto = UpdateAuthorizationDto;
//# sourceMappingURL=update-authorization.dto.js.map