/**
 * @file MipsAsm grammar for tree-sitter
 * @author RosieTheGhostie <rosetheghost.dev@gmail.com>
 * @license LGPL-3.0+
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "mips_asm",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
