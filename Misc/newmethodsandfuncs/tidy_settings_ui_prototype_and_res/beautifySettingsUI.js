//tidy settings panel (in progress, temporarily disabled)
dlgTidySettings = sup.CreateDialog();
layTidy = app.CreateLayout("Linear", "VTop");
layTidy.SetBackColor("#2c2b2a");
layTidy.SetBackAlpha(0.90);
scrTidy = app.CreateScroller(1, 1);
scrTidy.AddChild(layTidy);
dlgTidySettings.AddChild(scrTidy);
var indentsize = app.CreateText("indent_size", 1, -1);
indentsize.SetTextSize(11.7);
layTidy.AddChild(indentsize);
var indent_size = app.CreateSpinner("0,1,2,3,4,5,6,7,8,9", 1, -1, "");
layTidy.AddChild(indent_size);
var indent_char = app.CreateTextEdit(" ", 1, -1, "nospell");
indent_char.SetHint("indent_char");
layTidy.AddChild(indent_char);
var indentlevel = app.CreateText("indent_level", 1, -1);
indentlevel.SetTextSize(11.7);
layTidy.AddChild(indentlevel);
var indent_level = app.CreateSpinner("0,1,2,3,4,5,6,7,8,9", 1, -1, "");
layTidy.AddChild(indent_level);
var indent_with_tabs = app.CreateCheckBox("indent_with_tabs", 1, -1, "");
layTidy.AddChild(indent_with_tabs);
var preserve_newlines = app.CreateCheckBox("preserve_newlines", 1, -1, "");
layTidy.AddChild(preserve_newlines);
var maxnewlines = app.CreateText("max_preserve_newlines", 1, -1);
maxnewlines.SetTextSize(11.7);
layTidy.AddChild(maxnewlines);
var max_preserve_newlines = app.CreateSpinner("0,1,2,3,4,5,6,7,8,9", 1, -1, "");
layTidy.AddChild(max_preserve_newlines);
var jslint_happy = app.CreateCheckBox("jslint_happy", 1, -1, "");
layTidy.AddChild(jslint_happy);
var space_after_named_function = app.CreateCheckBox("space_after_named_function", 1, -1, "");
layTidy.AddChild(space_after_named_function);
var space_after_anon_function = app.CreateCheckBox("space_after_anon_function", 1, -1, "");
layTidy.AddChild(space_after_anon_function);
var bracelabel = app.CreateText("brace_style", -1, -1);
bracelabel.SetTextSize(11.7);
layTidy.AddChild(bracelabel);
var brace_style = app.CreateSpinner("collapse,expand,end-expand,none,preserve-inline", 1, -1, "");
layTidy.AddChild(brace_style)
var keep_array_indentation = app.CreateCheckBox("keep_array_indentation", 1, -1, "");
layTidy.AddChild(keep_array_indentation);
var keep_function_indentation = app.CreateCheckBox("keep_function_indentation", 1, -1, "");
layTidy.AddChild(keep_function_indentation);
var space_before_conditional = app.CreateCheckBox("space_before_conditional", 1, -1, "");
layTidy.AddChild(space_before_conditional);
var break_chained_methods = app.CreateCheckBox("break_chained_methods", 1, -1, "");
layTidy.AddChild(break_chained_methods);
var eval_code = app.CreateCheckBox("eval_code", 1, -1, "");
layTidy.AddChild(eval_code);
var unescape_strings = app.CreateCheckBox("unescape_strings", 1, -1, "");
layTidy.AddChild(unescape_strings);
var wraplinelen = app.CreateText("wrap_line_length", 1, -1);
wraplinelen.SetTextSize(11.7);
layTidy.AddChild(wraplinelen);
var wrap_line_length = app.CreateSpinner("0,1,2,3,4,5,6,7,8,9", 1, -1, "");
layTidy.AddChild(wrap_line_length);
btnSetTidySettings = app.CreateButton("Save Settings", 1, -1)
btnSetTidySettings.SetOnTouch(function() {
//TODO
dlgTidySettings.Dismiss();
});
layTidy.AddChild(btnSetTidySettings)