<?php
/*
 * Plugin Name: insert-sub-and-category
 * Version: 1.0
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Author: itjablonska
 * Author URI: http://itjablonska.pl/
 *
 * Description: This plugin for WordPress adds a shortcode which inserts categories & subcategories to pages or posts.
 *
 */
defined ( 'ABSPATH' ) or die ( 'No other scripts please!' );




function insert_sub_and_category($custom_settings) {
	$current_category = get_queried_object_id();
	$post_categories = get_the_category();
	
	// =============== ALL ACCEPTED ATTRIBUTES =============== //
	
	// --- CATEGORY ATTRIBUTES' NAMES --- //
	/* Category accepted attributes names (connected with get_categories) */
	$category_attributes_names = array ('taxonomy', 'object_ids', 'orderby', 'order', 'hide_empty', 'include', 'exclude', 'exclude_tree',
			'number', 'offset', 'fields', 'count', 'name', 'slug', 'term_taxonomy_id', 'hierarchical', 'search', 'name__like',
			'description__like', 'pad_counts', 'get', 'child_of', 'parent', 'childless', 'cache_domain', 'update_term_meta_cache',
			'meta_query', 'meta_key', 'meta_value', 'meta_type', 'meta_compare' );
	
	// --- MARKUP ATTRIBUTES' NAMES --- //
	/* entry&exit markup attributes names */
	$ee_markup_attributes_names = array('pre_whole_text', 'after_whole_text');
	
	/* pages markup attributes */
	$pages_markup_attributes_names = array ('page_markup_listbox');
	
	/* categories markup attributes */
	$categories_markup_attributes_names = array ('category_markup_listbox', 'category_name_listbox', 'template_name_text');
	
	/* posts markup attributes */
	$posts_markup_attributes_names = array ('no_post_text', 'pre_posts_text', 'wrap_post_listbox');
	
	// *** markup merge ***/
	$markup_attributes_names = array_merge ( $ee_markup_attributes_names, $pages_markup_attributes_names, $categories_markup_attributes_names, $posts_markup_attributes_names );
	
	// --- OPTIONS ATTRIBUTES' NAMES --- //
	/* posts appearance options attributes names */
	$page_options_attributes_names = array('page_as_link_radio', 'page_description_radio');
	
	/* categories appearance options attributes names */
	$categories_options_attributes_names = array('category_nested_listbox', 'all_or_current_listbox', 'category_as_link_radio',
			'category_description_radio', 'category_count_radio');
	
	/* posts appearance options attributes names */
	$posts_options_attributes_names = array('post_display_radio', 'post_as_link_radio', 'post_digest_radio', 'post_digest_length');
		
	// *** options merge ***/
	$options_attributes_names = array_merge ( $categories_options_attributes_names, $posts_options_attributes_names, $page_options_attributes_names );
	
	// --- CSS ATTRIBUTES' NAMES --- //
	$styles_attributes_names = array('categories_class', 'posts_class', 'digests_class');
	
	// --- MERGE ALL ACCEPTED ATTRIBUTES' NAMES --- /
	$all_accepted_attributes_names = array_merge ( $category_attributes_names, $markup_attributes_names, $options_attributes_names, $styles_attributes_names );
	
	// --- ALL ACCEPTED RADIO ANSWERS --- /
	$radio_answer_yes = array('yes', 'YES', 'Y', 'true');
	$radio_answer_no = array('no', 'NO', 'N', 'false');
	
	
	// --- ALL OPTIONS DEFAULTS --- //
	/* Array of all options with default values. If it's not there, it means, that default is empty string. */
	$all_options_defaults = [
		'category_nested_listbox' => 'nested2',
		'all_or_current_listbox' => 'current',
		'category_as_link_radio' => 'yes',
		'category_description_radio' => 'no',
		'category_count_radio' => 'no',
		'post_display_radio' => 'yes',
		'post_as_link_radio' => 'yes',
		'post_digest_radio' => 'no',
		'category_markup_listbox' => 'mixed_list',
		'category_name_listbox' => 'only_name',
		'template_name_text' => 'Category:&nbsp;',
		'no_post_text' => 'There are no posts in the category.',
		'post_digest_length' => '100',
		'orderby' => 'name',
		'order' => 'ascending',
		'wrap_post_listbox' => 'unordered_list',
		'childless' => 'no',
	];
	$custom_with_defaults;
	//array_merge don't work when custom settings are empty (empty or null)
	if (is_array($custom_settings)){
		$custom_with_defaults = array_merge($all_options_defaults, $custom_settings);
	} else {
		$custom_with_defaults = $all_options_defaults;
	};
	
	//check if answer is negative (but other than php bool false). It must be done, because it's the only one from get_categories with radio answer preset
	if (in_array($custom_with_defaults['childless'], $radio_answer_no)){
		$custom_with_defaults['childless'] = false;
	};
	
	// --- FILTER --- //
	/* filter custom settings with all accepted attributes */
	$all_accepted_custom_settings = array_intersect_key($custom_with_defaults, array_flip($all_accepted_attributes_names));
	/* filter all accepted custom settings by type of attributes */
	$category_accepted_custom_settings = array_intersect_key($all_accepted_custom_settings, array_flip($category_attributes_names));
	$markup_accepted_custom_settings = array_intersect_key($all_accepted_custom_settings, array_flip($markup_attributes_names));
	$options_accepted_custom_settings = array_intersect_key($all_accepted_custom_settings, array_flip($options_attributes_names));
	$styles_accepted_custom_settings = array_intersect_key($all_accepted_custom_settings, array_flip($styles_attributes_names));

	
	$isAnswerNo = function($optionToCheck) use($options_accepted_custom_settings, $radio_answer_no) {
		return in_array($options_accepted_custom_settings[$optionToCheck], $radio_answer_no) || $options_accepted_custom_settings[$optionToCheck] == false;
	};
	
	$isAnswerYes = function($optionToCheck) use($options_accepted_custom_settings, $radio_answer_yes) {
		return in_array($options_accepted_custom_settings[$optionToCheck], $radio_answer_yes);
	};
	
	// =============== PLUGIN MAIN CODE =============== //
	
	// --- CREATE & DEFINE OUTPUT CONTAINER --- //
	$output = '<div class="insert_sub_and_category">';

	// --- MARKUP FUNCTION --- //
	$insert_start_whole = function() use(&$output, &$markup_accepted_custom_settings){
		switch ($markup_accepted_custom_settings['category_markup_listbox']) {
			case 'unordered_list': 
				$output .= '<ul>';
			  break;
			case 'raw text': 
				$output .= '<p>';
			  break;
			case ('ordered_list' || 'mixed_list'):
			default: 
				$output .='<ol>';
			  break;
		};
	};

	$insert_end_whole  = function() use(&$output, &$markup_accepted_custom_settings){
		switch ($markup_accepted_custom_settings['category_markup_listbox']) {
			case 'unordered_list': 
			  	$output .= '</ul>';
			  	break;
			case 'raw text': 
				$output .= '</p>';
			  	break;
			case ('ordered_list' || 'mixed_list'):
			default: 
				$output .= '</ol>';
			  	break;
		};
	};
	
	$insert_start_category = function() use(&$output, &$markup_accepted_custom_settings, $styles_accepted_custom_settings){
		if ($markup_accepted_custom_settings['category_markup_listbox'] != 'raw text'){ 
			 $output .= '<li';
			 if(!empty($styles_accepted_custom_settings['categories_class'])){$output .= " class='".$styles_accepted_custom_settings['categories_class']."'";  };  
			 $output .= '>';
		  };
	};
	
	$insert_end_category = function() use(&$output, &$markup_accepted_custom_settings){
		if ($markup_accepted_custom_settings['category_markup_listbox'] == 'raw text'){
			$output .= '<br/>';
		} else { 
			$output .= '</li>';
		};
	};

	$insert_start_category_wrap = function($id) use(&$output, &$markup_accepted_custom_settings, $isAnswerYes, $isAnswerNo, $options_accepted_custom_settings, $radio_answer_yes, $radio_answer_no, $optionToCheck){
		$category_name = '';
		if ($markup_accepted_custom_settings['category_name_listbox'] == 'category_and_name') {
			$category_name .= '<span>Category: </span>';
		} elseif ($markup_accepted_custom_settings['category_name_listbox'] == 'template_name') {
			$category_name .= '<span>'.$markup_accepted_custom_settings['template_name_text'].'</span>';
		};
		if ($isAnswerYes('category_as_link_radio')){
			$output .= $category_name;
			$output .= "<a href='".get_term_link($id)."'>";
		  } elseif ($isAnswerNo('category_as_link_radio')){ 
			$output .= '<p>';
			$output .= $category_name;
		};
	};

	
	
	$insert_end_category_wrap = function() use(&$output, $isAnswerYes, $isAnswerNo, $options_accepted_custom_settings, $radio_answer_yes, $radio_answer_no, $optionToCheck){
		if ($isAnswerYes('category_as_link_radio')){ 
			$output .= '</a>';
		  } elseif ($isAnswerNo('category_as_link_radio')){ 
			$output .= '</p>';
		  };
	};

	$insert_start_posts = function() use(&$output, &$markup_accepted_custom_settings){
		if ($markup_accepted_custom_settings['category_markup_listbox'] == 'raw text'){
			$output .= '<p>';
		} else {
			switch ($markup_accepted_custom_settings['wrap_post_listbox']) {
				case 'ordered_list':
						$output .= '<ol>';
					break;
				case 'unordered_list':
						$output .= '<ul>';
					break;
				case 'new_paragraph_list':
						$output .= '<p>';
					break;
			};
		};
	};

	$insert_end_posts = function() use(&$output, &$markup_accepted_custom_settings){
		if ($markup_accepted_custom_settings['category_markup_listbox'] == 'raw text') {
				$output .= '</p>';				
		} else {
			switch ($markup_accepted_custom_settings['wrap_post_listbox']) {
				case 'ordered_list':
					if ($markup_accepted_custom_settings['category_markup_listbox'] != 'raw text') { 
						$output .= '</ol>';
				  	}
					break;
				case 'unordered_list':
					if ($markup_accepted_custom_settings['category_markup_listbox'] != 'raw text') { 
						$output .= '</ul>';
				  	}
					break;
				case 'new_paragraph_list':
					if ($markup_accepted_custom_settings['category_markup_listbox'] != 'raw text') { 
						$output .= '</p>';
				  	}
					break;
			};
		};
	};

	$insert_start_post = function() use(&$output, &$markup_accepted_custom_settings, $styles_accepted_custom_settings){
		if (($markup_accepted_custom_settings['category_markup_listbox'] != 'raw text')
		|| ($markup_accepted_custom_settings['wrap_post_listbox'] == 'ordered_list' || $markup_accepted_custom_settings['wrap_post_listbox'] == 'unordered_list')) { 
			 $output .= '<li';
			 if(!empty($styles_accepted_custom_settings['posts_class'])){$output .= "  class='".$styles_accepted_custom_settings['posts_class']."'";  };
			 $output .= '>';
		  };
		if ($markup_accepted_custom_settings['wrap_post_listbox'] == 'new_paragraph_list'){
			$output .= '<p';
			if(!empty($styles_accepted_custom_settings['posts_class'])){$output .= " class='".$styles_accepted_custom_settings['posts_class']."'";  };
			$output .= '>';
		} elseif ($markup_accepted_custom_settings['wrap_post_listbox'] == 'new_line_list'){
			$output .= '<br/>';
		};
	};
	
	$insert_end_post = function() use(&$output, &$markup_accepted_custom_settings){
		if ($markup_accepted_custom_settings['category_markup_listbox'] =='raw text'){ 
				$output .= '<br/>';
		} elseif ($markup_accepted_custom_settings['wrap_post_listbox'] == 'ordered_list'
				|| $markup_accepted_custom_settings['wrap_post_listbox'] == 'unordered_list') {
					$output .= '</li>';
		} elseif ($markup_accepted_custom_settings['wrap_post_listbox'] == 'new_paragraph_list') {
			$output .= '</p>';
		};
	};

	$insert_start_post_wrap = function($id) use(&$output, $isAnswerYes, $isAnswerNo, $options_accepted_custom_settings, $radio_answer_yes, $radio_answer_no, $optionToCheck){
		if ($isAnswerYes('post_as_link_radio')){ 
			$output .= "<a href='".post_permalink($id)."'>";
		  } elseif ($isAnswerNo('post_as_link_radio')){ 
			$output .= '<p>';
		  };
	};
	
	$insert_end_post_wrap = function() use(&$output, $isAnswerYes, $isAnswerNo, $options_accepted_custom_settings, $radio_answer_yes, $radio_answer_no, $optionToCheck){
		if ($isAnswerYes('post_as_link_radio')){ 
			$output .= '</a>';
		  } elseif ($isAnswerNo('post_as_link_radio')){ 
			$output .= '</p>';
		  };
	};

	$insert_start_post_digest = function() use(&$output, $styles_accepted_custom_settings){ 
		$output .= '<p';
		if(!empty($styles_accepted_custom_settings['digests_class'])){$output .= " class='".$styles_accepted_custom_settings['digests_class']."'";  };
		$output .= '>';
	  };
	
	$insert_end_post_digest = function(){ 
		$output .= '</p>';
	  };		

	// --- NESTED LEVEL & CURRRENT CATEGORY OPTIONS --- //
	if (empty($category_accepted_custom_settings['number'])){
		if ($options_accepted_custom_settings['category_nested_listbox'] == 'nested0'){
				$category_accepted_custom_settings['number'] = 1;
		};
	};
	if (empty($category_accepted_custom_settings['include']) && empty($category_accepted_custom_settings['child_of'])){
		if ($options_accepted_custom_settings['all_or_current_listbox'] != 'all'){
			if (is_category()){
				$category_accepted_custom_settings['child_of'] = get_queried_object_id();
			} else {
				$category_accepted_custom_settings['include'] = get_the_category(get_queried_object_id())[0]->cat_ID;
			};
		};
	};
	
	
	// --- GET CATEGORIES --- //
	/* get all categories with output settings */
	$categories = get_categories($category_accepted_custom_settings);

	
	// --- OUTPUT CODE --- //
	
	/* get current category and children */
	if ($options_accepted_custom_settings['all_or_current_listbox'] != 'all'){
		if (is_category()){
			$current_and_children = array_merge(get_categories(array('include'=>get_queried_object_id())), $categories);
			$categories = $current_and_children;
		} 
	};
	
	/* Variables used for nesting */
	$category_index = 0;
	$categories_length = count($categories);
	$previous_id = 0;
	$previous_parent_id = 0;
	$start_nesting = 1;
	$end_nesting = 1;
	
	
	/* Output code with seted categories & markup & options */
	if (!empty($markup_accepted_custom_settings['pre_whole_text'])){  
		$output .= '<p>'.$markup_accepted_custom_settings['pre_whole_text'].'</p>';
	  };

	$insert_start_whole();
	//categories
	foreach ($categories as $category) {
		//ending of previous nesting - when previous has different parent
		if (($category_index !== 0) && ($category_index !== $categories_length-1)
			&& (($previous_parent_id !== $category->parent) && (($previous_id !== $category->parent)))){
			$insert_end_whole();
			$end_nesting++;
		};
		//starting nesting - when previous IS parent
		if(($category_index !== 0) && ($previous_id == $category->parent)){
			$insert_start_whole();
			$start_nesting++;
		};
		
				
		$insert_start_category();
		$insert_start_category_wrap($category->term_id);
		$output .= $category->name;
		if($isAnswerYes('category_count_radio')){
			$output .= ' (' . $category->category_count . ')';
		};
		$insert_end_category_wrap();
		/*category description*/
		if($isAnswerYes('category_description_radio')){ 
			$output .= '<p>'.$category->category_description.'</p>';			
		};
		/* posts */
		if ( ($options_accepted_custom_settings['category_nested_listbox'] == 'nested2') && $isAnswerYes('post_display_radio')){
			if ($category->category_count > 0) {
				if (!empty($markup_accepted_custom_settings['pre_posts_text'])){ 
					$output .= '<p>'.$markup_accepted_custom_settings['pre_posts_text'].'</p>';
				  }
				$insert_start_posts();
				$posts = get_posts(array('category__in'=>$category->cat_ID));
				foreach ( $posts as $wppost ) {
					$insert_start_post();
					$insert_start_post_wrap($wppost->ID);
					$output .= $wppost->post_title;
					$insert_end_post_wrap();
					if ($isAnswerYes('post_digest_radio')){
						$insert_start_post_digest();
						$output .= wp_trim_words(strip_shortcodes($wppost->post_content), $options_accepted_custom_settings['post_digest_length']);
						$insert_end_post_digest();
					};
					$insert_end_post();
				}
				$insert_end_posts();
			} else $output .= $markup_accepted_custom_settings['no_post_text'];
		};
		$insert_end_category();
		
		//ending of nesting on end - till end and start nesting is equal 
		if ($category_index == $categories_length-1){
			while ($start_nesting > $end_nesting) {
				$insert_end_whole();
				$end_nesting++;
			};
		};
		
		//assigning current stats as previous in next $category
		$previous_id = $category->cat_ID;
		$previous_parent_id = $category->parent;
		$category_index++;		
	}
	$insert_end_whole();
	if (!empty($markup_accepted_custom_settings['after_whole_text'])){  
		$output .= '<p>'.$markup_accepted_custom_settings['after_whole_text'].'</p>';
	  };
	  
	//end of output
	 $output .='</div>';
	
	return $output;
	  
}

