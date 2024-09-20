import { Request, Response } from "express";
import prisma from "../utils/prismaClient";
import { Referral } from "@prisma/client";

export const addReferral = async (req: Request, res: Response) => {
  const { selfAddress, uplink } = req.body;

  if (!selfAddress) {
    return res.status(400).json({ error: "No Wallet Address passed." });
  }

  if (uplink) {
    const checkAddressAndId = await prisma.referral.findUnique({
      where: { address: selfAddress, id: uplink },
    });
    if (checkAddressAndId) {
      return res.status(400).json({ error: "You can't referral yourself." });
    }
  }

  const checkAddress = await prisma.referral.findUnique({
    where: { address: selfAddress, uplinkId: uplink },
  });
  if (checkAddress) {
    const id = checkAddress.id;

    if (!id) {
      return res.status(400).json({ error: `No uplink ID provided.` });
    }

    const checkID = await prisma.referral.findUnique({
      where: { id },
    });
    if (!checkID) {
      return res
        .status(400)
        .json({ error: `No registered user with the uplink ID ${id}.` });
    }
    try {
      async function getAllParents(nodeId: number) {
        const uplinks: Referral[] = [];
        async function fetchUplink(currentId: number | null) {
          if (currentId === null) {
            return;
          }
          const hierarchy = await prisma.referral.findUnique({
            where: { id: currentId },
            include: { uplink: true },
          });

          if (hierarchy && hierarchy.uplink) {
            uplinks.push(hierarchy.uplink);
            await fetchUplink(hierarchy.uplink.id);
          }
        }
        await fetchUplink(nodeId);
        return uplinks;
      }
      (async () => {
        const self = await prisma.referral.findUnique({
          where: { id },
        });
        const parents = await getAllParents(id);
        const result = {
          ...self,
          upline: parents.length,
          uplines: parents.slice(0, 3),
        };
        return res.status(200).json(result);
      })();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
    return 0
  }

  // if (uplink) {
  //   const checkID = await prisma.referral.findUnique({
  //     where: { id: uplink },
  //   });
  //   if (!checkID) {
  //     return res
  //       .status(400)
  //       .json({ error: `No registered user with the uplink ID ${uplink}.` });
  //   }
  // }

  try {
    if (!uplink) {
      const init = await prisma.referral.create({
        data: {
          address: selfAddress,
        },
      });
      const result = { ...init, upline: 0 };
      return res.status(201).json(result);
    } else {
      const init = await prisma.referral.create({
        data: {
          address: selfAddress,
          // uplinkId: uplink,
          uplink: {
            connect: { id: uplink },
          },
        },
      });
      async function getAllParents(nodeId: number) {
        const uplinks: Referral[] = [];
        async function fetchUplink(currentId: number | null) {
          if (currentId === null) {
            return;
          }
          const hierarchy = await prisma.referral.findUnique({
            where: { id: currentId },
            include: { uplink: true },
          });

          if (hierarchy && hierarchy.uplink) {
            uplinks.push(hierarchy.uplink);
            await fetchUplink(hierarchy.uplink.id);
          }
        }
        await fetchUplink(nodeId);
        return uplinks;
      }
      (async () => {
        const parents = await getAllParents(init.id);
        const result = {
          ...init,
          upline: parents.length,
          uplines: parents.slice(0, 3),
        };
        return res.status(201).json(result);
      })();
      // const hierarchy = await prisma.referral.findMany({
      //   where: { id: uplink },
      //   // where: { uplinkId: 1 },
      //   include: {
      //     children: {
      //       include: {
      //         children: true,
      //       },
      //     },
      //   },
      // });
    }
    // Initialize admin wallet
    // const result = await prisma.adminAddress.create({
    //   data: {
    //     adminId,
    //     type,
    //     address,
    //   },
    // });

    // res.status(201).json({});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getReferral = async (req: Request, res: Response) => {
  const { id: idz } = req.query;
  const id = Number(idz);

  if (!id) {
    return res.status(400).json({ error: `No uplink ID provided.` });
  }

  const checkID = await prisma.referral.findUnique({
    where: { id },
  });
  if (!checkID) {
    return res
      .status(400)
      .json({ error: `No registered user with the uplink ID ${id}.` });
  }
  try {
    async function getAllParents(nodeId: number) {
      const uplinks: Referral[] = [];
      async function fetchUplink(currentId: number | null) {
        if (currentId === null) {
          return;
        }
        const hierarchy = await prisma.referral.findUnique({
          where: { id: currentId },
          include: { uplink: true },
        });

        if (hierarchy && hierarchy.uplink) {
          uplinks.push(hierarchy.uplink);
          await fetchUplink(hierarchy.uplink.id);
        }
      }
      await fetchUplink(nodeId);
      return uplinks;
    }
    (async () => {
      const self = await prisma.referral.findUnique({
        where: { id },
      });
      const parents = await getAllParents(id);
      const result = {
        ...self,
        upline: parents.length,
        uplines: parents.slice(0, 3),
      };
      return res.status(200).json(result);
    })();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteReferral = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: `No uplink ID provided.` });
  }

  const checkID = await prisma.referral.findUnique({
    where: { id },
  });
  if (!checkID) {
    return res
      .status(400)
      .json({ error: `No registered user with the uplink ID ${id}.` });
  }

  try {
    async function deleteNodeAndHandleChildren(nodeId: number) {
      await prisma.$transaction(async (prisma) => {
        await prisma.referral.updateMany({
          where: { uplinkId: nodeId },
          data: { uplinkId: null },
        });

        await prisma.referral.delete({
          where: { id: nodeId },
        });
      });
    }

    (async () => {
      const nodeId = id;
      await deleteNodeAndHandleChildren(nodeId);
      return res.sendStatus(200);
    })();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAdminAddress = async (req: Request, res: Response) => {
  const { address, currentAddress, type, adminId } = req.body;

  if (!address) {
    return res.status(400).json({ error: "No Wallet Address passed." });
  }
  if (!type) {
    return res.status(400).json({ error: "No Wallet Address type passed." });
  }

  if (!currentAddress) {
    return res.status(400).json({ error: "No Current Address passed." });
  }

  const getCurrentAddress = await prisma.adminAddress.findUnique({
    where: { address: currentAddress, active: !!1 },
  });

  if (!getCurrentAddress) {
    return res
      .status(400)
      .json({ error: "Invalid Current Address Address passed." });
  }

  try {
    const updateAdmin = await prisma.adminAddress.update({
      where: { id: adminId, address: currentAddress },
      data: { address },
    });

    res.status(200).json(updateAdmin);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
