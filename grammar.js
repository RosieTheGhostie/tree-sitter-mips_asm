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
      seq(field("operator", $.identifier), repeat(choice($.operand, $.comma))),
    label_definition: ($) =>
      seq(field("name", $.identifier), token.immediate(":")),

    directive_value: ($) =>
      repeat1(
        choice(
          $.comma,
          $.left_parenthesis,
          $.right_parenthesis,
          $.integer,
          $.float,
          $.string,
          $.identifier,
          $.register,
        ),
      ),
    operand: ($) => choice($.integer, alias($.identifier, $.label), $.register),

    line_break: (_$) => /\r?\n/,
    comma: (_$) => ",",
    left_parenthesis: (_$) => "(",
    right_parenthesis: (_$) => ")",
    directive_token: (_$) => /\.[a-z]+/,
    integer: (_$) => choice(/0[Oo][0-7]+/, /[+-]?\d+/, /0[Xx][\dA-Fa-f]+/),
    float: (_$) => /[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)/,
    string: (_$) => /"([^"\\\x00-\x1f]|\\[^\x00-\x1f])*"/,
    identifier: (_$) => /[\p{L}_](?:\.?[\p{N}\p{L}_])*/u,
    register: (_$) => /\$[\dA-Za-z]+/,

    comment: (_$) => /#.*/,
  },
  extras: ($) => [
    /[\f\t\v\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,
    $.comment,
  ],
});
