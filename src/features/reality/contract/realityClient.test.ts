import { describe, test, expect, beforeAll } from "vitest";
import { createRealityClient } from "./realityClient";
import {
  AoContractClient,
  createAoContractClient,
} from "@/features/ao/lib/aoContractClient";
import { loadTestWallet } from "@/features/ao/test/lib/fsWallet";
import { AoWallet } from "@/features/ao/lib/aoWallet";
import { ArweaveId } from "@/features/arweave/lib/model";
import { createGeneratedWallet } from "@/features/ao/lib/wallets/generated";
import { dummyConnectConfig } from "@/features/login/lib/config";
import { connect } from "@/features/ao/lib/aoConnection";

describe("createRealityClient", () => {
  let testWallet: AoWallet;
  let testAoContractClient: AoContractClient;
  let universeAoContractClient: AoContractClient;
  let weaveWorldAoContractClient: AoContractClient;

  beforeAll(async () => {
    testWallet = await loadTestWallet();
    testAoContractClient = createAoContractClient(
      import.meta.env.VITE_READ_PROCESS_ID,
      connect(),
      testWallet,
    );
    universeAoContractClient = createAoContractClient(
      import.meta.env.VITE_UNIVERSE_PROCESS_ID,
      connect(),
      testWallet,
    );
    const randomWallet = await createGeneratedWallet(dummyConnectConfig);
    if (!randomWallet.success)
      throw new Error("Failed to create random wallet");
    weaveWorldAoContractClient = createAoContractClient(
      import.meta.env.VITE_WEAVE_WORLD_PROCESS_ID,
      connect(),
      randomWallet.result,
    );
  });

  test("creates client", async () => {
    const client = createRealityClient(testAoContractClient);
    expect(client).toMatchSnapshot();
  });

  test("Universe readInfo", async () => {
    const client = createRealityClient(universeAoContractClient);
    const info = await client.readInfo();
    expect(info).toMatchSnapshot();
  });

  test("Universe readParameters", async () => {
    const client = createRealityClient(universeAoContractClient);
    const info = await client.readParameters();
    expect(info).toMatchSnapshot();
  });

  test("Universe readAllEntities", async () => {
    const client = createRealityClient(universeAoContractClient);
    const info = await client.readEntitiesStatic();
    expect(info).toMatchSnapshot();
  });

  test(
    "WeaveWorld createEntity & update",
    async () => {
      const client = createRealityClient(weaveWorldAoContractClient);

      const initialPosition = [2, 2];
      const createMsgId = await client.createEntity({
        Type: "Avatar",
        Position: initialPosition,
      });
      expect(ArweaveId.safeParse(createMsgId).success).toBe(true);
      // Wait for the message to be processed
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // Check the info is correct
      const createdEntities = await client.readEntitiesDynamic(new Date(0));
      expect(
        createdEntities[weaveWorldAoContractClient.aoWallet.address].Position,
      ).toEqual(initialPosition);
      expect(
        createdEntities[weaveWorldAoContractClient.aoWallet.address].Type,
      ).toEqual("Avatar");

      const updatedPosition = [4, 4];
      const updateMsgId = await client.updateEntityPosition(updatedPosition);
      expect(ArweaveId.safeParse(updateMsgId).success).toBe(true);
      // Wait for the message to be processed
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // Check the info is correct
      const updatedEntities = await client.readEntitiesDynamic(new Date(0));
      expect(updatedEntities[testWallet.address].Position).toEqual(
        updatedPosition,
      );
    },
    {
      timeout: 20000,
    },
  );
});
