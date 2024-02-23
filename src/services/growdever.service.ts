import {
  CreateGrowdever,
  Growdever,
  UpdateGrowdever,
} from "../models/growdever.model";
import { prisma } from "../prisma";

class GrowdeverService {
  public async list(): Promise<any> {
    const data = await prisma.growdever.findMany({});
    return data;
  }
  public async create(data: CreateGrowdever) {
    const newGrowdever = new Growdever(
      data.name,
      data.email,
      data.dateOfBirth,
      data.phone
    );

    await prisma.growdever.create({
      data: {
        name: newGrowdever.name,
        email: newGrowdever.email,
        dateOfBirth: newGrowdever.dateOfBirth,
        phone: newGrowdever.phone,
        id: newGrowdever.id,
        address: data.address,
      },
    });
    return newGrowdever;
  }
  public async getByUid(id: number) {
    const growdever = await prisma.growdever.findUnique({
      where: {
        id,
      },
    });
    if (!growdever) {
      return {
        code: 404,
        message: "Growdever not found",
      };
    }
    return {
      code: 200,
      message: "Growdever succesfully listed",
      data: growdever,
    };
  }
  public async update(data: UpdateGrowdever): Promise<any> {
    const growdever = await prisma.growdever.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!growdever) {
      return {
        code: 404,
        message: "Growdever not found",
      };
    }
    const updatedGrowdever = await prisma.growdever.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        phone: data.phone,
        address: data.address,
      },
    });

    return {
      code: 200,
      message: "Growdever updated succesfully",
      data: updatedGrowdever,
    };
  }
  public async delete(id: number): Promise<any> {
    const growdever = await prisma.growdever.findUnique({
      where: {
        id,
      },
    });
    if (!growdever) {
      return {
        code: 404,
        message: "Growdever not found",
      };
    }
    await prisma.growdever.delete({
      where: {
        id,
      },
    });
    return {
      code: 200,
      message: " Growdever successfully deleted",
    };
  }
}
export default new GrowdeverService();
