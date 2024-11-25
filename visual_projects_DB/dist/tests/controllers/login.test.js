"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const initModelsModule = __importStar(require("../../src/models/init-models"));
const utilsModule = __importStar(require("../../src/helpers/utils"));
const LiderController_1 = require("../../src/controllers/LiderController");
const dbConnectionModule = __importStar(require("../../src/db/conection"));
// Mock de las dependencias
jest.mock('../../src/models/init-models');
jest.mock('../../src/db/conection');
jest.mock('../../src/helpers/utils');
describe("consultarLideres function", () => {
    let req;
    let res;
    let mockFindAll;
    let mockResponseMessage;
    let mockInitModels;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockFindAll = jest.fn();
        mockResponseMessage = jest.fn();
        // Mock de sequelize
        const mockSequelize = {};
        dbConnectionModule.sequelize = mockSequelize;
        // Mock de initModels
        mockInitModels = jest.fn().mockReturnValue({
            lider: {
                findAll: mockFindAll,
            },
            usuario: {},
        });
        initModelsModule.initModels = mockInitModels;
        // Mock de responseMessage
        utilsModule.responseMessage = mockResponseMessage;
        // Asegurarse de que initModel esté definido correctamente
        global.initModel = mockInitModels(mockSequelize);
    });
    it("should return a list of leaders when they exist", async () => {
        const mockLideres = [{ id: 1, nombre: "Líder 1" }, { id: 2, nombre: "Líder 2" }];
        mockFindAll.mockResolvedValue(mockLideres);
        await (0, LiderController_1.consultarLideres)(req, res);
        expect(mockFindAll).toHaveBeenCalledWith({ id: 1, nombre: "Líder 1" }, { id: 2, nombre: "Líder 2" });
        expect(mockResponseMessage).toHaveBeenCalledWith(res, 200, mockLideres, "Líderes creados actualmente");
    });
    it("should handle case when no leaders exist", async () => {
        mockFindAll.mockResolvedValue(null);
        await (0, LiderController_1.consultarLideres)(req, res);
        expect(mockFindAll).toHaveBeenCalled();
        expect(mockResponseMessage).toHaveBeenCalledWith(res, 404, false, "No existen líderes registrados");
    });
    it("should handle server errors", async () => {
        const mockError = new Error("Server error");
        mockFindAll.mockRejectedValue(mockError);
        await (0, LiderController_1.consultarLideres)(req, res);
        expect(mockFindAll).toHaveBeenCalled();
        expect(mockResponseMessage).toHaveBeenCalledWith(res, 503, mockError, "error server ...");
    });
});
//# sourceMappingURL=login.test.js.map