// --- CREATE TINYMCE SHORTCODE AND BUTTON --- //
/* Plugin Name: My TinyMCE Buttons */
add_action( 'admin_init', 'itj_isac_tinymce_button' );

function itj_isac_tinymce_button() {
     if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
     	  add_filter( 'mce_buttons', 'itj_isac_register_tinymce_button' );
          add_filter( 'mce_external_plugins', 'itj_isac_add_tinymce_button' );
     }
}

function itj_isac_register_tinymce_button( $buttons ) {
     array_push( $buttons, 'insert_sub_and_category_button' );
     return $buttons;
}

function itj_isac_add_tinymce_button( $plugin_array ) {
     $plugin_array['itj_isac_add_tinymce_button_script'] = plugins_url( 'js/insert-sub-and-category-button.js', __FILE__ ) ;
     return $plugin_array;
}


// --- ADD CUSTOM JS FILE --- //
/* Retrieve data from php file. It will be a convenient way to translate plugin later. */
foreach ( array('post.php','post-new.php') as $hook ) {
    add_action( "admin_head-$hook", 'itj_isac_send_to_js' );
}

function itj_isac_send_to_js() {
	$itj_isac_plugin_url = plugins_url( '/', __FILE__ );
	?>
<!-- TinyMCE Shortcode Plugin -->
<script type='text/javascript'>
var itj_isac_plugin_url_data = {
    'plugin_url': '<?php echo $itj_isac_plugin_url; ?>',
};
</script>
<!-- TinyMCE Shortcode Plugin -->
    <?php
}

	

// --- ADD CUSTOM CSS FILE --- //
add_action( 'admin_init', 'insert_sub_and_category_styles' );
function insert_sub_and_category_styles() {
wp_register_style( 'insert_sub_and_category_styles', plugins_url('/css/modalWindow.css',__FILE__ ) );
wp_enqueue_style('insert_sub_and_category_styles');
}





add_shortcode ( 'insert_sub_and_category', 'insert_sub_and_category' );

/* This is disabled, because I don't have donate link yet
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'itj_isac_action_links' );

function itj_action_links ( $links ) {
	$itj__isac_links = array(
			'<a href="http://itjablonska.pl" title="Donate" target="_blank" style="color:DarkSeaGreen">Donate</a>',
	);
	return array_merge( $links, $itj_isac_links );
}
*/

?>