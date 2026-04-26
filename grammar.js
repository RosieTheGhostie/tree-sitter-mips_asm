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
    source_file: ($) => repeat(seq($._item, repeat1($.line_break))),

    _item: ($) => choice($.directive, $.instruction, $.label_definition),

    directive: ($) =>
      seq(
        field("name", $.directive_token),
        optional(field("value", $.directive_value)),
      ),
    instruction: ($) =>
      seq(field("operator", $.identifier), repeat(choice($.operand, ","))),
    label_definition: ($) =>
      seq(alias($.identifier, $.label), token.immediate(":")),

    directive_value: ($) =>
      repeat1(
        choice(
          ",",
          "(",
          ")",
          $.integer,
          $.float,
          $.string,
          $.identifier,
          $.register,
        ),
      ),
    operand: ($) => choice($.integer, alias($.identifier, $.label), $.register),

    line_break: (_$) => /\r?\n/,
    directive_token: (_$) => /\.[a-z]+/,
    integer: ($) =>
      choice($._bin_integer, $._oct_integer, $._dec_integer, $._hex_integer),
    _bin_integer: (_$) => /0[Bb][01]+/,
    _oct_integer: (_$) => /0[Oo][0-7]+/,
    _dec_integer: (_$) => /[+-]?\d+/,
    _hex_integer: (_$) => /0[Xx][\dA-Fa-f]+/,
    float: (_$) => /[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)/,
    string: ($) =>
      seq('"', repeat(choice($.unescaped_characters, $.escape_sequence)), '"'),
    unescaped_characters: (_$) => token.immediate(/[^"\\\n\r]+/),
    escape_sequence: (_$) =>
      /\\(?:[^ux0-7]|[0-7]{1,3}|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4})/,
    identifier: (_$) => /[\p{L}_](?:\.?[\p{N}\p{L}_])*/u,
    register: (_$) => /\$[\dA-Za-z]+/,

    comment: (_$) => /#.*/,
  },
  extras: ($) => [/[ \t]+/, $.comment],
});
