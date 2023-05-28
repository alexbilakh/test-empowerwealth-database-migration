const db: any = {};

const getTableColumnNames = (fields: string[]): [string, string] => {
  let tableName: string;
  let columnName: string;

  if (fields[0] === "businessDetails") {
    tableName = "business_details";
    columnName = fields[1];
  } else if (fields[0] === "associates") {
    tableName = "client_associates";
    columnName = "associateId";
  } else {
    tableName = "clients";
    columnName = fields[0];
  }

  return [tableName, columnName];
};

const update = async (
  _id: string,
  path: string,
  newValue: any
): Promise<void> => {
  // SQL Implementation
  // Split the path into individual fields
  const fields = path.split(".");

  // Determine the table and column to update based on the first field
  const [tableName, columnName] = getTableColumnNames(fields);

  // Generate the SQL update query
  const query = `
    UPDATE ${tableName}
    SET ${columnName} = ?
    WHERE _id = ?
  `;
  const values = [newValue, _id];

  // Execute the SQL update query
  await db.query(query, values);
};

export default update;
