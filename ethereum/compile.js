const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Define the build path
const buildPath = path.resolve(__dirname, "build");

// Remove the existing build directory
fs.removeSync(buildPath);

// Define the path to the Campaign.sol file
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

// Read the source code from Campaign.sol
const source = fs.readFileSync(campaignPath, "utf8");

// Define the input for the Solidity compiler
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"]
      }
    }
  }
};

// Define a function to find imports
function findImports(importPath) {
  try {
    if (importPath.startsWith("@openzeppelin")) {
      const openzeppelinPath = path.resolve(__dirname, "../node_modules", importPath);
      return { contents: fs.readFileSync(openzeppelinPath, "utf8") };
    }
    const relativePath = path.resolve(path.dirname(campaignPath), importPath);
    return { contents: fs.readFileSync(relativePath, "utf8") };
  } catch (e) {
    return { error: "File not found" };
  }
}

try {
  // Compile the Solidity code with import callback
  const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

  // Check for compilation errors
  if (output.errors) {
    output.errors.forEach(err => {
      console.error(err.formattedMessage);
    });
    throw new Error("Compilation failed");
  }

  // Ensure the build directory exists
  fs.ensureDirSync(buildPath);

  // Save the compiled contracts' JSON to the build directory
  for (let contract in output.contracts["Campaign.sol"]) {
    fs.outputJsonSync(
      path.resolve(buildPath, contract + ".json"),
      output.contracts["Campaign.sol"][contract]
    );
  }

  console.log("Contracts compiled successfully!");
} catch (error) {
  console.error("Error compiling contracts:", error);
}
