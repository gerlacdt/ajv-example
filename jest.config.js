module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@main/(.*)": "<rootDir>/src/main/$1",
  },
};
