
------------------------------------------------------------
# USER MANUAL
#### for insert-sub-and-category plugin

------------------------------------------------------------
Table of contents:

*   [Introduction: what is it for?](#introduction)
*   [In brief: how it works?](#inbrief)
*   [Basic user: where to start?](#basicuser)
    *   [Default plugin options](#defaultoptions)
    *   [Changing options](#changingoptions)
*   [Advanced user: &iquest;technical babble?](#advanceduser)
    *   [Basic options](#basicoptions)
    *   [Advanced options](#advancedoptions)
    *   [More advanced options](#moreadvancedoptions)
    *   [PRO - programmers options](#prooptions)
*   [Example of usage: how to do it?](#exampleofusage)
    *   [Shortcode usage](#shortcodeusage)
    *   [Hidden arguments](#hiddenarguments)
*   [Summary: someone actually reading this?](#summary)

## Introduction: what is it for?<a name="introduction"></a>
This document is a manual for users of insert-sub-and-category WordPress plugin.
It should give some assistance to people using this plugin, technical answers to their questions, especially basic one: how to use it.

I will try to avoid too detailed and technical babble, but it is sometimes necessary. Thus it is addressed for both: basic and advanced users.

## In brief: how it works?<a name="inbrief"></a>
This plugin adds new button *(and shortcode)* in TinyMCE that will insert categories to post or page. It uses native WordPress function - [get_categories()](https://developer.wordpress.org/reference/functions/get_categories/) to find and sort categories *(or subcategories)*. It means that it works as if you would write a *(WordPress)* php code without even knowing it. Cool, isn't it?

After instalation, new button is added to your editor and gives you opportunity to insert category code nearly anywhere you can open TinyMCE. In standard WordPress instalation, it would be available in posts and pages, but if you installed other plugins that allow openning TinyMCE editor in other places (for example edit category description), it could behave differently. You can always write me e-mail about it!
I'm sure it would be a fun story though.

## Basic user: where to start?<a name="basicuser"></a> 
Firstly, install and enable this plugin or politely ask your administrator to do it.
After that, you should open writing editor in place, where you want to use this plugin (for example *your Favourite post*). Find one of the last buttons that looks like one square gray label with two gray sublabels with a green dots - it has "Insert categories" title. It should look like this:

![plugin button](./assets/button.png "plugin button")

After you click it, a window with plugin options will pop up. If you are in rush (or don't really keen on customizing the output) you can end up here - just click OK on the bottom of this window and the shortcode will be inserted to *your Favourite post* by plugin. After you will save *your Favourite post* it should work immediately with default plugin options.

### Default plugin options<a name="defaultoptions"></a>
can be checked both on plugin code or after checking **Return all options with arguments** option in PRO - programmers options before clicking OK.

Briefly, it adds:

  - all categories,
  - all subcategories,
  - all posts based on current category.

All categories and posts will be displayed as links ordered by name in ascending order.

*Every time you open plugin options window it will have default options preset.* 

### Changing options<a name="changingoptions"></a>
Options are sorted for basic, advanced, more advanced and for programmers. They are grouped by my subjective feeling which options are most useful and least complex, but it may happen that more suitable options can be found on the second or even third tab.

Feel free to test different options, as you can't break anything (as long as it's only checkboxes in editor pop-up window :-). You can always undo your actions by clicking **Cancel** button or you can simply remove the whole shortcode from editor contents too.

Of course, you can insert shortcode to *your Favourite post* content as many times as you see fit, so you can compare how different options will look like.
*My advice is to separate - e. g. with some easily visually recognizable delimiter caption - different instances of the shortcode for the maximum comparison experience.*

## Advanced user: &iquest;technical babble?<a name="advanceduser"></a>

*If you are reading this, it means that you think you can do more, because you know some things. Good!*

As I wrote earlier, options are grouped for basic, advanced, more advanced and for programmers to different tabs by my subjective feeling which options are most useful and least complex. Some of options are based on arguments from native WordPress function [get\_categories()](https://developer.wordpress.org/reference/functions/get_categories/), this arguments are described in [WP\_Term_Query::\_\_construct](https://developer.wordpress.org/reference/classes/wp_term_query/__construct/). Other options are for testing, styling or simplyfing.

### Basic options<a name="basicoptions"></a>
contains set of options controlling how the list of categories is displayed: on what should it be based, which categories or post should collect in general and if they should be links or provided with short description.

### Advanced options<a name="advancedoptions"></a>
contains set of options that allow customizing categories and posts renderer in a more specific manner (how to start every category, how long should the post digest be), change sorting order or filter the list (include, exclude options).

### More advanced options<a name="moreadvancedoptions"></a>
contains set of options for styling list of categories and subcategories (especially for adding custom captions or classes).

### PRO - programmers options<a name="prooptions"></a>
for the ultimate power and summoning dragons.
This tab contains very interesting and useful options for testing and debugging the shortcode.
Option **Ignore all** allows plugin to ignore all previous options and write clean shortcode, like you've never changed them before - so with default plugin options (and extra - ignore_all - one, which cuts custom options off, but it can be removed from shortcode manualy after all). In pop up window with options, before you click **OK** button, you can view changed options, but you can't change them until... you uncheck **Ignore all** option, of course.

On this tab there is another option that allows you to **Return all options with arguments**. When this option isn't checked, plugin will print only the shortcode options with non-default values entered, which means that it can (and will) cut off default options and you will not see them in text editor. It's better for post readability because the shorcode will be very concise, but if you prefer to see all the options explicitly, along with their respective default values and maybe change them manually later in text editor (for example *your Favourite post*) you can check this option.

It will give you an answer to question *WHAT ARE DEFAULT OPTIONS OF THIS BEAUTIFUL PLUGIN?* and will satisfy your desire to know *&#! WHAT OPTIONS DO I REALLY USE?* Plus it prints extra option **return_all**, of course. Yes, that's a thing.

**NOTICE:** When **Return all options with arguments** is checked, plugin will insert all options that are in plugin pop up mode (custom and default). If you compare it with documentation of [get_categories()](https://developer.wordpress.org/reference/functions/get_categories/) native WordPress function, you will see that some of arguments are missing. You are correct. They are hidden, because they are expected to be used very rarely, *but* you can use them by adding inside shortcode manually (for more, see Example of usage: how to do it => [Hidden arguments](#hiddenarguments)).

## Example of usage: how to do it?<a name="exampleofusage"></a>

There are two ways to use plugin: using button (and popup window) or writing shortcode in editor mode.

First way, filling options in popup mode, can be achieved by using the mouse and keyboard *(or only keyboard)*. You can use **ESC** or **Cancel** (second button on the bottom of the popup window) to close this window and don't insert plugin shortcode.

Second method can be used after using button (by editing inserted shortcode) or instead of it.

### Shortcode usage<a name="shortcodeusage"></a>
This section is about using the shortcode. It's a way to edit plugin popup window options or write them manually.

*For simplify, you can treat plugin options as shortcode arguments.*

For running plugin with default options you can add shortcode:

**Example:**
```
[insert_sub_and_category]
```

in place, where you want the plugin to display the additional content (for example in *your Favourite post*).

What it will do? See in Basic user: where to start => [Default plugin options](#defaultoptions). 

If you want to use other than default options, you should use the notation with arguments:

**Example:**
```
[insert_sub_and_category name_of_argument=value other_name_of_argument="value1, value2"]
```
where:

* parts of argument's name should be separated with underscore ("_");
* arguments should be delimited with spaces (" ");
* values within the argument for the same option can be separated with comma (",") or space (" ") if needed, with the exeption of css classes, where only space is recommended;
* values that are considered as bool values (a single choice answers - yes/no) can be called in two ways:
	* using php-like bool values, so basically `0` (int), `0.0` (float), `"0"` and `" "` (strings with zero and empty space) or `Array()` will all be regarded as logical `false`;
	* using this plugin's radio-values, which are basically defined in plugin's code as an array; full list is (should be) stored in `$radio_answer_yes` and `$radio_answer_no` variables (see the code excerpt below).
    
		**For English defined radio-values there are:**
		```
		$radio_answer_yes = array('yes', 'YES', 'Y', 'true');
		$radio_answer_no = array('no', 'NO', 'N', 'false');
		```
*Second method won't work with hidden values*

Shortcode with option that disables links in category can be written like this:

**Example:**
```
[insert_sub_and_category category_as_link_radio="no"]
```
or  
```
[insert_sub_and_category category_as_link_radio="false"]
```
or
```
[insert_sub_and_category category_as_link_radio=0]
```
etc.

*If the unlikely event of this plugin being translated to other languages, the variables `$radio_answer_yes` and `$radio_answer_no` should be extended (and ***not replaced***) accordingly. Also radio-buttons should be translated alike.*

Because shortcode with no arguments will use it's default options, there is no need to write them down, if you're doing it manually, unless you don't know it's default or you want to leave them explicit for future reference. It doesn't matter, because custom settings will always override the default ones. Unless you break something, but then it's your fault.

*Spanish Inquisition!*

If you change value to something that isn't present on the list of accepted argument values (especially for options that have drop down menu), plugin will work, but probably not the way you expected. If you use an argument that isn't present on the list of this plugin's accepted arguments *($all_accepted_attributes_names)*, it will be ignored. But that's also your fault.

**Examples:**
```  
[insert_sub_and_category category_nested_listbox="nested2" all_or_current_listbox="all" category_as_link_radio="false" posts_class=""]
```

In this case there are 4 arguments, first and last are same as default, so they can be removed. It works the same as:
```
[insert_sub_and_category all_or_current_listbox="all" category_as_link_radio="false"]
```
But if you want to, you can edit last ones, when you don't know what defaults are, to:
```
[insert_sub_and_category category_nested_listbox="nested2" all_or_current_listbox="all" category_as_link_radio=true posts_class="xx"]
```
and see what changed. Be carefull! If you have defined style for xx class (`.xx{background-color:blue;}` in css), your posts would be blue ;-(.
 
### Hidden arguments<a name="hiddenarguments"></a>
There are few arguments that are hidden, which means that they will be not inserted, when **Return all options with arguments** is enabled.

*I think they are rarely used (e. g. I never really needed to use them) and only for very specific cases than only the most advanced users could handle, so I don't place them in plugins options popup window. I won't hate you if you use them though. On the other hand, plugin accepts **all** get_categories() function arguments, so they should work.*

These arguments can be used the same way as all the others with two notable exceptions:
  - their names can only be seen in the code (and WordPress documentation), there is no way to see them by closing the editor popup with **Return all options with arguments** option enabled
  - you're forced to use php-like bool values (technically and literally, *there are only their names in code*, they aren't intepreted in any way by this plugin, the values are passed to WordPress' `getCategories` as they are entered, in particular they aren't compared with the radio answers).

**Example:**
```
[insert_sub_and_category all_or_current_listbox="all" count=0]
```
should work the same way as without hidden argument (because it's the same as default in WordPress documentation).

## Summary: someone actually reading this?<a name="summary"></a>

This plugin for WordPress - *insert-sub-and-category* - will insert categories *(& subcategories & posts if needed)* to posts and pages *(or other places)*. This plugin adds his own button to tinyMCE editor for posts&pages and shortcode. You can change options in plugin popup window (after plugin icon in tinyMCE is clicked) or in shortcode.

Shortcode notation is:
```
[insert_sub_and_category name_of_argument=value other_name_of_argument="value1, value2"]
```
or with only default values:
```
[insert_sub_and_category]
```
To disclaim plugin options, remove shortcode manually or click **Cancel** button or use **ESC** key.