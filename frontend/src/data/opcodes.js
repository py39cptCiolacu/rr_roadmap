export const opcodes = [
  // ─────────────────────────────────────────
  // Stack & Execution Control
  // ─────────────────────────────────────────
  {
    opcode: "DISCARD_TOP",
    explanation: "Removes the value from the top of the stack.",
    stack: "[a] → []",
  },
  {
    opcode: "PRINT*",
    explanation:
      "Prints the value at the top of the stack without removing it.",
    stack: "[a] → [a]",
  },
  {
    opcode: "RETURN",
    explanation:
      "Pops the value from the top of the stack and returns it as the result of execution.",
    stack: "[a] → [] (return a)",
  },

  // ─────────────────────────────────────────
  // Load Instructions
  // ─────────────────────────────────────────
  {
    opcode: "LOAD_CONSTANT",
    explanation: "Pushes a constant from the constant pool onto the stack.",
    stack: "[] → [const]",
  },
  {
    opcode: "LOAD_STRING",
    explanation: "Pushes a string from the constant pool onto the stack.",
    stack: "[] → [string]",
  },
  {
    opcode: "LOAD_BOOLEAN",
    explanation: "Pushes a boolean value (True or False) onto the stack.",
    stack: "[] → [bool]",
  },
  {
    opcode: "LOAD_VAR",
    explanation: "Loads a local variable value onto the stack.",
    stack: "[] → [value]",
  },
  {
    opcode: "LOAD_VECTOR*",
    explanation:
      "Pops N values from the stack and packs them into a vector (list).",
    stack: "[a1, a2, ..., aN] → [[a1, a2, ..., aN]]",
  },

  // ─────────────────────────────────────────
  // Assignment
  // ─────────────────────────────────────────
  {
    opcode: "ASSIGN",
    explanation:
      "Pops a value from the stack, assigns it to a variable, then pushes it back.",
    stack: "[value] → [value]",
  },

  // ─────────────────────────────────────────
  // Control Flow
  // ─────────────────────────────────────────
  {
    opcode: "LABEL",
    explanation: "Marks a position in the bytecode. Used as a jump target.",
    stack: "[] → []",
  },
  {
    opcode: "JUMP",
    explanation: "Unconditionally jumps to a target address in the bytecode.",
    stack: "[] → []",
  },
  {
    opcode: "JUMP_IF_FALSE",
    explanation: "Pops a value from the stack and jumps if the value is false.",
    stack: "[condition] → []",
  },

  // ─────────────────────────────────────────
  // Arithmetic Operations
  // ─────────────────────────────────────────
  {
    opcode: "ADD",
    explanation: "Adds two values from the stack.",
    stack: "[a, b] → [a + b]",
  },
  {
    opcode: "SUB",
    explanation: "Subtracts two values from the stack.",
    stack: "[a, b] → [a - b]",
  },
  {
    opcode: "MUL",
    explanation: "Multiplies two values from the stack.",
    stack: "[a, b] → [a * b]",
  },
  {
    opcode: "DIV",
    explanation: "Divides two values from the stack.",
    stack: "[a, b] → [a / b]",
  },

  // ─────────────────────────────────────────
  // Comparison Operations
  // ─────────────────────────────────────────
  {
    opcode: "EQ",
    explanation: "Checks equality between two values.",
    stack: "[a, b] → [a == b]",
  },
  {
    opcode: "NEQ",
    explanation: "Checks inequality between two values.",
    stack: "[a, b] → [a != b]",
  },
  {
    opcode: "GT",
    explanation: "Checks whether the first value is greater than the second.",
    stack: "[a, b] → [a > b]",
  },
  {
    opcode: "GE",
    explanation:
      "Checks whether the first value is greater than or equal to the second.",
    stack: "[a, b] → [a >= b]",
  },
  {
    opcode: "LT",
    explanation: "Checks whether the first value is less than the second.",
    stack: "[a, b] → [a < b]",
  },
  {
    opcode: "LE",
    explanation:
      "Checks whether the first value is less than or equal to the second.",
    stack: "[a, b] → [a <= b]",
  },

  // ─────────────────────────────────────────
  // Logical Operations
  // ─────────────────────────────────────────
  {
    opcode: "AND",
    explanation: "Applies a logical AND operation to two values.",
    stack: "[a, b] → [a AND b]",
  },
  {
    opcode: "OR",
    explanation: "Applies a logical OR operation to two values.",
    stack: "[a, b] → [a OR b]",
  },

  // ─────────────────────────────────────────
  // Host / Foreign Calls
  // ─────────────────────────────────────────
  {
    opcode: "PYTHON_CALL*",
    explanation:
      "Executes Python code found at the top of the stack. May cause side effects.",
    stack: "[code] → [code]",
  },
];
