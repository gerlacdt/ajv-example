import Ajv from "ajv";
import { readFileSync } from "fs";
import * as path from "path";

describe("#person.schema.json", () => {
  const ajv = new Ajv({ allErrors: true });
  const schema = JSON.parse(
    readFileSync(
      `${path.join(__dirname, "../../files")}/person.schema.json`,
    ).toString("utf8"),
  );
  ajv.addSchema(schema);

  test("validate_validObj_ok", () => {
    const obj = { firstName: "Foo", lastName: "bar" };
    const actual = ajv.validate(schema["$id"], obj);

    expect(actual).toBeTruthy();
    expect(ajv.errors).toBeNull();
  });

  test("validate_missingLastname_invalid", () => {
    const obj = { firstName: "Foo" };
    const actual = ajv.validate(schema["$id"], obj);

    expect(actual).toBeFalsy();
    expect(ajv.errors).toBeDefined();
  });

  test("validate_twoErrors_invalid", () => {
    const obj = { firstName: "Foo", address: { street: "street" } };
    const actual = ajv.validate(schema["$id"], obj);

    expect(actual).toBeFalsy();
    expect(ajv.errors?.length).toBe(2);
    console.log(ajv.errors);
  });
});
