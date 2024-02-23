import { Request, Response } from "express";
import growdeverService from "../services/growdever.service";

export class GrowdeverController {
  public async create(request: Request, response: Response) {
    const growdeverData = request.body;
    const newGrowdever = await growdeverService.create(growdeverData);
    if (newGrowdever) {
      return response.status(201).json({
        ok: true,
        message: "Growdever succesfully created",
        data: newGrowdever,
      });
    }
    return response.status(500).json({
      ok: false,
      message: "Error when create Growdever",
    });
  }

  public async list(request: Request, response: Response) {
    const growdevers = await growdeverService.list();
    if (!growdevers) {
      return response.status(404).json({
        success: false,
        message: "",
      });
    }
    return response.status(200).json({
      success: true,
      message: "list of Growdevers",
      data: { growdevers },
    });
  }

  public async getByUid(request: Request, response: Response) {
    const { id } = request.params;
    const growdever = await growdeverService.getByUid(Number(id));
    if (!growdever) {
      return response.status(404).json({
        ok: false,
        message: "Growdever not found",
      });
    }

    return response.status(200).json({
      success: true,
      message: "List of Growdever",
      data: {
        growdever: growdever.data,
      },
    });
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await growdeverService.delete(Number(id));
      return response.status(204).json({
        ok: true,
        message: "Growdever successfully deleted",
      });
    } catch (error: any) {
      return response.status(500).json({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { growdeverData } = request.body;

      const result = await growdeverService.update({
        id: Number(id),
        name: growdeverData.name,
        email: growdeverData.email,
        dateOfBirth: growdeverData.dateOfBirth,
        phone: growdeverData.phone,
        address: growdeverData.address,
      });
      return response.status(200).json({
        success: true,
        message: "Growdever updated",
        data: {
          growdever: result,
        },
      });
    } catch (error: any) {
      return response.status(500).json({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
