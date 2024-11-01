=== insert-sub-and-category ===
Contributors: itjablonska
Donate link: not included yet (but my homepage is http://itjablonska.pl/)
Tags: categories, subcategories, site map, all categories, insert categories, print category, print post, print posts,
Requires at least: 4.6
Tested up to: 5.4.2
Stable tag: 4.3
Requires PHP: 5.2.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

This plugin for WordPress adds a shortcode which inserts categories & subcategories to pages or posts.

== Description ==

This plugin for WordPress will insert categories & subcategories from your WordPress to posts and pages. Plugin adds his own
button to tinyMCE editor for post&pages.
Briefly, you can use options for [get_categories](https://developer.wordpress.org/reference/functions/get_categories/ "get_categories on developer.wordpress.org") function,
list of options is in [WP_Term_Query::__construct](https://developer.wordpress.org/reference/classes/wp_term_query/__construct/ "WP_Term_Query::__construct on developer.wordpress.org").

Features:

* print categories & subcategories
* use attributes in get categories and markup
* option: add description to category
* option: order by +date +ID +title +modified +menu_order=term_order
* option: sort +ASC +DESC
* option: add number of posts
* option: +exclude +include
* style: +unordered list (default) +ordered list +divided by <br> tag
* functions: function that searches if radio answer is correct (YES, Y, NO, N etc.)

If you have any problem finding the plugin icon in the default editor (Gutenberg), try to use shortcode block or install [clasic editor from WordPress Contributors] (https://wordpress.org/plugins/classic-editor/).
Shortcode for this plugin is [insert_sub_and_category] - no additional arguments are critical to work (but they can be useful - read [user manual](http://itjablonska.pl/wp-content/uploads/insert-sub-and-category/user-manual.html)). 

This plugin uses [Showdown](http://showdownjs.com/) - a markdown to HTML converter written in Javascript to provide you [user manual](http://itjablonska.pl/wp-content/uploads/insert-sub-and-category/user-manual.html). 


== Installation ==

How You can install our plugin?
1. Upload the plugin files to the `/wp-content/plugins/insert-sub-and-category` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress.
1. Use it where you want on every post or page using [insert_sub_and_category] shortcode
or
button "Insert categories" in tinyMCE editor.

== Frequently Asked Questions ==

None today.

It is suggested to read [user manual](http://itjablonska.pl/wp-content/uploads/insert-sub-and-category/user-manual.html), before ask a question.

== Screenshots ==

1. In post editor you can click "Insert categories" button.
2. Basic options of plugin.
3. Advanced options of plugin.
4. If you don't change anything, simply shortcode will be inserted to your post content. You can use [insert_sub_and_category] instead of it.
5. Any attributes that are other than default will be in printed inside shorcode (see second occurence). You can edit it manualy.

== Changelog ==

= 0.1 =
*stable readme.txt
*first .php

= 1.0 =
* adds shortcode, remove empty and default attributes
* works on latest WordPress instalation

= 1.0 =
* change of plugin name & plugin function names accordingly
* sending variable from php to js <- no hardcode directory

= 1.0.1 =
* change readme.txt
    -> tested up to
    -> part of description (one before last paragraph)

= 1.0.2 =
* update readme.txt
* fixed issues with odd actions and other plugins conflicts

== Upgrade Notice ==
None today.
Date of start: 24-03-2017
