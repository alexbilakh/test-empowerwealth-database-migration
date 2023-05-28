import { ClientSchema } from "./Schema";

const db: any = {};

const insert = async (client: ClientSchema): Promise<void> => {
  // SQL Implementation
  // Insert the main client object
  const clientQuery = `
    INSERT INTO clients (_id, name, dateOfBirth, businessDetailsId)
    VALUES (?, ?, ?, ?)
  `;
  const clientValues = [
    client._id,
    client.name,
    client.dateOfBirth?.toISOString(),
    client.businessDetails?._id,
  ];
  await db.query(clientQuery, clientValues);

  // Insert addresses
  if (client.address) {
    const addressQuery = `
      INSERT INTO addresses (id, formattedAddress, streetNumber, street, suburb, state, postCode, isCurrent, clientId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    for (const address of client.address) {
      const addressValues = [
        address._id,
        address.formattedAddress,
        address.streetNumber,
        address.street,
        address.suburb,
        address.state,
        address.postCode,
        address.isCurrent,
        client._id,
      ];
      await db.query(addressQuery, addressValues);
    }
  }

  // Insert business details
  if (client.businessDetails) {
    const businessQuery = `
      INSERT INTO business_details (_id, name, abn)
      VALUES (?, ?, ?)
    `;
    const businessValues = [
      client.businessDetails._id,
      client.businessDetails.name,
      client.businessDetails.abn,
    ];
    await db.query(businessQuery, businessValues);
  }

  // Insert associates
  if (client.associates) {
    const associateQuery = `
      INSERT INTO client_associates (clientId, associateId)
      VALUES (?, ?)
    `;
    for (const associate of client.associates) {
      const associateValues = [client._id, associate._id];
      await db.query(associateQuery, associateValues);
    }
  }
};

export default insert;
