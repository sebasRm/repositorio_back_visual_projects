import { Request, Response } from 'express';
const bcrypt = require("bcrypt");
import { login } from '../../src/controllers/usuarioControllers';
import * as initModelsModule from "../../src/models/init-models"
import { sequelize } from "../../src/db/conection";// Ajusta la ruta según tu estructura de proyecto
import { responseMessage } from '../../src/helpers/utils'; // Ajusta la ruta según tu estructura de proyecto
import * as utilsModule from "../../src/helpers/utils";
import { consultarLideres } from '../../src/controllers/LiderController';
import * as dbConnectionModule from "../../src/db/conection";

// Mock de las dependencias
jest.mock('../../src/models/init-models');
jest.mock('../../src/db/conection');
jest.mock('../../src/helpers/utils');

describe("consultarLideres function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockFindAll: jest.Mock;
  let mockResponseMessage: jest.Mock;
  let mockInitModels: jest.Mock;

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
    (dbConnectionModule as any).sequelize = mockSequelize;

    // Mock de initModels
    mockInitModels = jest.fn().mockReturnValue({
      lider: {
        findAll: mockFindAll,
      },
      usuario: {},
    });
    (initModelsModule.initModels as jest.Mock) = mockInitModels;

    // Mock de responseMessage
    (utilsModule.responseMessage as jest.Mock) = mockResponseMessage;

    // Asegurarse de que initModel esté definido correctamente
    (global as any).initModel = mockInitModels(mockSequelize);
  });

  it("should return a list of leaders when they exist", async () => {
    const mockLideres = [{ id: 1, nombre: "Líder 1" }, { id: 2, nombre: "Líder 2" }];
    mockFindAll.mockResolvedValue(mockLideres);

    await consultarLideres(req as Request, res as Response);

    expect(mockFindAll).toHaveBeenCalledWith({ id: 1, nombre: "Líder 1" }, { id: 2, nombre: "Líder 2" });
    expect(mockResponseMessage).toHaveBeenCalledWith(res, 200, mockLideres, "Líderes creados actualmente");
  });

  it("should handle case when no leaders exist", async () => {
    mockFindAll.mockResolvedValue(null);

    await consultarLideres(req as Request, res as Response);

    expect(mockFindAll).toHaveBeenCalled();
    expect(mockResponseMessage).toHaveBeenCalledWith(res, 404, false, "No existen líderes registrados");
  });

  it("should handle server errors", async () => {
    const mockError = new Error("Server error");
    mockFindAll.mockRejectedValue(mockError);

    await consultarLideres(req as Request, res as Response);

    expect(mockFindAll).toHaveBeenCalled();
    expect(mockResponseMessage).toHaveBeenCalledWith(res, 503, mockError, "error server ...");
  });
});